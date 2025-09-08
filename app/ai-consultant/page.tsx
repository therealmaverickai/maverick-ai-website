'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import AIChat from '@/components/AIChat'

type LeadFormData = {
  fullName: string
  email: string
  company: string
  website?: string
  industry: string
  companySize: string
  jobRole: string
  businessDescription: string
}

export default function AIConsultantPage() {
  const [step, setStep] = useState<'form' | 'chat'>('form')
  const [leadData, setLeadData] = useState<LeadFormData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (data: LeadFormData) => {
    setIsLoading(true)
    setLeadData(data)
    
    // Small delay for better UX
    setTimeout(() => {
      setStep('chat')
      setIsLoading(false)
    }, 1000)
  }

  const handleChatComplete = () => {
    // Optional: redirect to contact page or show thank you message
    console.log('Chat completed')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container-width py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Business 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Consultant</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Scopri come l'intelligenza artificiale può trasformare il tuo business con un'analisi personalizzata gratuita
            </p>
            
            {/* Enhanced Value Propositions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">Analisi Immediata</h3>
                <p className="text-gray-300 text-sm">Use case personalizzati in pochi minuti</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">Altamente Personalizzato</h3>
                <p className="text-gray-300 text-sm">Soluzioni specifiche per il tuo settore</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">ROI Stimato</h3>
                <p className="text-gray-300 text-sm">Calcoli di ritorno concreti</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-width">
          {step === 'form' ? (
            <div className="max-w-4xl mx-auto">
              {/* Enhanced Progress Indicator */}
              <div className="mb-12">
                <div className="flex items-center justify-center space-x-8 mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      1
                    </div>
                    <span className="ml-3 text-lg font-semibold text-blue-600">Informazioni Business</span>
                  </div>
                  <div className="w-16 h-1 bg-gray-200 rounded-full">
                    <div className="w-0 h-full bg-blue-500 rounded-full transition-all duration-500"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span className="ml-3 text-lg text-gray-400">AI Analysis</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-4">
                    Iniziamo con le informazioni sul tuo business
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Compila il form qui sotto per permettere al nostro AI Assistant di fornirti use case personalizzati e specifici per la tua azienda.
                  </p>
                </div>
              </div>

              <LeadCaptureForm 
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              {/* Enhanced Progress Indicator - Step 2 */}
              <div className="mb-12">
                <div className="flex items-center justify-center space-x-8 mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-lg text-gray-500">Informazioni Business</span>
                  </div>
                  <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg animate-pulse">
                      2
                    </div>
                    <span className="ml-3 text-lg font-semibold text-blue-600">AI Analysis</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-4">
                    Analisi AI in corso...
                  </h2>
                  <p className="text-gray-600">
                    Il nostro AI Assistant sta generando use case personalizzati per <strong>{leadData?.company}</strong>
                  </p>
                </div>
              </div>

              {leadData && (
                <AIChat 
                  leadData={leadData}
                  onComplete={handleChatComplete}
                />
              )}
            </div>
          )}
        </div>
      </section>


      {/* Enhanced Testimonial Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 section-padding">
        <div className="container-width">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
                Cosa dicono i nostri clienti
              </h2>
              <p className="text-xl text-gray-600">
                Oltre 500 aziende hanno già scoperto il loro potenziale AI
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                  "In 10 minuti ho ottenuto più insights sui possibili usi dell'AI nella mia azienda di quanti ne avevo raccolti in mesi di ricerche."
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">MR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy-900">Marco Rossi</div>
                    <div className="text-gray-600 text-sm">CEO, TechCorp S.r.l.</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                  "Grazie all'analisi AI di Maverick AI abbiamo identificato 3 use case che implementeremo nei prossimi mesi. ROI stimato: 300%."
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">LB</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy-900">Lucia Bianchi</div>
                    <div className="text-gray-600 text-sm">CTO, InnovaCorp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="bg-white section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              Domande Frequenti
            </h2>
            <p className="text-xl text-gray-600">
              Tutto quello che devi sapere sul nostro AI Business Consultant
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">
                Quanto tempo richiede l'analisi?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                L'analisi AI richiede circa 2-3 minuti. Il form iniziale richiede 1-2 minuti per essere compilato, poi il nostro AI Assistant genera immediatamente use case personalizzati.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">
                I miei dati sono sicuri?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Assolutamente sì. Utilizziamo i tuoi dati esclusivamente per fornire l'analisi personalizzata e non li condividiamo mai con terze parti. Puoi richiedere la cancellazione in qualsiasi momento.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">
                Cosa succede dopo l'analisi?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Riceverai use case concreti e potrai fare domande all'AI Assistant. Se interessato, potrai prenotare una consulenza gratuita per approfondire le opportunità più promettenti.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">
                Il servizio è davvero gratuito?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Sì, l'AI Assistant e l'analisi sono completamente gratuiti. È il nostro modo per dimostrare l'expertise di Maverick AI e aiutare le aziende a comprendere il potenziale dell'intelligenza artificiale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}