'use client'

import { useState } from 'react'

export default function WhatWeDoSection() {
  const [expandedService, setExpandedService] = useState<number | null>(null)

  const services = [
    {
      id: 1,
      title: "Consulenza",
      shortDescription: "Consulenza strategica per analizzare la tua azienda, definire roadmap AI e guidare l'adozione con priorità concrete.",
      expandedDescription: "Aiutiamo le aziende a capire cosa significa davvero introdurre l'intelligenza artificiale nei propri processi. Partiamo da un'analisi dello stato attuale, individuiamo i punti di forza e le aree di miglioramento e costruiamo una roadmap chiara e concreta.\n\n• Valutazione del livello di maturità AI dell'organizzazione\n• Identificazione dei processi che possono beneficiare di più dall'AI\n• Definizione di una strategia e di un piano operativo",
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
      expandedDescription: "Trasformiamo la strategia in soluzioni reali, scegliendo e integrando le tecnologie più adatte. Possiamo utilizzare strumenti già disponibili sul mercato oppure sviluppare applicazioni su misura per automatizzare attività e supportare i team aziendali.\n\n• Selezione e implementazione dei migliori tool AI per specifiche esigenze\n• Creazione di assistenti digitali a supporto dei dipendenti\n• Sviluppo di soluzioni personalizzate per ottimizzare processi e decisioni",
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
      expandedDescription: "Progettiamo strumenti pratici e immediatamente utilizzabili per risolvere bisogni concreti. Si tratta di \"copiloti digitali\" che affiancano le persone nelle attività quotidiane e di agenti intelligenti che gestiscono in autonomia flussi di lavoro. Ad esempio:\n\n• Copilot per la forza vendita: generazione offerte e proposte\n• Copilot per il customer service: risposte a clienti e gestione ticket\n• Copilot per HR: screening dei CV, onboarding, comunicazioni ai candidati",
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
      expandedDescription: "Crediamo che l'adozione dell'AI passi anche dalla cultura e dalle competenze delle persone. Offriamo percorsi formativi personalizzati, in aula o online, che uniscono teoria e pratica per rendere i team davvero autonomi.\n\n• Workshop esperienziali su casi d'uso aziendali\n• Programmi di formazione strutturati per team e manager\n• Percorsi personalizzati online e in presenza, adattati agli obiettivi dell'organizzazione",
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
    <section id="cosa-facciamo" className="bg-gray-50 section-padding">
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