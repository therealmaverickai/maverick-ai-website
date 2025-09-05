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
      <section className="bg-gradient-to-b from-navy-50 to-white section-padding">
        <div className="container-width">
          <div className="text-center max-w-5xl mx-auto">
            <div className="text-6xl mb-6">🤖</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-navy-900 mb-8">
              AI Business Consultant
            </h1>
            <p className="text-xl sm:text-2xl text-navy-600 mb-8 leading-relaxed">
              Il nostro AI Assistant analizza la tua azienda e genera use case concreti per l'intelligenza artificiale
            </p>
            
            {/* Value Propositions */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="font-semibold text-navy-900 mb-2">Analisi Immediata</h3>
                <p className="text-gray-600 text-sm">Ottieni use case personalizzati in 2 minuti</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="font-semibold text-navy-900 mb-2">Altamente Personalizzato</h3>
                <p className="text-gray-600 text-sm">Soluzioni specifiche per il tuo settore e business</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="font-semibold text-navy-900 mb-2">ROI Concreto</h3>
                <p className="text-gray-600 text-sm">Stime di ritorno e timeline implementazione</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-width">
          {step === 'form' ? (
            <>
              {/* Progress Indicator */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <span className="ml-2 text-sm font-medium text-blue-600">Informazioni Business</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <span className="ml-2 text-sm text-gray-500">AI Analysis</span>
                  </div>
                </div>
              </div>

              <LeadCaptureForm 
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            </>
          ) : (
            <>
              {/* Progress Indicator - Step 2 */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      ✓
                    </div>
                    <span className="ml-2 text-sm text-gray-500">Informazioni Business</span>
                  </div>
                  <div className="w-8 h-px bg-blue-600"></div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <span className="ml-2 text-sm font-medium text-blue-600">AI Analysis</span>
                  </div>
                </div>
              </div>

              {leadData && (
                <AIChat 
                  leadData={leadData}
                  onComplete={handleChatComplete}
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              Cosa Riceverai
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Il nostro AI Assistant fornisce un'analisi completa e actionable per il tuo business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Use Case Specifici</h3>
              <p className="text-gray-600">3-5 opportunità AI concrete personalizzate per il tuo business</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">ROI Stimato</h3>
              <p className="text-gray-600">Calcoli di ritorno dell'investimento per ogni use case proposto</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Timeline Implementazione</h3>
              <p className="text-gray-600">Tempi realistici per l'implementazione di ogni soluzione</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Next Steps Pratici</h3>
              <p className="text-gray-600">Roadmap chiara per iniziare la trasformazione AI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-width">
          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <div className="text-5xl mb-6">💬</div>
              <blockquote className="text-2xl sm:text-3xl font-medium text-navy-900 mb-8 italic">
                "In 10 minuti ho ottenuto più insights sui possibili usi dell'AI nella mia azienda di quanti ne avevo raccolti in mesi di ricerche."
              </blockquote>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">MR</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-navy-900">Marco Rossi</div>
                  <div className="text-gray-600">CEO, TechCorp S.r.l.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              Domande Frequenti
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                Quanto tempo richiede l'analisi?
              </h3>
              <p className="text-gray-700">
                L'analisi AI richiede circa 2-3 minuti. Il form iniziale richiede 1-2 minuti per essere compilato, poi il nostro AI Assistant genera immediatamente use case personalizzati.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                I miei dati sono sicuri?
              </h3>
              <p className="text-gray-700">
                Assolutamente sì. Utilizziamo i tuoi dati esclusivamente per fornire l'analisi personalizzata e non li condividiamo mai con terze parti. Puoi richiedere la cancellazione in qualsiasi momento.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                Cosa succede dopo l'analisi?
              </h3>
              <p className="text-gray-700">
                Riceverai use case concreti e porai fare domande all'AI Assistant. Se interessato, potrai prenotare una consulenza gratuita per approfondire le opportunità più promettenti.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                Il servizio è davvero gratuito?
              </h3>
              <p className="text-gray-700">
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