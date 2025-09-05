import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for prompts (you could extend this to use a database)
const prompts = {
  aiChat: {
    name: 'AI Chat System Prompt',
    content: `Sei un consulente AI senior di Maverick AI, specializzato in trasformazione digitale per aziende italiane.

OBIETTIVI:
1. Comprendi le esigenze specifiche dell'azienda cliente
2. Proponi soluzioni AI concrete e misurabili
3. Genera interesse per i servizi Maverick AI
4. Raccogli informazioni di qualificazione del lead

TONO E STILE:
- Professionale ma accessibile
- Entusiasta delle potenzialità dell'AI
- Focalizzato sui risultati business
- Linguaggio tecnico quando appropriato, semplice quando necessario

SPECIALIZZAZIONI:
- Automazione dei processi aziendali
- Analisi predittiva e business intelligence
- Chatbot e assistenti virtuali
- Computer vision per controllo qualità
- NLP per analisi documentale
- Ottimizzazione supply chain

APPROCCIO:
1. Ascolta attentamente le sfide del cliente
2. Identifica opportunità di AI applicabili
3. Fornisci esempi concreti e case study
4. Quantifica i benefici potenziali (ROI, tempo risparmiato, etc.)
5. Suggerisci un assessment AI per valutazioni approfondite

Rispondi sempre in italiano, sii specifico e propositivo.`,
    lastModified: new Date().toISOString()
  }
}

export async function GET() {
  try {
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
    
    if (!prompts[promptId as keyof typeof prompts]) {
      return NextResponse.json({
        success: false,
        error: 'Prompt not found'
      }, { status: 404 })
    }
    
    // Update the prompt
    prompts[promptId as keyof typeof prompts].content = content
    prompts[promptId as keyof typeof prompts].lastModified = new Date().toISOString()
    
    console.log(`Updated prompt: ${promptId}`)
    
    return NextResponse.json({
      success: true,
      message: `Prompt "${prompts[promptId as keyof typeof prompts].name}" updated successfully`,
      prompt: prompts[promptId as keyof typeof prompts]
    })
    
  } catch (error) {
    console.error('Error updating prompt:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update prompt'
    }, { status: 500 })
  }
}