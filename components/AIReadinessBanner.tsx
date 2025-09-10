'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AIReadinessBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { icon: "🏢", text: "Analisi aziendale", color: "from-blue-500 to-cyan-500" },
    { icon: "⚡", text: "Potenziale AI", color: "from-purple-500 to-pink-500" },
    { icon: "📊", text: "Report personalizzato", color: "from-green-500 to-teal-500" }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-width relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-orange-200/50 shadow-sm">
              <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Assessment AI gratuito • 5 minuti
            </div>
            
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-8'}`}>
              È il momento giusto per l'
              <span className="relative inline-block ml-2">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold animate-pulse">
                  AI
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-lg blur opacity-20 animate-pulse"></div>
              </span>
              ?
            </h2>
            
            <p className={`text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-8'}`}>
              Scopri <span className="font-bold text-gray-900">subito e gratuitamente</span> se la tua azienda ha le basi per 
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> trasformarsi con l'AI</span>
            </p>
            
            <div className={`flex justify-center items-center gap-2 text-sm text-gray-500 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-8'}`}>
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Già utilizzato da <span className="font-semibold text-gray-700">2,500+</span> aziende italiane
            </div>
          </div>

          {/* Interactive Process Visualization */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            
            {/* Left: Process Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center p-6 rounded-2xl transition-all duration-500 transform ${
                    currentStep === index 
                      ? 'bg-white shadow-xl scale-105 border border-blue-100' 
                      : 'bg-white/60 hover:bg-white/80 hover:shadow-lg border border-gray-100'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl mr-6 shadow-lg transform transition-transform duration-300 ${currentStep === index ? 'scale-110' : 'hover:scale-105'}`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className={`font-bold text-lg transition-colors duration-300 ${currentStep === index ? 'text-gray-900' : 'text-gray-700'}`}>
                      Fase {index + 1}
                    </div>
                    <div className={`text-gray-600 ${currentStep === index ? 'font-medium' : ''}`}>
                      {step.text}
                    </div>
                  </div>
                  <div className="ml-auto">
                    {currentStep === index && (
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Benefits & CTA */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-8 shadow-xl border border-blue-100/50">
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  100% Gratuito • Risultati Immediati
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Riceverai un report completo con:
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { icon: "📊", text: "Analisi del tuo livello AI readiness" },
                  { icon: "🎯", text: "Opportunità specifiche per il tuo settore" },
                  { icon: "🚀", text: "Roadmap personalizzata per iniziare" },
                  { icon: "💡", text: "Suggerimenti pratici e immediati" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="text-2xl">{benefit.icon}</div>
                    <div className="text-gray-700 font-medium">{benefit.text}</div>
                  </div>
                ))}
              </div>

              <Link 
                href="/ai-readiness"
                className="w-full btn-primary text-lg px-8 py-5 inline-flex items-center justify-center space-x-3 group relative overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 font-semibold">🚀 Inizia il tuo Assessment AI</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  ⏱️ Solo 5 minuti • 📧 Report via email • 🔒 Nessun impegno
                </p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center bg-white/70 rounded-2xl p-8 border border-gray-100">
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full border-2 border-white"></div>
                </div>
                <span className="font-medium text-gray-600">CEO & Imprenditori</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="font-medium text-gray-600">⭐ 4.9/5 rating</div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="font-medium text-gray-600">🚀 2,500+ aziende valutate</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}