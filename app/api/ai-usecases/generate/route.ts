import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { prisma } from '@/lib/database'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

interface AssessmentData {
  [key: string]: any
}

interface UseCaseResponse {
  useCases: Array<{
    title: string
    description: string
    impact: string
    complexity: 'Bassa' | 'Media' | 'Alta'
    roi: string
  }>
}

// Template replacement function with support for conditional blocks
function replaceTemplate(template: string, data: AssessmentData): string {
  let result = template

  // Handle conditional blocks like {{#website}}...{{/website}}
  result = result.replace(/\{\{#(\w+)\}\}(.*?)\{\{\/\1\}\}/g, (match, key, content) => {
    return data[key as keyof AssessmentData] ? content : ''
  })

  // Handle simple replacements like {{company}}
  result = result.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = data[key]
    if (value === undefined || value === null) return ''
    if (Array.isArray(value)) return value.join(', ')
    return String(value)
  })

  return result
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { assessmentData, assessmentResults } = body

    if (!assessmentData || !assessmentResults) {
      return NextResponse.json({
        success: false,
        error: 'Assessment data and results are required'
      }, { status: 400 })
    }

    // Fetch the use cases prompt from database
    const promptRecord = await prisma.prompt.findUnique({
      where: { promptId: 'aiUseCases' }
    })

    if (!promptRecord) {
      return NextResponse.json({
        success: false,
        error: 'AI use cases prompt not found'
      }, { status: 404 })
    }

    // Prepare template data combining assessment data and results
    const templateData = {
      ...assessmentData,
      overallScore: assessmentResults.overallScore,
      cluster: assessmentResults.cluster,
      // Convert array fields to readable format
      aiAreas: Array.isArray(assessmentData.aiAreas) ? assessmentData.aiAreas.join(', ') : assessmentData.aiAreas,
      mainChallenges: Array.isArray(assessmentData.mainChallenges) ? assessmentData.mainChallenges.join(', ') : assessmentData.mainChallenges,
      // Add dimension scores for more context
      strategyScore: assessmentResults.dimensions?.strategy?.percentage || 0,
      technologyScore: assessmentResults.dimensions?.technology?.percentage || 0,
      peopleScore: assessmentResults.dimensions?.people?.percentage || 0,
      governanceScore: assessmentResults.dimensions?.governance?.percentage || 0,
      dataScore: assessmentResults.dimensions?.data?.percentage || 0,
      cultureScore: assessmentResults.dimensions?.culture?.percentage || 0
    }

    // Replace template placeholders with actual data
    const processedPrompt = replaceTemplate(promptRecord.content, templateData)

    console.log('Generating AI use cases with OpenAI for:', assessmentData.company)

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a senior AI strategy consultant at Maverick AI with deep expertise in identifying and prioritizing AI use cases for businesses. Generate specific, actionable AI use cases in perfect Italian tailored to the company\'s industry, maturity level, and assessment responses.'
        },
        {
          role: 'user',
          content: processedPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2500,
      response_format: { type: 'json_object' }
    })

    const generatedContent = completion.choices[0]?.message?.content

    if (!generatedContent) {
      throw new Error('No content generated from OpenAI')
    }

    // Parse the JSON response
    let useCasesData: UseCaseResponse
    try {
      useCasesData = JSON.parse(generatedContent)
    } catch (parseError) {
      console.error('Error parsing OpenAI response as JSON:', parseError)
      throw new Error('Invalid JSON response from OpenAI')
    }

    // Validate the response structure
    if (!useCasesData.useCases || !Array.isArray(useCasesData.useCases)) {
      throw new Error('Invalid use cases structure from OpenAI')
    }

    // Update prompt usage statistics
    await prisma.prompt.update({
      where: { promptId: 'aiUseCases' },
      data: {
        usageCount: { increment: 1 },
        lastUsed: new Date()
      }
    })

    // Log successful generation
    console.log(`AI use cases generated successfully for ${assessmentData.company}`)

    return NextResponse.json({
      success: true,
      useCases: useCasesData.useCases,
      generatedAt: new Date().toISOString(),
      model: 'gpt-4o'
    })

  } catch (error: any) {
    console.error('Error generating AI use cases:', error)

    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return NextResponse.json({
        success: false,
        error: 'OpenAI API quota exceeded',
        fallback: true
      }, { status: 503 })
    }

    if (error.code === 'rate_limit_exceeded') {
      return NextResponse.json({
        success: false,
        error: 'Rate limit exceeded, please try again later',
        fallback: true
      }, { status: 429 })
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to generate AI use cases',
      details: error.message,
      fallback: true
    }, { status: 500 })
  }
}