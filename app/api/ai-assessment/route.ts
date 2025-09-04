import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'
import { sendAssessmentResultsWithMailerSend } from '@/lib/mailersend'
import { generateAISummary } from '@/lib/openai'
import { saveAssessment } from '@/lib/database'
import { z } from 'zod'

// Validation schema for AI Assessment
const assessmentSchema = z.object({
  // Contact Info
  email: z.string().email('Email non valida'),
  name: z.string().min(1, 'Nome deve essere specificato'),
  role: z.string().min(1, 'Ruolo deve essere specificato'),
  company: z.string().min(1, 'Società deve essere specificata'),
  website: z.string().optional().or(z.literal('')),
  
  // Assessment Questions
  aiVisionClarity: z.number().min(1).max(5).optional().default(1),
  visionFormalized: z.enum(['si', 'no', 'in_parte']).optional(),
  aiStrategicImportance: z.enum(['si', 'no', 'parzialmente']).optional(),
  competitiveAdvantage: z.number().min(1).max(5).optional().default(1),
  investmentPlans: z.enum(['si', 'no']).optional(),
  currentProjects: z.enum(['0', '1-3', '3-7', '>7']).optional(),
  aiAreas: z.array(z.string()).optional().default([]),
  pilotProjects: z.enum(['si', 'no', 'previsto_a_breve']).optional(),
  employeeUsage: z.number().min(1).max(5).optional().default(1),
  managementUsage: z.number().min(1).max(5).optional().default(1),
  mainChallenges: z.array(z.string()).optional().default([]),
  partnerships: z.enum(['si', 'no', 'previste_a_breve']).optional(),
  dataReadiness: z.enum(['si', 'no', 'parzialmente']).optional(),
  internalSkills: z.enum(['si', 'no', 'limitate']).optional(),
  trainingInitiatives: z.enum(['si', 'no', 'previste_a_breve']).optional(),
  decisionMakerAwareness: z.enum(['si', 'no', 'parzialmente']).optional(),
  dedicatedTeam: z.enum(['si', 'no', 'previsto_a_breve']).optional(),
  aiPolicies: z.enum(['si', 'no', 'parzialmente', 'non_lo_so']).optional(),
  aiMetrics: z.enum(['si', 'no', 'in_sviluppo']).optional(),
  
  // Custom prompt (optional)
  customPrompt: z.string().optional(),
  
  assessment: z.object({
    score: z.number(),
    cluster: z.string(),
    details: z.object({
      totalScore: z.number(),
      maxPossibleScore: z.number(),
      normalizedScore: z.number()
    })
  })
})

