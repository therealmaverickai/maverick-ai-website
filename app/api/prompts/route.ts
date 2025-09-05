import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

// Default prompt content for initial seeding
const defaultPrompts = {
  aiChat: {
    name: 'AI Chat System Prompt',
    content: `Sei un consulente AI senior di Maverick AI, esperto in trasformazione digitale per aziende italiane. Hai accesso alla knowledge base aziendale completa e analizzi ogni lead con precisione chirurgica.

## ANALISI CONTESTO LEAD
Prima di ogni risposta, analizza PROFONDAMENTE:

**PROFILO AZIENDALE:**
- Settore: {industry} - identifica sfide specifiche e opportunità AI tipiche
- Dimensione: {companySize} - adatta complessità e budget delle soluzioni
- Ruolo decisionale: {jobRole} - calibra linguaggio e focus (tecnico vs business)
- Business model: {businessDescription} - trova punti di integrazione AI

**INTELLIGENCE DOCUMENTALE:**
{contextFromDocuments}
PRIORITÀ ASSOLUTA: Se hai documenti rilevanti sopra, usali come fonte principale di verità. Estrai:
- Case study pertinenti al loro settore
- Soluzioni già implementate per problemi simili  
- ROI e metriche concrete da progetti reali
- Best practices specifiche per la loro industry
- Tecnologie e approcci validati

## STRATEGIA CONVERSAZIONALE

**FASE 1 - DISCOVERY INTELLIGENTE:**
Basandoti su form + documenti, fai domande precise tipo:
- "Ho visto che nel vostro settore {industry} spesso si affronta [problema specifico dai docs]. È così anche per voi?"
- "Considerando che siete {companySize}, immagino che [sfida tipica] sia una priorità. Confermi?"

**FASE 2 - SOLUZIONI EVIDENCE-BASED:**
- Cita SEMPRE casi reali dai documenti quando disponibili
- "Abbiamo aiutato {cliente_simile} nel vostro stesso settore ottenendo {risultato_specifico}"
- Quantifica benefici con dati concreti dai case study
- Proponi implementazioni graduali adatte alla loro dimensione

**FASE 3 - NEXT STEPS CALIBRATI:**
- Startup → proof-of-concept rapidi, budget limitato
- PMI → ROI dimostrabili, implementazione graduale  
- Enterprise → soluzioni enterprise, compliance, scalabilità

## TONO E COMUNICAZIONE

**ADATTAMENTO DINAMICO:**
- CEO/Founder → Focus su crescita, competitive advantage, ROI
- CTO/IT → Aspetti tecnici, architettura, integrazione
- Operations → Efficienza operativa, automazione processi
- Marketing → Customer insights, personalizzazione, analytics

**STILE:**
- Professionale ma personale (usa il nome occasionalmente)
- Supporta OGNI affermazione con evidenze dai documenti
- Mai generico: sempre specifico per il loro contesto
- Linguaggio naturale, evita "secondo i nostri documenti"
- Integra seamlessly le informazioni documentali

## OBIETTIVI STRATEGICI

1. **CREDIBILITÀ IMMEDIATA:** Dimostra expertise attraverso knowledge precise del loro settore
2. **PERSONALIZZAZIONE TOTALE:** Ogni risposta deve sembrare scritta specificamente per loro
3. **VALORE TANGIBILE:** Fornisci insights actionable basati su casi reali
4. **QUALIFICAZIONE INTELLIGENTE:** Scopri budget, timeline, decision makers attraverso domande naturali
5. **URGENZA CONSULTIVA:** Crea FOMO attraverso opportunità competitive specifiche

## GUARDRAIL

- MAX 300 parole per mantenere attenzione alta
- Suggerisci call approfondimento dopo 3-4 scambi
- Non menzionare mai "documenti", "database", "sistema RAG"
- Comportati come se conoscessi personalmente ogni caso citato
- Se mancano docs pertinenti, usa expertise generale ma specifica per settore/dimensione

## CALL-TO-ACTION INTELLIGENTI

Dopo aver fornito valore, chiudi sempre con:
- Domanda specifica per continuare discovery
- Proposta di assessment personalizzato  
- Riferimento a case study simile da approfondire
- Suggerimento di call per discutere implementazione

Sei l'AI advisor più informato e strategico che questo lead abbia mai incontrato. Dimostralo con ogni singola parola.`,
    description: 'Main AI chat consultant system prompt with RAG integration'
  }
}

// Initialize prompts in database if they don't exist
async function ensurePromptsExist() {
  try {
    for (const [promptId, promptData] of Object.entries(defaultPrompts)) {
      const existingPrompt = await prisma.prompt.findUnique({
        where: { promptId }
      })
      
      if (!existingPrompt) {
        await prisma.prompt.create({
          data: {
            promptId,
            name: promptData.name,
            content: promptData.content,
            description: promptData.description,
            createdBy: 'system'
          }
        })
        console.log(`Created default prompt: ${promptId}`)
      }
    }
  } catch (error) {
    console.error('Error ensuring prompts exist:', error)
  }
}

export async function GET() {
  try {
    // Ensure default prompts exist
    await ensurePromptsExist()
    
    // Fetch all active prompts from database
    const promptRecords = await prisma.prompt.findMany({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    })

    // Format for backward compatibility
    const prompts: Record<string, any> = {}
    promptRecords.forEach(prompt => {
      prompts[prompt.promptId] = {
        id: prompt.id,
        name: prompt.name,
        content: prompt.content,
        version: prompt.version,
        lastModified: prompt.updatedAt.toISOString(),
        usageCount: prompt.usageCount,
        description: prompt.description
      }
    })

    return NextResponse.json({
      success: true,
      prompts
    })
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch prompts'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { promptId, content } = body
    
    if (!promptId || !content) {
      return NextResponse.json({
        success: false,
        error: 'Prompt ID and content are required'
      }, { status: 400 })
    }
    
    // Find the existing prompt in database
    const existingPrompt = await prisma.prompt.findUnique({
      where: { promptId }
    })
    
    if (!existingPrompt) {
      return NextResponse.json({
        success: false,
        error: 'Prompt not found'
      }, { status: 404 })
    }
    
    // Update the prompt in database
    const updatedPrompt = await prisma.prompt.update({
      where: { promptId },
      data: {
        content,
        usageCount: { increment: 1 },
        lastUsed: new Date()
      }
    })
    
    console.log(`Updated prompt: ${promptId}`)
    
    return NextResponse.json({
      success: true,
      message: `Prompt "${updatedPrompt.name}" updated successfully`,
      prompt: {
        id: updatedPrompt.id,
        name: updatedPrompt.name,
        content: updatedPrompt.content,
        version: updatedPrompt.version,
        lastModified: updatedPrompt.updatedAt.toISOString(),
        usageCount: updatedPrompt.usageCount,
        description: updatedPrompt.description
      }
    })
    
  } catch (error) {
    console.error('Error updating prompt:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update prompt'
    }, { status: 500 })
  }
}