import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import OpenAI from 'openai'
import { z } from 'zod'
import { searchForContext, formatContextForPrompt } from '@/lib/vector-search'

// Initialize OpenAI client - with runtime checks
const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI configuration is missing')
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
}

// Validation schema
const chatRequestSchema = z.object({
  leadData: z.object({
    fullName: z.string(),
    email: z.string().email(),
    company: z.string(),
    website: z.string().optional(),
    industry: z.string(),
    companySize: z.string(),
    jobRole: z.string(),
    businessDescription: z.string()
  }),
  message: z.string().min(1),
  conversationHistory: z.array(z.object({
    id: z.string(),
    type: z.enum(['user', 'assistant']),
    content: z.string(),
    timestamp: z.union([z.date(), z.string().transform((str) => new Date(str))])
  }))
})

// Get dynamic prompt from API
async function getSystemPrompt(): Promise<string> {
  try {
    const response = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/prompts`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    if (data.success && data.prompts.aiChat) {
      return data.prompts.aiChat.content
    }
  } catch (error) {
    console.error('Failed to fetch dynamic prompt, using fallback')
  }
  
  // Fallback prompt if API fails
  return `Sei un consulente AI senior di Maverick AI, specializzato in trasformazione digitale per aziende italiane. Usa il contesto fornito per dare risposte personalizzate e specifiche.`
}

// Enhanced system prompt with dynamic content and variables
const generateConversationPrompt = async (leadData: any, conversationHistory: any[], contextFromDocuments: string = '') => {
  let basePrompt = await getSystemPrompt()
  
  // Replace template variables in the prompt
  basePrompt = basePrompt
    .replace(/{industry}/g, leadData.industry)
    .replace(/{companySize}/g, leadData.companySize === 'startup' ? 'Startup (1-10 dipendenti)' : 
                                leadData.companySize === 'sme' ? 'PMI (11-250 dipendenti)' : 'Grande Impresa (250+ dipendenti)')
    .replace(/{jobRole}/g, leadData.jobRole)
    .replace(/{businessDescription}/g, leadData.businessDescription)
    .replace(/{contextFromDocuments}/g, contextFromDocuments)
  
  // Add current conversation context
  const conversationContext = `

=== CONTESTO CONVERSAZIONE ===
CLIENTE: ${leadData.fullName} - ${leadData.jobRole} presso ${leadData.company}
SETTORE: ${leadData.industry} | DIMENSIONE: ${leadData.companySize} 
BUSINESS: ${leadData.businessDescription}

CRONOLOGIA RECENTE:
${conversationHistory.slice(-6).map(msg => `${msg.type.toUpperCase()}: ${msg.content}`).join('\n')}

=== DOMANDA ATTUALE DA RISPONDERE ===`

  return basePrompt + conversationContext
}`

export async function POST(request: NextRequest) {
  try {
    console.log('AI Chat request received')
    
    // Initialize OpenAI client at runtime
    const openai = getOpenAIClient()
    
    // Parse and validate request
    const body = await request.json()
    const { leadData, message, conversationHistory } = chatRequestSchema.parse(body)

    console.log(`Chat message from ${leadData.company}: ${message.substring(0, 50)}...`)

    // Find existing lead using Prisma
    const lead = await prisma.lead.findFirst({
      where: {
        email: leadData.email,
        company: leadData.company
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!lead) {
      console.error('Lead not found')
      throw new Error('Lead not found')
    }

    // RAG: Search for relevant context from documents
    let contextFromDocuments = ''
    let ragUsed = false
    
    try {
      console.log('Searching for relevant context...')
      const conversationMessages = conversationHistory.map(msg => msg.content)
      
      const relevantChunks = await searchForContext(
        message,
        leadData.company,
        conversationMessages
      )
      
      if (relevantChunks.length > 0) {
        contextFromDocuments = formatContextForPrompt(relevantChunks)
        ragUsed = true
        console.log(`Found ${relevantChunks.length} relevant document chunks for context`)
      } else {
        console.log('No relevant document context found, using base knowledge')
      }
    } catch (error) {
      console.error('RAG context search error:', error)
      // Continue without context if search fails
    }

    // Generate AI response with enhanced prompt (includes RAG context if found)
    const systemPrompt = await generateConversationPrompt(leadData, conversationHistory, contextFromDocuments)
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000 // Increased to accommodate context
    })

    const response = completion.choices[0].message.content

    if (!response) {
      throw new Error('No response generated')
    }

    // Update or create conversation
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Try to find existing active conversation
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        leadId: lead.id,
        status: 'active'
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const newMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    }

    const aiResponse = {
      type: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    }

    let conversationId: string

    if (existingConversation) {
      // Update existing conversation
      const existingMessages = JSON.parse(existingConversation.conversationData).messages || []
      const updatedMessages = [
        ...existingMessages,
        newMessage,
        aiResponse
      ]

      await prisma.conversation.update({
        where: { id: existingConversation.id },
        data: {
          conversationData: JSON.stringify({ messages: updatedMessages }),
          messageCount: existingConversation.messageCount + 2
        }
      })

      conversationId = existingConversation.id
      console.log(`Updated conversation ${existingConversation.id}`)
    } else {
      // Create new conversation
      const newConversation = await prisma.conversation.create({
        data: {
          leadId: lead.id,
          sessionId: sessionId,
          messageCount: 2,
          conversationData: JSON.stringify({
            messages: [newMessage, aiResponse]
          }),
          status: 'active'
        }
      })

      conversationId = newConversation.id
      console.log('Created new conversation')
    }

    // Log the interaction for analytics (including RAG metadata)
    await prisma.aIInteraction.createMany({
      data: [
        {
          conversationId: conversationId,
          messageType: 'user',
          content: message
        },
        {
          conversationId: conversationId,
          messageType: 'assistant',
          content: response,
          tokensUsed: completion.usage?.total_tokens || 0,
          modelUsed: 'gpt-4-turbo-preview',
          promptVersion: ragUsed ? 'rag-enhanced-v1' : 'base-v1',
          useCaseGenerated: false,
          containsCta: response.toLowerCase().includes('consulenza') || response.toLowerCase().includes('call')
        }
      ]
    })

    // Analyze conversation for lead qualification
    const engagementScore = calculateEngagementScore(message, conversationHistory.length)
    
    // Update lead engagement metrics
    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        updatedAt: new Date()
      }
    })

    console.log(`Chat response generated successfully ${ragUsed ? 'with RAG context' : 'using base knowledge'}`)

    return NextResponse.json({
      success: true,
      response,
      engagementScore,
      messageCount: (existingConversation?.messageCount || 0) + 2,
      ragUsed,
      tokensUsed: completion.usage?.total_tokens || 0
    })

  } catch (error) {
    console.error('AI Chat error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 })
    }

    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

// Helper function to calculate engagement score
function calculateEngagementScore(message: string, historyLength: number): number {
  let score = 5 // Base score

  // Message length indicates engagement
  if (message.length > 100) score += 2
  if (message.length > 200) score += 1

  // Question marks indicate high engagement
  const questionCount = (message.match(/\?/g) || []).length
  score += Math.min(questionCount * 2, 3)

  // Keywords that indicate business interest
  const businessKeywords = [
    'roi', 'costo', 'prezzo', 'budget', 'timeline', 'tempo', 
    'implementazione', 'quando', 'come iniziare', 'pilota', 
    'progetto', 'team', 'risultati', 'benefici'
  ]
  
  const keywordCount = businessKeywords.filter(keyword => 
    message.toLowerCase().includes(keyword)
  ).length
  
  score += keywordCount * 1

  // Conversation length indicates sustained interest
  if (historyLength > 4) score += 1
  if (historyLength > 8) score += 1

  // Cap at 10
  return Math.min(score, 10)
}