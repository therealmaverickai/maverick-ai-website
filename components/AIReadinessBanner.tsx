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
              La tua azienda è pronta per adottare l'
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
            
          </div>

          {/* Interactive Process Visualization */}
          <div className="max-w-4xl mx-auto mb-16">
            
            {/* Process Steps */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex flex-col items-center p-6 rounded-2xl transition-all duration-500 transform ${
                    currentStep === index 
                      ? 'bg-white shadow-xl scale-105 border border-blue-100' 
                      : 'bg-white/60 hover:bg-white/80 hover:shadow-lg border border-gray-100'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl mb-4 shadow-lg transform transition-transform duration-300 ${currentStep === index ? 'scale-110' : 'hover:scale-105'}`}>
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <div className={`font-bold text-lg transition-colors duration-300 mb-2 ${currentStep === index ? 'text-gray-900' : 'text-gray-700'}`}>
                      Fase {index + 1}
                    </div>
                    <div className={`text-gray-600 ${currentStep === index ? 'font-medium' : ''}`}>
                      {step.text}
                    </div>
                  </div>
                  {currentStep === index && (
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mt-3"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Simplified CTA */}
            <div className="text-center">
              <Link 
                href="/ai-readiness"
                className="btn-primary text-lg px-12 py-5 inline-flex items-center space-x-3 group relative overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 font-semibold">Inizia l'AI Readiness Assessment</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}