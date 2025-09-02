import OpenAI from 'openai'

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    // During build time, we don't need the actual client
    if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
      throw new Error('OpenAI API key not configured')
    }
    // Return a dummy client during build to avoid errors
    return new OpenAI({
      apiKey: 'dummy-key-for-build',
    })
  }
  
  return new OpenAI({
    apiKey,
  })
}

interface AssessmentData {
  // Contact Info
  name: string
  email: string
  role: string
  company: string
  website?: string
  
  // Assessment Questions
  aiVisionClarity: number
  visionFormalized: string
  aiStrategicImportance: string
  competitiveAdvantage: number
  investmentPlans: string
  currentProjects: string
  aiAreas?: string[]
  pilotProjects: string
  employeeUsage: number
  managementUsage: number
  mainChallenges?: string[]
  partnerships: string
  dataReadiness: string
  internalSkills: string
  trainingInitiatives: string
  decisionMakerAwareness: string
  dedicatedTeam: string
  aiPolicies: string
  aiMetrics: string
  
  assessment: {
    score: number
    cluster: string
    details: any
  }
}

const DEFAULT_PROMPT_TEMPLATE = `
Come esperto consulente AI di Maverick AI con alle spalle piu di 30 anni in consulenza stratefica e tecnologica, genera un executive summary professionale di 200 parole basato sui risultati dell'AI Readiness Assessment per l'azienda "{{company}}".

DATI AZIENDA:
- Nome: {{name}}
- Ruolo: {{role}}
- Azienda: {{company}}
{{#website}}- Sito web: {{website}}{{/website}}

RISPOSTE DETTAGLIATE:
- Chiarezza vision AI (1-5): {{aiVisionClarity}}
- Vision formalizzata: {{visionFormalized}}
- AI elemento strategico: {{aiStrategicImportance}}
- Vantaggio competitivo AI (1-5): {{competitiveAdvantage}}
- Investimenti pianificati: {{investmentPlans}}
- Progetti AI attuali: {{currentProjects}}
- Ambiti AI considerati: {{aiAreas}}
- Progetti pilota: {{pilotProjects}}
- Utilizzo dipendenti (1-5): {{employeeUsage}}
- Utilizzo management (1-5): {{managementUsage}}
- Sfide principali: {{mainChallenges}}
- Partnership AI: {{partnerships}}
- Dati strutturati: {{dataReadiness}}
- Competenze interne: {{internalSkills}}
- Formazione AI: {{trainingInitiatives}}
- Awareness decision maker: {{decisionMakerAwareness}}
- Team dedicato: {{dedicatedTeam}}
- Policy AI: {{aiPolicies}}
- Metriche AI: {{aiMetrics}}

RICHIESTA:
Scrivi un executive summary in italiano di massimo 200 parole che includa:

1. **Situazione Attuale**: Una valutazione concisa dello stato corrente di maturità AI dell'azienda
2. **Punti di Forza**: 2-3 aree in cui l'azienda eccelle o mostra potenziale
3. **Aree di Miglioramento**: 2-3 priorità strategiche per accelerare l'adozione AI
4. **Raccomandazione Strategica**: Una raccomandazione specifica e actionable per i prossimi passi. Consiglia di rivolgersi a Maverick AI per ricevere supporto specialistico

Il tono deve essere:
- Professionale e consulenziale come se fossi un consulente super esperto
- Basato sui dati forniti ma senza mai citare i numeri forniti nelle risposte
- Orientato all'azione
- Personalizzato per l'azienda specifica e per il ruolo dell'interlocutore. Se è un CEO usa un taglio più executive, se è un responsabile tecnico usa un tono più tecnico

Non utilizzare bullet points, scrivi in formato narrativo professionale.
`

function replacePlaceholders(template: string, data: AssessmentData): string {
  let prompt = template
    .replace(/\{\{company\}\}/g, data.company)
    .replace(/\{\{name\}\}/g, data.name)
    .replace(/\{\{role\}\}/g, data.role)
    .replace(/\{\{score\}\}/g, data.assessment.score.toString())
    .replace(/\{\{cluster\}\}/g, data.assessment.cluster)
    .replace(/\{\{aiVisionClarity\}\}/g, data.aiVisionClarity.toString())
    .replace(/\{\{visionFormalized\}\}/g, data.visionFormalized)
    .replace(/\{\{aiStrategicImportance\}\}/g, data.aiStrategicImportance)
    .replace(/\{\{competitiveAdvantage\}\}/g, data.competitiveAdvantage.toString())
    .replace(/\{\{investmentPlans\}\}/g, data.investmentPlans)
    .replace(/\{\{currentProjects\}\}/g, data.currentProjects)
    .replace(/\{\{aiAreas\}\}/g, (data.aiAreas || []).join(', ') || 'Nessuno specificato')
    .replace(/\{\{pilotProjects\}\}/g, data.pilotProjects)
    .replace(/\{\{employeeUsage\}\}/g, data.employeeUsage.toString())
    .replace(/\{\{managementUsage\}\}/g, data.managementUsage.toString())
    .replace(/\{\{mainChallenges\}\}/g, (data.mainChallenges || []).join(', ') || 'Nessuna specificata')
    .replace(/\{\{partnerships\}\}/g, data.partnerships)
    .replace(/\{\{dataReadiness\}\}/g, data.dataReadiness)
    .replace(/\{\{internalSkills\}\}/g, data.internalSkills)
    .replace(/\{\{trainingInitiatives\}\}/g, data.trainingInitiatives)
    .replace(/\{\{decisionMakerAwareness\}\}/g, data.decisionMakerAwareness)
    .replace(/\{\{dedicatedTeam\}\}/g, data.dedicatedTeam)
    .replace(/\{\{aiPolicies\}\}/g, data.aiPolicies)
    .replace(/\{\{aiMetrics\}\}/g, data.aiMetrics)

  // Handle conditional website field
  if (data.website) {
    prompt = prompt.replace(/\{\{#website\}\}(.*?)\{\{\/website\}\}/g, '$1').replace(/\{\{website\}\}/g, data.website)
  } else {
    prompt = prompt.replace(/\{\{#website\}\}.*?\{\{\/website\}\}/g, '')
  }

  return prompt
}

export async function generateAISummary(data: AssessmentData, customPrompt?: string): Promise<string> {
  try {
    const promptTemplate = customPrompt || DEFAULT_PROMPT_TEMPLATE
    const prompt = replacePlaceholders(promptTemplate, data)

    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Sei un senior consultant AI di Maverick AI, specializzato in digital transformation e AI strategy per le aziende italiane. Fornisci analisi precise, professionali e orientate all\'azione basate sui dati dell\'assessment.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.7,
    })

    return response.choices[0].message.content || 'Impossibile generare il summary in questo momento.'
    
  } catch (error) {
    console.error('Error generating AI summary:', error)
    throw error
  }
}