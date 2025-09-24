'use client'

import { useState, useRef, useEffect } from 'react'
import { EnhancedAssessmentResult, AssessmentData } from '@/lib/assessmentScoring'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AssessmentAIChatProps {
  assessmentData: Partial<AssessmentData>
  assessmentResults: EnhancedAssessmentResult
}

export default function AssessmentAIChat({ assessmentData, assessmentResults }: AssessmentAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false) // Start expanded for visibility
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const generateFallbackAnalysis = () => {
    const score = assessmentResults.overallScore || 0
    const cluster = assessmentResults.cluster
    const dimensions = assessmentResults.dimensions

    let analysis = `🔍 **Analisi Automatica dei Risultati**\n\n`

    // Overall assessment
    if (score >= 70) {
      analysis += `Congratulazioni! Il punteggio del ${score}% indica una solida preparazione AI. La vostra organizzazione è nella categoria "${cluster}", posizionandovi tra le aziende più avanzate nel panorama AI.\n\n`
    } else if (score >= 50) {
      analysis += `Il vostro punteggio del ${score}% mostra una buona base di partenza per l'AI. Come "${cluster}", avete le fondamenta giuste per accelerare la trasformazione digitale.\n\n`
    } else {
      analysis += `Il punteggio del ${score}% rivela un ampio potenziale di crescita nell'AI. Come "${cluster}", questa è un'ottima opportunità per costruire un vantaggio competitivo significativo.\n\n`
    }

    // Dimension analysis
    analysis += `📊 **Analisi delle Dimensioni Chiave**:\n\n`

    if (dimensions) {
      const sortedDims = Object.entries(dimensions).sort(([,a], [,b]) => b.percentage - a.percentage)
      const topDim = sortedDims[0]
      const lowestDim = sortedDims[sortedDims.length - 1]

      analysis += `✅ **Punto di Forza**: ${getDimensionName(topDim[0])} (${topDim[1].percentage}%)\n`
      analysis += `Il vostro livello "${topDim[1].level}" in questa area fornisce una solida base per espandere le iniziative AI.\n\n`

      analysis += `🎯 **Area di Miglioramento**: ${getDimensionName(lowestDim[0])} (${lowestDim[1].percentage}%)\n`
      analysis += `Concentrarsi su questa dimensione potrebbe sbloccare significativi benefici aggiuntivi.\n\n`
    }

    // Recommendations based on cluster
    analysis += `💡 **Raccomandazioni Immediate**:\n\n`

    switch (cluster) {
      case 'AI Leader':
        analysis += `• Mantenere il vantaggio competitivo attraverso innovazione continua\n• Esplorare tecnologie AI emergenti per consolidare la leadership\n• Condividere best practices internamente per massimizzare l'ROI`
        break
      case 'AI Adopter':
        analysis += `• Scalare i progetti AI di successo ad altre aree aziendali\n• Investire nella formazione AI per ampliare le competenze interne\n• Sviluppare metriche specifiche per misurare l'impatto dell'AI`
        break
      case 'AI Starter':
        analysis += `• Definire una roadmap AI chiara con milestone specifiche\n• Iniziare con 2-3 progetti pilota ad alto impatto e basso rischio\n• Creare un team dedicato o identificare champion interni`
        break
      default:
        analysis += `• Sviluppare una vision AI chiara allineata agli obiettivi aziendali\n• Identificare il primo use case AI con potenziale ROI dimostrabile\n• Investire nella formazione base del leadership team`
    }

    analysis += `\n\n💬 Hai domande specifiche sui risultati o vuoi approfondire alcune raccomandazioni?`

    return analysis
  }

  const getDimensionName = (key: string) => {
    const names = {
      strategy: 'Strategia AI',
      technology: 'Tecnologia',
      people: 'Competenze',
      governance: 'Governance',
      data: 'Gestione Dati',
      culture: 'Cultura & Esperienza'
    }
    return names[key as keyof typeof names] || key
  }

  const generateFallbackResponse = (userQuestion: string) => {
    const score = assessmentResults.overallScore || 0
    const cluster = assessmentResults.cluster
    const lowerQuestion = userQuestion.toLowerCase()

    if (lowerQuestion.includes('prossimi passi') || lowerQuestion.includes('cosa fare')) {
      return `Basandomi sui tuoi risultati come "${cluster}" (${score}%), ecco i prossimi passi che consiglio:\n\n1. **Focus immediato**: Migliorare la dimensione con punteggio più basso\n2. **Progetto pilota**: Identificare un caso d'uso specifico con ROI misurabile\n3. **Team building**: Definire ruoli e responsabilità per l'AI\n\nVuoi che approfondiamo uno di questi aspetti?`
    }

    if (lowerQuestion.includes('budget') || lowerQuestion.includes('costo') || lowerQuestion.includes('investimento')) {
      const budgetRange = cluster === 'AI Leader' ? '€100.000+' :
                         cluster === 'AI Adopter' ? '€50.000 - €200.000' :
                         cluster === 'AI Starter' ? '€30.000 - €100.000' :
                         '€15.000 - €50.000'
      return `Per un'azienda come la vostra in fase "${cluster}", considerate un budget iniziale di **${budgetRange}** per il primo anno.\n\nQuesto include:\n• Formazione e consulenza strategica\n• Sviluppo di progetti pilota\n• Strumenti e tecnologie base\n• Supporto implementativo\n\nL'investimento può essere scalato gradualmente in base ai risultati ottenuti.`
    }

    if (lowerQuestion.includes('come iniziare') || lowerQuestion.includes('da dove')) {
      return `Per iniziare il percorso AI nella vostra organizzazione:\n\n**Fase 1 - Fondamenta** (1-2 mesi):\n• Definire vision e obiettivi AI chiari\n• Identificare il team di lavoro\n• Analizzare i dati disponibili\n\n**Fase 2 - Pilota** (3-6 mesi):\n• Scegliere il primo use case\n• Implementare soluzione pilota\n• Misurare risultati e apprendimenti\n\n**Fase 3 - Scaling** (6+ mesi):\n• Espandere a nuove aree\n• Ottimizzare i processi\n• Costruire competenze interne\n\nIl vostro punteggio di ${score}% suggerisce di concentrarsi prima sulle fondamenta.`
    }

    if (lowerQuestion.includes('competenze') || lowerQuestion.includes('formazione') || lowerQuestion.includes('skill')) {
      return `Per sviluppare le competenze AI nella vostra organizzazione:\n\n**Leadership**: Comprensione strategica dell'AI e del suo impatto business\n**Team tecnico**: Competenze in data science, machine learning, e implementazione\n**Utenti finali**: Alfabetizzazione digitale e utilizzo consapevole degli strumenti AI\n\n**Raccomandazione per voi**: Iniziate con formazione executive per allineare la leadership, poi procedete con upskilling tecnico graduale.\n\nConsiderate un mix di:\n• Workshop interni\n• Corsi online specializzati\n• Consulenza esterna per affiancamento\n• Progetti pratici di apprendimento`
    }

    // Default response
    return `Grazie per la domanda! Basandomi sui vostri risultati come "${cluster}" (${score}%), posso fornire guidance specifico per la vostra situazione.\n\nPer una risposta più dettagliata e personalizzata, vi consiglio di:\n\n1. **Prenotare una consulenza gratuita** con i nostri esperti\n2. **Specificare la domanda** con più dettagli se volete approfondire un aspetto particolare\n3. **Utilizzare i pulsanti rapidi** qui sotto per domande comuni\n\nCosa vi interesserebbe approfondire maggiormente?`
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize chat with AI analysis when opened
  useEffect(() => {
    if (!isInitialized && !isMinimized) {
      initializeChat()
      setIsInitialized(true)
    }
  }, [isInitialized, isMinimized])

  const initializeChat = async () => {
    setIsLoading(true)

    // Add welcome message with assessment context
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: `Ciao ${assessmentData.name?.split(' ')[0]}! 👋\n\nHo analizzato i risultati del tuo AI Readiness Assessment per ${assessmentData.company}.\n\n📊 **Il tuo profilo AI**: ${assessmentResults.cluster} (${assessmentResults.overallScore}%)\n🏆 **Posizione nel settore**: ${assessmentResults.industryBenchmark?.comparison || 'Media di settore'}\n\nSono qui per rispondere a qualsiasi domanda sui tuoi risultati e aiutarti a pianificare i prossimi passi. Cosa vorresti approfondire?`,
      timestamp: new Date()
    }

    setMessages([welcomeMessage])

    try {
      // Generate initial AI analysis with assessment context
      const response = await fetch('/api/ai-chat/assessment-analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assessmentData,
          assessmentResults,
          action: 'initialize'
        }),
      })

      if (!response.ok) {
        // Instead of throwing, provide fallback analysis
        console.log('AI analysis service unavailable, using fallback insights')
        throw new Error('Service unavailable')
      }

      const data = await response.json()

      const analysisMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.analysis,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, analysisMessage])

    } catch (error) {
      // Provide detailed fallback analysis based on results
      const fallbackAnalysis = generateFallbackAnalysis()
      const analysisMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: fallbackAnalysis,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, analysisMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    // Validate props before making API call
    if (!assessmentData || !assessmentResults) {
      console.error('AssessmentAIChat: Missing required props', { assessmentData, assessmentResults })
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'Errore: Dati dell\'assessment non disponibili. Riprova più tardi.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const requestData = {
        assessmentData,
        assessmentResults,
        message: userMessage.content,
        conversationHistory: messages
      }

      console.log('AssessmentAIChat: Sending request to API', {
        hasAssessmentData: !!assessmentData,
        hasAssessmentResults: !!assessmentResults,
        message: userMessage.content,
        conversationHistoryLength: messages.length,
        assessmentDataKeys: assessmentData ? Object.keys(assessmentData) : [],
        assessmentResultsKeys: assessmentResults ? Object.keys(assessmentResults) : []
      })

      const response = await fetch('/api/ai-chat/assessment-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error('AssessmentAIChat API Error:', {
          status: response.status,
          statusText: response.statusText,
          response: errorData
        })
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('AssessmentAIChat Error:', error)
      console.log('AI chat service unavailable, providing general guidance')
      const fallbackResponse = generateFallbackResponse(userMessage.content)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: fallbackResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Handle bold markdown **text**
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

      return (
        <span key={index} dangerouslySetInnerHTML={{ __html: formattedLine }}>
        </span>
      )
    }).reduce((acc, curr, index) => {
      if (index > 0) acc.push(<br key={`br-${index}`} />)
      acc.push(curr)
      return acc
    }, [] as React.ReactNode[])
  }

  // Quick action buttons based on assessment results
  const getQuickActions = () => {
    const actions = [
      {
        text: 'Prossimi passi concreti',
        query: 'Quali sono i prossimi 3 passi più importanti per la mia azienda?'
      },
      {
        text: 'Budget e investimenti',
        query: 'Che budget dovrei considerare per implementare l\'AI?'
      }
    ]

    // Add cluster-specific actions
    if (assessmentResults.cluster === 'AI Explorer') {
      actions.push({
        text: 'Come iniziare',
        query: 'Da dove devo iniziare per implementare l\'AI nella mia azienda?'
      })
    } else if (assessmentResults.cluster === 'AI Leader') {
      actions.push({
        text: 'Mantieni leadership',
        query: 'Come posso mantenere il vantaggio competitivo AI?'
      })
    } else {
      actions.push({
        text: 'Progetto pilota',
        query: 'Come posso organizzare un progetto pilota AI?'
      })
    }

    return actions
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🤖</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold">Maverick AI Consultant</h3>
              <p className="text-slate-200 text-lg">
                Consulenza personalizzata per {assessmentData.company}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Online • Pronto per le tue domande</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  message.type === 'user'
                    ? 'bg-slate-800 text-white'
                    : 'bg-white text-slate-800 shadow-sm border border-slate-200'
                }`}
              >
                <div className="leading-relaxed">
                  {formatMessage(message.content)}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-800 px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-slate-600">Analisi in corso...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length > 0 && (
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
            <div className="flex flex-wrap gap-1">
              {getQuickActions().map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(action.query)}
                  disabled={isLoading}
                  className="text-xs bg-white hover:bg-slate-50 text-slate-700 px-2 py-1 rounded-full border border-slate-200 transition-colors"
                >
                  {action.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex space-x-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Fai una domanda sui tuoi risultati..."
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none text-sm"
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}