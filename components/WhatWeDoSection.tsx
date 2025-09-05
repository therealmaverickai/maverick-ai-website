'use client'

import { useState } from 'react'

export default function WhatWeDoSection() {
  const [expandedService, setExpandedService] = useState<number | null>(null)

  const services = [
    {
      id: 1,
      title: "Consulenza",
      shortDescription: "Consulenza strategica per analizzare la tua azienda, definire roadmap AI e guidare l'adozione con priorità concrete.",
      expandedDescription: "Offriamo consulenza strategica completa per l'integrazione dell'AI nel tuo business. Analizziamo la tua azienda, i processi esistenti e le opportunità di crescita per definire una roadmap AI personalizzata. Ti guidiamo nell'identificare le priorità concrete e nell'implementazione graduale delle soluzioni più efficaci per il tuo settore.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Sviluppo",
      shortDescription: "Sviluppiamo soluzioni AI personalizzate o integriamo tool esistenti per ottimizzare processi e generare risultati misurabili.",
      expandedDescription: "Creiamo soluzioni AI su misura per le tue esigenze specifiche, dall'automazione dei processi alla creazione di sistemi intelligenti. Integriamo tool esistenti o sviluppiamo da zero applicazioni AI che si adattano perfettamente ai tuoi flussi di lavoro, garantendo risultati misurabili e ROI concreto.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Co-piloti & Agenti",
      shortDescription: "Copiloti verticali e agenti AI su misura che automatizzano attività e migliorano efficienza operativa quotidiana.",
      expandedDescription: "Progettiamo e implementiamo co-piloti AI specializzati e agenti intelligenti che lavorano al fianco dei tuoi team. Questi sistemi automatizzano attività ripetitive, assistono nelle decisioni complesse e migliorano l'efficienza operativa quotidiana, liberando le risorse umane per attività a maggior valore aggiunto.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Formazione",
      shortDescription: "Esperienze formative personalizzate che sviluppano competenze AI e rispondono alle tue esigenze professionali, online e in presenza.",
      expandedDescription: "Offriamo programmi formativi completi sull'AI, dai workshop introduttivi ai masterclass avanzati. Le nostre esperienze formative sono personalizzate in base al livello e alle esigenze del tuo team, disponibili sia online che in presenza. Sviluppiamo competenze pratiche e strategiche per utilizzare l'AI in modo efficace nel tuo settore.",
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
    <section id="cosa-facciamo" className="bg-white section-padding">
      <div className="container-width">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 px-4">
            I nostri servizi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Offriamo soluzioni complete per integrare l'Intelligenza Artificiale nel tuo business
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`card group shimmer-effect cursor-pointer transition-all duration-300 ${
                expandedService === service.id 
                  ? 'ring-2 ring-blue-500 shadow-xl' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => toggleService(service.id)}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="inline-flex p-3 bg-blue-100 rounded-lg text-blue-600 bg-hover icon-hover">
                      <div className="floating-animation" style={{animationDelay: `${index * 0.15}s`}}>
                        {service.icon}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">
                          {service.id.toString().padStart(2, '0')}.
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900 text-hover">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`transition-transform duration-300 ${
                    expandedService === service.id ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <p className="text-gray-700 leading-relaxed">
                      {service.expandedDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
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