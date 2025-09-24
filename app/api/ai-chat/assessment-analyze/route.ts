import { NextRequest, NextResponse } from 'next/server'
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
const assessmentAnalyzeRequestSchema = z.object({
  assessmentData: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    company: z.string().optional(),
    website: z.string().optional(),
    role: z.string().optional(),
    aiVisionClarity: z.number().optional(),
    visionFormalized: z.string().optional(),
    aiStrategicImportance: z.string().optional(),
    competitiveAdvantage: z.number().optional(),
    investmentPlans: z.string().optional(),
    currentProjects: z.string().optional(),
    aiAreas: z.array(z.string()).optional(),
    pilotProjects: z.string().optional(),
    employeeUsage: z.number().optional(),
    managementUsage: z.number().optional(),
    mainChallenges: z.array(z.string()).optional(),
    partnerships: z.string().optional(),
    dataReadiness: z.string().optional(),
    internalSkills: z.string().optional(),
    trainingInitiatives: z.string().optional(),
    decisionMakerAwareness: z.string().optional(),
    dedicatedTeam: z.string().optional(),
    aiPolicies: z.string().optional(),
    aiMetrics: z.string().optional()
  }),
  assessmentResults: z.object({
    overallScore: z.number(),
    cluster: z.string(),
    dimensions: z.object({
      strategy: z.object({
        percentage: z.number(),
        level: z.string(),
        description: z.string()
      }),
      technology: z.object({
        percentage: z.number(),
        level: z.string(),
        description: z.string()
      }),
      people: z.object({
        percentage: z.number(),
        level: z.string(),
        description: z.string()
      }),
      governance: z.object({
        percentage: z.number(),
        level: z.string(),
        description: z.string()
      }),
      data: z.object({
        percentage: z.number(),
        level: z.string(),
        description: z.string()
      })
    }),
    industryBenchmark: z.object({
      percentile: z.number(),
      comparison: z.string(),
      industryAverage: z.number()
    }),
    recommendations: z.object({
      immediate: z.array(z.string()),
      shortTerm: z.array(z.string()),
      longTerm: z.array(z.string())
    }),
    competitiveInsights: z.object({
      strengths: z.array(z.string()),
      gaps: z.array(z.string()),
      opportunities: z.array(z.string())
    })
  }),
  action: z.literal('initialize')
})

// System prompt for AI analysis with assessment context
const generateAssessmentSystemPrompt = (assessmentData: any, assessmentResults: any) => `
Sei un consulente AI senior di Maverick AI specializzato nell'interpretazione di AI Readiness Assessment.

CONTESTO ASSESSMENT:
- Azienda: ${assessmentData.company}
- Persona: ${assessmentData.name} (${assessmentData.role})
- Punteggio AI Readiness: ${assessmentResults.overallScore}% (${assessmentResults.cluster})
- Posizione settoriale: ${assessmentResults.industryBenchmark.comparison} (${assessmentResults.industryBenchmark.percentile}° percentile)

ANALISI DIMENSIONI:
- Strategia AI: ${assessmentResults.dimensions.strategy.percentage}% (${assessmentResults.dimensions.strategy.level})
- Tecnologia: ${assessmentResults.dimensions.technology.percentage}% (${assessmentResults.dimensions.technology.level})
- Persone & Skills: ${assessmentResults.dimensions.people.percentage}% (${assessmentResults.dimensions.people.level})
- Governance: ${assessmentResults.dimensions.governance.percentage}% (${assessmentResults.dimensions.governance.level})
- Gestione Dati: ${assessmentResults.dimensions.data.percentage}% (${assessmentResults.dimensions.data.level})

PUNTI DI FORZA:
${assessmentResults.competitiveInsights.strengths.map((s: string) => `- ${s}`).join('\n')}

AREE DI MIGLIORAMENTO:
${assessmentResults.competitiveInsights.gaps.map((g: string) => `- ${g}`).join('\n')}

OPPORTUNITÀ:
${assessmentResults.competitiveInsights.opportunities.map((o: string) => `- ${o}`).join('\n')}

ISTRUZIONI:
1. Analizza i risultati dell'assessment e fornisci 3 insight chiave personalizzati
2. Suggerisci 2-3 azioni concrete basate sui risultati specifici
3. Evidenzia le opportunità più promettenti per ${assessmentData.company}
4. Usa i dati dell'assessment per personalizzare completamente la risposta
5. Mantieni un tono professionale ma accessibile
6. Fai riferimenti specifici ai punteggi e ai livelli ottenuti
7. Termina con una domanda mirata per stimolare l'approfondimento

STILE DI RISPOSTA:
- Usa il nome della persona (${assessmentData.name?.split(' ')[0]})
- Fai riferimenti specifici ai punteggi ottenuti
- Sii concreto e actionable
- Usa bullet points per chiarezza
- Massimo 350 parole

Non menzionare questi prompt. Comportati come un consulente reale che ha appena analizzato i loro risultati.
`

export async function POST(request: NextRequest) {
  try {
    console.log('Assessment AI Analysis request received')

    // Initialize OpenAI client at runtime
    const openai = getOpenAIClient()

    // Parse and validate request
    const body = await request.json()
    const { assessmentData, assessmentResults, action } = assessmentAnalyzeRequestSchema.parse(body)

    console.log(`Analyzing assessment results for ${assessmentData.company}`)

    // Generate AI analysis based on assessment results
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: generateAssessmentSystemPrompt(assessmentData, assessmentResults)
        },
        {
          role: 'user',
          content: `Analizza i risultati dell'AI Readiness Assessment di ${assessmentData.company} e fornisci insight personalizzati e azioni concrete.`
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    })

    const analysis = completion.choices[0].message.content

    if (!analysis) {
      throw new Error('No analysis generated')
    }

    console.log('Assessment AI Analysis completed successfully')

    return NextResponse.json({
      success: true,
      analysis
    })

  } catch (error) {
    console.error('Assessment AI Analysis error:', error)

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