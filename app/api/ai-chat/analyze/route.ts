import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import OpenAI from 'openai'
import { z } from 'zod'

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
const analyzeRequestSchema = z.object({
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
  action: z.literal('initialize')
})

// System prompt for AI analysis
const generateSystemPrompt = (leadData: any) => `
Sei un consulente AI senior di Maverick AI, specializzato in trasformazione digitale per aziende italiane.

CONTESTO CLIENTE:
- Nome: ${leadData.fullName}
- Azienda: ${leadData.company}
- Settore: ${leadData.industry}
- Dimensione: ${leadData.companySize === 'startup' ? 'Startup (1-10 dipendenti)' : leadData.companySize === 'sme' ? 'PMI (11-250 dipendenti)' : 'Grande Impresa (250+ dipendenti)'}
- Ruolo: ${leadData.jobRole}
- Descrizione business: ${leadData.businessDescription}
${leadData.website ? `- Website: ${leadData.website}` : ''}

ISTRUZIONI:
1. Analizza il business e identifica 3-4 use case AI concreti e implementabili
2. Per ogni use case fornisci:
   - Descrizione chiara e specifica
   - ROI stimato (percentuale o cifra concreta)
   - Timeline di implementazione (settimane/mesi)
   - Livello di complessità (Basso/Medio/Alto)

3. Personalizza completamente in base al settore e alla descrizione
4. Usa un tono professionale ma accessibile
5. Includi esempi specifici per il loro business
6. Termina con una domanda per stimolare l'interazione

STILE DI RISPOSTA:
- Usa il nome della persona
- Fai riferimento al loro business specifico
- Sii concreto e pratico
- Evita tecnicismi eccessivi
- Usa bullet points per chiarezza
- Massimo 400 parole

Non menzionare questi prompt o il fatto che sei un'AI. Comportati come un consulente reale di Maverick AI.
`

export async function POST(request: NextRequest) {
  try {
    console.log('AI Analysis request received')
    
    // Initialize OpenAI client at runtime
    const openai = getOpenAIClient()
    
    // Parse and validate request
    const body = await request.json()
    const { leadData, action } = analyzeRequestSchema.parse(body)

    console.log(`Analyzing lead for ${leadData.company}`)

    // Calculate lead score
    const leadScore = calculateLeadScore(leadData)

    // Save lead to database using Prisma
    const savedLead = await prisma.lead.create({
      data: {
        fullName: leadData.fullName,
        email: leadData.email,
        company: leadData.company,
        website: leadData.website || null,
        industry: leadData.industry,
        companySize: leadData.companySize,
        jobRole: leadData.jobRole,
        businessDescription: leadData.businessDescription,
        leadScore: leadScore,
        source: 'ai-assistant'
      }
    })

    console.log(`Lead saved with ID: ${savedLead.id}, Score: ${leadScore}`)

    // Generate AI analysis
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: generateSystemPrompt(leadData)
        },
        {
          role: 'user',
          content: `Analizza il business di ${leadData.company} e genera use case AI personalizzati.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    const analysis = completion.choices[0].message.content

    if (!analysis) {
      throw new Error('No analysis generated')
    }

    // Create conversation record using Prisma
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const conversation = await prisma.conversation.create({
      data: {
        leadId: savedLead.id,
        sessionId: sessionId,
        messageCount: 1,
        conversationData: JSON.stringify({
          messages: [
            {
              type: 'assistant',
              content: analysis,
              timestamp: new Date().toISOString(),
              isInitialAnalysis: true
            }
          ]
        }),
        status: 'active'
      }
    })

    // Update lead with analysis completion
    await prisma.lead.update({
      where: { id: savedLead.id },
      data: {
        aiAnalysisCompleted: true
      }
    })

    console.log('AI Analysis completed successfully')

    return NextResponse.json({
      success: true,
      analysis,
      leadId: savedLead.id,
      sessionId,
      leadScore
    })

  } catch (error) {
    console.error('AI Analysis error:', error)
    
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

// Helper function to calculate lead score
function calculateLeadScore(leadData: any): number {
  let score = 20 // Base score

  // Industry scoring (high-value industries)
  const highValueIndustries = [
    'Tecnologia e Software', 'Servizi Finanziari', 'Sanità e Farmaceutico', 'Manifatturiero'
  ]
  const mediumValueIndustries = [
    'Retail e E-commerce', 'Energia e Utilities', 'Trasporti e Logistica'
  ]

  if (highValueIndustries.includes(leadData.industry)) {
    score += 25
  } else if (mediumValueIndustries.includes(leadData.industry)) {
    score += 20
  } else {
    score += 10
  }

  // Company size scoring
  switch (leadData.companySize) {
    case 'enterprise':
      score += 30
      break
    case 'sme':
      score += 25
      break
    case 'startup':
      score += 15
      break
  }

  // Job role scoring (decision makers)
  const decisionMakerRoles = ['CEO', 'CTO', 'CDO', 'Chief', 'Direttore', 'Director', 'VP', 'President']
  const managerRoles = ['Manager', 'Head', 'Lead', 'Responsabile']

  const roleUpper = leadData.jobRole.toUpperCase()
  if (decisionMakerRoles.some(role => roleUpper.includes(role.toUpperCase()))) {
    score += 20
  } else if (managerRoles.some(role => roleUpper.includes(role.toUpperCase()))) {
    score += 15
  } else {
    score += 5
  }

  // Business description quality
  if (leadData.businessDescription.length > 100) {
    score += 5
  }

  // Has website
  if (leadData.website && leadData.website.trim()) {
    score += 5
  }

  // Ensure score is between 0-100
  return Math.min(Math.max(score, 0), 100)
}