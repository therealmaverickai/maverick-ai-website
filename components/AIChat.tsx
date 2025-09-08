'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIChatProps {
  leadData: {
    fullName: string
    email: string
    company: string
    website?: string
    industry: string
    companySize: string
    jobRole: string
    businessDescription: string
  }
  onComplete?: () => void
}

export default function AIChat({ leadData, onComplete }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize chat with AI analysis
  useEffect(() => {
    if (!isInitialized) {
      initializeChat()
      setIsInitialized(true)
    }
  }, [isInitialized])

  const initializeChat = async () => {
    setIsLoading(true)
    
    // Add welcome message
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: `Ciao ${leadData.fullName.split(' ')[0]}! 👋\n\nHo analizzato le informazioni di ${leadData.company} e sto preparando delle raccomandazioni AI personalizzate per il settore ${leadData.industry}.\n\nLasciami qualche secondo per elaborare le migliori opportunità per la tua azienda...`,
      timestamp: new Date()
    }
    
    setMessages([welcomeMessage])

    try {
      // Generate initial AI analysis
      const response = await fetch('/api/ai-chat/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadData,
          action: 'initialize'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to initialize AI analysis')
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
      console.error('Error initializing chat:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Mi dispiace, si è verificato un errore nell\'analisi iniziale. Puoi comunque farmi delle domande sui possibili use case AI per la tua azienda!',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

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
      const response = await fetch('/api/ai-chat/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadData,
          message: userMessage.content,
          conversationHistory: messages
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
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
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Mi dispiace, si è verificato un errore. Riprova o contattaci direttamente per una consulenza.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
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
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Usage Guidelines */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded-r-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-700">
              <strong>Linee guida:</strong> Questo AI Assistant è specializzato nell'identificare use case AI per il tuo business. 
              Fai domande su processi aziendali, automazione, efficienza operativa, tecnologie per il tuo settore.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">AI Assistant Maverick</h3>
              <p className="text-blue-100 text-sm">
                Analisi personalizzata per {leadData.company}
              </p>
            </div>
          </div>
        </div>

      {/* Messages Area */}
      <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 shadow-sm border'
              }`}
            >
              <div className="text-sm leading-relaxed">
                {formatMessage(message.content)}
              </div>
              <div
                className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
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
            <div className="bg-white text-gray-800 px-4 py-3 rounded-lg shadow-sm border">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600">L'AI sta analizzando...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-200">
        <div className="flex space-x-4">
          <div className="flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Es: 'Come automatizzare il customer service?' o 'Opportunità AI nel mio settore?'"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Invia</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setInputValue('Puoi fornire più dettagli sul ROI stimato?')}
            disabled={isLoading}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
          >
            💰 ROI stimato
          </button>
          <button
            onClick={() => setInputValue('Quali sono i tempi di implementazione?')}
            disabled={isLoading}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
          >
            ⏱️ Tempi implementazione
          </button>
          <button
            onClick={() => setInputValue('Come iniziare con un progetto pilota?')}
            disabled={isLoading}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
          >
            🚀 Progetto pilota
          </button>
        </div>

        {/* CTA Section */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="text-center">
            <h4 className="font-semibold text-navy-900 mb-2">
              Pronto per implementare queste soluzioni AI?
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Prenota una consulenza gratuita per approfondire i use case più promettenti
            </p>
            <a
              href="#contatti"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
            >
              📞 Prenota Consulenza Gratuita
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}