export async function POST(request: NextRequest) {
  try {
    console.log('Processing AI assessment request')
    console.log('Environment check - NODE_ENV:', process.env.NODE_ENV)
    console.log('Environment check - OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY)

    // Parse request body
    const body = await request.json()
    console.log('Received assessment data:', JSON.stringify(body, null, 2))
    
    // Validate data
    const validationResult = assessmentSchema.safeParse(body)
    if (!validationResult.success) {
      console.error('Validation failed:')
      console.error('Errors:', validationResult.error.errors)
      console.error('Raw error:', validationResult.error)
      
      // Check for specific validation errors
      const emailError = validationResult.error.errors?.find(e => e.path?.includes('email'))
      const errorMessage = emailError ? 
        'Per favore inserisci un indirizzo email valido' : 
        'Alcuni campi non sono stati compilati correttamente'
      
      return NextResponse.json({
        success: false,
        error: errorMessage,
        details: validationResult.error.errors
      }, { status: 400 })
    }

    const data = validationResult.data

    // Cast data to ensure compatibility with OpenAI interface
    const openaiData = {
      ...data,
      visionFormalized: data.visionFormalized || 'no',
      aiStrategicImportance: data.aiStrategicImportance || 'no',
      investmentPlans: data.investmentPlans || 'no',
      currentProjects: data.currentProjects || '0',
      pilotProjects: data.pilotProjects || 'no',
      partnerships: data.partnerships || 'no',
      dataReadiness: data.dataReadiness || 'no',
      internalSkills: data.internalSkills || 'no',
      trainingInitiatives: data.trainingInitiatives || 'no',
      decisionMakerAwareness: data.decisionMakerAwareness || 'no',
      dedicatedTeam: data.dedicatedTeam || 'no',
      aiPolicies: data.aiPolicies || 'no',
      aiMetrics: data.aiMetrics || 'no'
    } as any

    // Generate AI-powered executive summary
    console.log('Generating AI summary for', data.company)
    let aiSummary = ''
    
    // Prepare fallback analysis function
    const generateCustomAnalysis = () => {
      const scoreCategory = data.assessment.score >= 80 ? 'eccellente' :
                           data.assessment.score >= 60 ? 'buono' :
                           data.assessment.score >= 40 ? 'discreto' : 'da migliorare'
      
      const keyStrengths = []
      const keyWeaknesses = []
      
      // Analyze key areas
      if (data.aiVisionClarity >= 4) keyStrengths.push('visione AI chiara')
      else keyWeaknesses.push('definizione della visione AI')
      
      if (data.competitiveAdvantage >= 4) keyStrengths.push('consapevolezza del vantaggio competitivo')
      else keyWeaknesses.push('comprensione del vantaggio competitivo AI')
      
      if (data.employeeUsage >= 4) keyStrengths.push('alto utilizzo AI da parte dei dipendenti')
      else keyWeaknesses.push('adozione AI limitata tra i dipendenti')
      
      if (data.internalSkills === 'si') keyStrengths.push('competenze interne disponibili')
      else keyWeaknesses.push('necessità di sviluppo competenze interne')
      
      return `🎯 **Analisi AI Readiness per ${data.company}**

**Punteggio Complessivo:** ${data.assessment.score}% (${data.assessment.cluster})
**Valutazione:** Livello di preparazione AI ${scoreCategory}

**Punti di Forza Identificati:**
${keyStrengths.length > 0 ? keyStrengths.map(s => `• ${s.charAt(0).toUpperCase() + s.slice(1)}`).join('\n') : '• Da definire attraverso consultazione approfondita'}

**Aree di Miglioramento:**
${keyWeaknesses.length > 0 ? keyWeaknesses.map(w => `• ${w.charAt(0).toUpperCase() + w.slice(1)}`).join('\n') : '• Ottimizzazione continua dei processi esistenti'}

**Raccomandazioni Prioritarie:**
• Sviluppo di una roadmap AI personalizzata per ${data.company}
• Formazione specifica per il team e il management
• Implementazione graduale di progetti pilota
• Definizione di metriche e KPI per misurare il ROI degli investimenti AI

**Prossimi Passi:**
Contatta il nostro team per una consultazione gratuita dove approfondiremo i risultati del tuo assessment e svilupperemo insieme una strategia AI su misura per ${data.company}.`
    }
    
    // Try OpenAI API first, fallback to custom analysis
    try {
      aiSummary = await generateAISummary(openaiData, data.customPrompt)
      console.log('AI Summary generated via OpenAI:', aiSummary.substring(0, 100) + '...')
    } catch (error: any) {
      console.error('OpenAI API error:', error)
      if (error.status === 429 || error.code === 'insufficient_quota') {
        console.log('OpenAI quota exceeded, using custom analysis fallback')
        aiSummary = generateCustomAnalysis()
      } else {
        console.log('OpenAI error, using custom analysis fallback')
        aiSummary = generateCustomAnalysis()
      }
    }

    // Save assessment to database
    console.log('Saving assessment to database for', data.company)
    const saveResult = await saveAssessment(openaiData, aiSummary)
    if (!saveResult.success) {
      console.error('Failed to save assessment:', saveResult.error)
    } else {
      console.log('Assessment saved successfully with ID:', saveResult.id)
    }

    // Create detailed HTML email for assessment results
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #0F172A, #1E293B); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .results { background: white; border-radius: 10px; padding: 20px; margin: 20px 0; border-left: 5px solid #3B82F6; }
          .score { font-size: 48px; font-weight: bold; color: #3B82F6; text-align: center; margin: 20px 0; }
          .cluster { font-size: 24px; font-weight: bold; color: #0F172A; text-align: center; margin-bottom: 20px; }
          .section { margin-bottom: 25px; }
          .question { font-weight: bold; color: #0F172A; margin-bottom: 5px; }
          .answer { color: #666; margin-bottom: 15px; padding-left: 20px; }
          .footer { background: #0F172A; color: white; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🤖 AI Readiness Assessment - Risultati</h1>
          <p>Maverick AI</p>
        </div>
        
        <div class="content">
          <h2>Ciao ${data.name},</h2>
          <p>Grazie per aver completato il nostro AI Readiness Assessment. Ecco i tuoi risultati dettagliati:</p>
          
          <div class="results">
            <div class="score">${data.assessment.score}%</div>
            <div class="cluster">${data.assessment.cluster}</div>
            <p style="text-align: center; color: #666;">
              Il tuo livello di preparazione AI si classifica come "<strong>${data.assessment.cluster}</strong>"
            </p>
          </div>

          <div style="background: #f0f9ff; border-left: 4px solid #3B82F6; padding: 20px; margin: 30px 0; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-bottom: 15px; font-size: 18px;">
              🤖 Executive Summary AI-Generated
            </h3>
            <div style="color: #374151; line-height: 1.6; font-style: italic;">
              ${aiSummary.replace(/\n/g, '<br>')}
            </div>
            <p style="text-align: right; font-size: 12px; color: #6b7280; margin-top: 15px;">
              <em>Analisi generata da Maverick AI</em>
            </p>
          </div>

          <h3>📊 Dettagli Assessment</h3>
          
          <div class="section">
            <h4>👤 Informazioni Aziendali</h4>
            <div class="question">Nome:</div>
            <div class="answer">${data.name}</div>
            <div class="question">Ruolo:</div>
            <div class="answer">${data.role}</div>
            <div class="question">Società:</div>
            <div class="answer">${data.company}</div>
            ${data.website ? `<div class="question">Sito web:</div><div class="answer">${data.website}</div>` : ''}
          </div>

          <div class="section">
            <h4>🎯 Visione e Strategia AI</h4>
            <div class="question">Chiarezza visione AI (1-5):</div>
            <div class="answer">${data.aiVisionClarity}/5</div>
            <div class="question">Vision formalizzata:</div>
            <div class="answer">${data.visionFormalized}</div>
            <div class="question">AI elemento strategico:</div>
            <div class="answer">${data.aiStrategicImportance}</div>
            <div class="question">Vantaggio competitivo AI (1-5):</div>
            <div class="answer">${data.competitiveAdvantage}/5</div>
            <div class="question">Investimenti pianificati:</div>
            <div class="answer">${data.investmentPlans}</div>
          </div>

          <div class="section">
            <h4>🚀 Progetti AI</h4>
            <div class="question">Progetti AI attuali:</div>
            <div class="answer">${data.currentProjects}</div>
            <div class="question">Ambiti AI considerati:</div>
            <div class="answer">${(data.aiAreas || []).join(', ') || 'Nessuno specificato'}</div>
            <div class="question">Progetti pilota/PoC:</div>
            <div class="answer">${data.pilotProjects}</div>
          </div>

          <div class="section">
            <h4>📈 Utilizzo Attuale</h4>
            <div class="question">Utilizzo dipendenti (1-5):</div>
            <div class="answer">${data.employeeUsage}/5</div>
            <div class="question">Utilizzo management (1-5):</div>
            <div class="answer">${data.managementUsage}/5</div>
            <div class="question">Principali sfide:</div>
            <div class="answer">${(data.mainChallenges || []).join(', ') || 'Nessuna specificata'}</div>
            <div class="question">Partnership AI:</div>
            <div class="answer">${data.partnerships}</div>
          </div>

          <div class="section">
            <h4>🏗️ Organizzazione e Governance</h4>
            <div class="question">Dati strutturati:</div>
            <div class="answer">${data.dataReadiness}</div>
            <div class="question">Competenze interne:</div>
            <div class="answer">${data.internalSkills}</div>
            <div class="question">Formazione AI:</div>
            <div class="answer">${data.trainingInitiatives}</div>
            <div class="question">Awareness decision maker:</div>
            <div class="answer">${data.decisionMakerAwareness}</div>
            <div class="question">Team dedicato:</div>
            <div class="answer">${data.dedicatedTeam}</div>
            <div class="question">Policy AI:</div>
            <div class="answer">${data.aiPolicies}</div>
            <div class="question">Metriche AI:</div>
            <div class="answer">${data.aiMetrics}</div>
          </div>
          
          <div style="background: #3B82F6; color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 30px 0;">
            <h3>🚀 Prossimi Passi</h3>
            <p>Basandoci sui tuoi risultati, possiamo aiutarti a sviluppare una roadmap personalizzata per accelerare la tua trasformazione AI.</p>
            <p style="margin-top: 20px;">
              <strong>Vuoi saperne di più?</strong><br>
              Contattaci per una consulenza personalizzata gratuita!
            </p>
          </div>
        </div>
        
        <div class="footer">
          <p>Maverick AI - Partner strategici per la trasformazione digitale</p>
          <p>📧 info@maverickai.it | 🌐 www.maverickai.it</p>
        </div>
      </body>
      </html>
    `

    // Send detailed assessment results email using MailerSend
    console.log('Sending assessment results email to:', data.email)
    
    try {
      const emailResult = await sendAssessmentResultsWithMailerSend({
        ...data,
        aiSummary
      })

      if (!emailResult.success) {
        console.error('Failed to send assessment results email:', emailResult.error)
        // Don't fail the entire request if email fails - user still gets results on screen
        console.log('Email failed but assessment completed successfully')
      } else {
        console.log('Assessment results email sent successfully:', emailResult.messageId)
      }
    } catch (emailError) {
      console.error('Error sending assessment email:', emailError)
      // Continue with success response even if email fails
    }

    // Return success response with AI summary
    return NextResponse.json({
      success: true,
      message: 'Assessment completato con successo! Tra poco riceverai un email con il report dettagliato.',
      assessment: {
        ...data.assessment,
        aiSummary
      }
    })

  } catch (error) {
    console.error('AI Assessment API error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Errore interno del server. Riprova più tardi.'
    }, { status: 500 })
  }
}