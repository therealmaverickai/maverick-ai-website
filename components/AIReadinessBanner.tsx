'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AIReadinessBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { icon: "🎯", text: "Analisi strategica", color: "from-slate-700 to-slate-900" },
    { icon: "📊", text: "Benchmarking settoriale", color: "from-slate-600 to-slate-800" },
    { icon: "🚀", text: "Roadmap personalizzata", color: "from-slate-500 to-slate-700" }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-gradient-to-br from-gray-50 via-slate-50/30 to-gray-100/20 section-padding relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-10 left-10 w-32 h-32 bg-slate-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-slate-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-slate-300 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-width relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-slate-100 text-slate-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-slate-200/50 shadow-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Strategic Assessment • Executive Level
            </div>
            
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-8'}`}>
              Qual è la maturità
              <span className="relative inline-block ml-2">
                <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent font-extrabold">
                  AI
                </span>
              </span>
              {' '}della vostra organizzazione?
            </h2>
            
            <p className={`text-xl text-slate-600 mb-4 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-8'}`}>
              Assessment strategico che analizza <span className="font-semibold text-slate-900">6 dimensioni chiave</span> per determinare
              <span className="font-semibold text-slate-900"> la readiness AI aziendale</span>
            </p>
            
          </div>

          {/* Interactive Process Visualization */}
          <div className="max-w-4xl mx-auto mb-16">
            
            {/* Process Steps */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center p-6 rounded-xl transition-all duration-500 transform ${
                    currentStep === index
                      ? 'bg-white shadow-lg scale-105 border border-slate-200'
                      : 'bg-white/70 hover:bg-white hover:shadow-md border border-slate-100'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center text-xl mb-4 shadow-md transform transition-transform duration-300 ${currentStep === index ? 'scale-110' : 'hover:scale-105'}`}>
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <div className={`font-semibold text-base transition-colors duration-300 mb-2 ${currentStep === index ? 'text-slate-900' : 'text-slate-700'}`}>
                      Fase {index + 1}
                    </div>
                    <div className={`text-slate-600 text-sm ${currentStep === index ? 'font-medium' : ''}`}>
                      {step.text}
                    </div>
                  </div>
                  {currentStep === index && (
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse mt-3"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Simplified CTA */}
            <div className="text-center">
              <Link
                href="/ai-readiness"
                className="bg-slate-900 hover:bg-slate-800 text-white text-lg px-12 py-5 inline-flex items-center space-x-3 group relative overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-lg font-semibold"
              >
                <span className="relative z-10">Inizia Strategic AI Assessment</span>
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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