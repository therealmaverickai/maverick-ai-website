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

interface RoadmapResponse {
  immediate: string[]
  shortTerm: string[]
  longTerm: string[]
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

    // Fetch the strategic roadmap prompt from database
    const promptRecord = await prisma.prompt.findUnique({
      where: { promptId: 'strategicRoadmap' }
    })

    if (!promptRecord) {
      return NextResponse.json({
        success: false,
        error: 'Strategic roadmap prompt not found'
      }, { status: 404 })
    }

    // Prepare template data combining assessment data and results
    const templateData = {
      ...assessmentData,
      overallScore: assessmentResults.overallScore,
      cluster: assessmentResults.cluster,
      // Convert array fields to readable format
      aiAreas: Array.isArray(assessmentData.aiAreas) ? assessmentData.aiAreas.join(', ') : assessmentData.aiAreas,
      mainChallenges: Array.isArray(assessmentData.mainChallenges) ? assessmentData.mainChallenges.join(', ') : assessmentData.mainChallenges
    }

    // Replace template placeholders with actual data
    const processedPrompt = replaceTemplate(promptRecord.content, templateData)

    console.log('Generating strategic roadmap with OpenAI for:', assessmentData.company)

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a McKinsey senior partner specializing in AI strategy and digital transformation. Generate strategic roadmaps in perfect Italian with specific, measurable actions.'
        },
        {
          role: 'user',
          content: processedPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    })

    const generatedContent = completion.choices[0]?.message?.content

    if (!generatedContent) {
      throw new Error('No content generated from OpenAI')
    }

    // Parse the JSON response
    let roadmapData: RoadmapResponse
    try {
      roadmapData = JSON.parse(generatedContent)
    } catch (parseError) {
      console.error('Error parsing OpenAI response as JSON:', parseError)
      throw new Error('Invalid JSON response from OpenAI')
    }

    // Validate the response structure
    if (!roadmapData.immediate || !roadmapData.shortTerm || !roadmapData.longTerm) {
      throw new Error('Invalid roadmap structure from OpenAI')
    }

    // Update prompt usage statistics
    await prisma.prompt.update({
      where: { promptId: 'strategicRoadmap' },
      data: {
        usageCount: { increment: 1 },
        lastUsed: new Date()
      }
    })

    // Log successful generation
    console.log(`Strategic roadmap generated successfully for ${assessmentData.company}`)

    return NextResponse.json({
      success: true,
      roadmap: roadmapData,
      generatedAt: new Date().toISOString(),
      model: 'gpt-4o'
    })

  } catch (error: any) {
    console.error('Error generating strategic roadmap:', error)

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
      error: 'Failed to generate strategic roadmap',
      details: error.message,
      fallback: true
    }, { status: 500 })
  }
}