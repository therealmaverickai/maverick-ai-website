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
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // Scroll within the chat container only, not the entire page
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    // Small delay to ensure DOM is updated before scrolling
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100)
    
    return () => clearTimeout(timer)
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
    const lines = content.split('\n')
    
    return lines.map((line, index) => {
      // Handle headers (# and ##)
      if (line.startsWith('###')) {
        return (
          <h4 key={index} className="font-semibold text-lg text-gray-800 mt-4 mb-2">
            {line.replace(/^###\s*/, '')}
          </h4>
        )
      }
      if (line.startsWith('##')) {
        return (
          <h3 key={index} className="font-bold text-xl text-gray-900 mt-4 mb-2">
            {line.replace(/^##\s*/, '')}
          </h3>
        )
      }
      if (line.startsWith('#')) {
        return (
          <h2 key={index} className="font-bold text-2xl text-gray-900 mt-4 mb-3">
            {line.replace(/^#\s*/, '')}
          </h2>
        )
      }
      
      // Handle bullet points
      if (line.match(/^[•\-\*]\s/)) {
        return (
          <div key={index} className="flex items-start space-x-2 my-1">
            <span className="text-blue-500 font-bold mt-1">•</span>
            <span>{formatInlineText(line.replace(/^[•\-\*]\s/, ''))}</span>
          </div>
        )
      }
      
      // Handle numbered lists
      if (line.match(/^\d+\.\s/)) {
        const number = line.match(/^(\d+)\./)?.[1]
        return (
          <div key={index} className="flex items-start space-x-2 my-1">
            <span className="text-blue-500 font-bold mt-1 min-w-[20px]">{number}.</span>
            <span>{formatInlineText(line.replace(/^\d+\.\s/, ''))}</span>
          </div>
        )
      }
      
      // Handle empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-3" />
      }
      
      // Regular text with inline formatting
      return (
        <p key={index} className="my-2">
          {formatInlineText(line)}
        </p>
      )
    })
  }

  const formatInlineText = (text: string) => {
    // Handle bold text (**text** or __text__)
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    formatted = formatted.replace(/__(.*?)__/g, '<strong>$1</strong>')
    
    // Handle italic text (*text* or _text_)
    formatted = formatted.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
    formatted = formatted.replace(/(?<!_)_([^_]+)_(?!_)/g, '<em>$1</em>')
    
    // Split by HTML tags and create React elements
    const parts = formatted.split(/(<strong>.*?<\/strong>|<em>.*?<\/em>)/)
    
    return parts.map((part, index) => {
      if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
        return <strong key={index} className="font-semibold text-gray-900">{part.slice(8, -9)}</strong>
      }
      if (part.startsWith('<em>') && part.endsWith('</em>')) {
        return <em key={index} className="italic text-gray-700">{part.slice(4, -5)}</em>
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
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

      {/* Messages Area - Made bigger and more readable */}
      <div 
        ref={chatContainerRef}
        className="h-[600px] overflow-y-auto p-6 space-y-6 bg-gray-50"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl lg:max-w-3xl px-6 py-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 shadow-md border'
              }`}
            >
              <div className="text-base leading-relaxed">
                {formatMessage(message.content)}
              </div>
              <div
                className={`text-sm mt-3 ${
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

        {/* Loading indicator - Made bigger and more readable */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 px-6 py-4 rounded-lg shadow-md border">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-base text-gray-600">L'AI sta analizzando...</span>
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
              placeholder="Chiedi dettagli sui use case, ROI, tempi di implementazione..."
              className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
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
              href="https://calendar.app.google/g7HZgUkvBAbRREGK6"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
            >
              📞 Prenota Consulenza Gratuita
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}