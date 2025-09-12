'use client'

import { useState } from 'react'

export default function WhatWeDoSection() {
  const [expandedService, setExpandedService] = useState<number | null>(null)

  const services = [
    {
      id: 1,
      title: "Analisi strategica e direzionale",
      shortDescription: "Individuiamo gli use case più rilevanti nel tuo settore, forniamo consulenza strategica e di visione sugli scenari futuri, analizziamo i rischi e le potenzialità. Partendo dall'analisi del tuo stato attuale, strutturiamo un percorso di AI Transformation su misura",
      expandedDescription: "• Assessment di maturità AI\n• Roadmap e priorità di adozione\n• Valutazioni \"make or buy\"\n• Allocazione ottimale di budget e risorse",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Progettazione e sviluppo",
      shortDescription: "Creiamo soluzioni AI custom partendo dai bisogni reali, le integriamo nei tuoi processi esistenti e ne misuriamo i risultati attraverso indicatori chiari",
      expandedDescription: "• Copiloti e agenti AI verticali per funzioni specifiche\n• Automazione e ottimizzazione dei workflow\n• Integrazione con sistemi aziendali (es. CRM, ERP,)\n• Progetti pilota con percorso di scalabilità",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Formazione e adoption",
      shortDescription: "Supportiamo le persone nell'uso quotidiano dell'AI, rendendola parte integrante del lavoro. Costruiamo consapevolezza e forniamo strumenti concreti",
      expandedDescription: "• Programmi di sensibilizzazione a livello aziendale\n• Percorsi formativi pratici e concreti\n• Workshop e academy di vibe coding\n• Librerie di prompt e metodologie \"learning by doing\"",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    }
  ]

  const toggleService = (serviceId: number) => {
    setExpandedService(expandedService === serviceId ? null : serviceId)
  }

  return (
    <section 
      id="cosa-facciamo" 
      className="bg-gray-50 section-padding"
      itemScope
      itemType="https://schema.org/Service"
      data-ai-summary="Complete service offerings and capabilities"
    >
      <div className="container-width">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            I nostri servizi
          </div>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 px-4 fade-in-up"
            itemProp="name"
            data-ai-summary="Service section title"
          >
            Tutto quello di cui hai bisogno <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              per innovare con l'AI
            </span>
          </h2>
          <p 
            className="text-lg text-gray-600 max-w-3xl mx-auto px-4 fade-in-up stagger-animation"
            style={{"--stagger": 1} as any}
            itemProp="description"
            data-ai-summary="Service overview and integration focus"
          >
            Dal primo approccio strategico all'implementazione completa: accompagniamo le aziende in ogni fase della trasformazione digitale
          </p>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`card group shimmer-effect cursor-pointer transition-all duration-500 hover:shadow-2xl border-l-4 hover:border-l-blue-500 fade-in-up stagger-animation ${
                expandedService === service.id 
                  ? 'ring-2 ring-blue-500 shadow-2xl scale-105 border-l-blue-500' 
                  : 'border-l-transparent hover:shadow-xl'
              }`}
              style={{"--stagger": index + 2} as any}
              onClick={() => toggleService(service.id)}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="inline-flex p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-blue-600 bg-hover icon-hover shadow-sm group-hover:shadow-md">
                      <div className="floating-animation transform group-hover:scale-110 transition-transform duration-300" style={{animationDelay: `${index * 0.15}s`}}>
                        {service.icon}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 text-hover group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className={`transition-all duration-300 p-2 rounded-full hover:bg-gray-100 ${
                    expandedService === service.id ? 'rotate-180 bg-blue-50' : ''
                  }`}>
                    <svg className={`w-5 h-5 transition-colors duration-300 ${
                      expandedService === service.id ? 'text-blue-600' : 'text-gray-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                  {service.shortDescription}
                </p>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedService === service.id 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {service.expandedDescription}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-xl p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Pronto a trasformare il tuo business?
            </h3>
            <p className="text-gray-600 mb-8">
              Contattaci per una consulenza gratuita e scopri come l'AI può rivoluzionare la tua azienda
            </p>
            <a href="#contatti" className="btn-primary text-base px-8 py-3 inline-block text-center">
              Prenota una consulenza gratuita
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}