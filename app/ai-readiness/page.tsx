'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import AIReadinessAssessmentExecutive from '@/components/AIReadinessAssessmentExecutive'
import Footer from '@/components/Footer'

export default function AIReadinessPage() {
  const [assessmentStarted, setAssessmentStarted] = useState(false)
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <Breadcrumb />

      {/* Executive Assessment Section */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Executive Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl mb-8 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Strategic AI Readiness Assessment
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Valutiamo la maturità AI della sua organizzazione attraverso un framework strategico multidimensionale
            </p>

            {/* Executive Value Proposition - Hide when assessment starts */}
            {!assessmentStarted && (
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 transition-all duration-500">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Efficiente</h3>
                  <p className="text-sm text-slate-600">Completamento in meno di 5 minuti</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Benchmarking</h3>
                  <p className="text-sm text-slate-600">Confronto con standard di settore</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Strategico</h3>
                  <p className="text-sm text-slate-600">Raccomandazioni executive-level</p>
                </div>
              </div>
            )}
          </div>

          <AIReadinessAssessmentExecutive onAssessmentStart={setAssessmentStarted} />
        </div>
      </section>

      
      {/* Call to Action Section */}
      <section className="bg-navy-900 text-white py-16 px-6 lg:px-12">
        <div className="container-width text-center">
          <h2 className="text-3xl font-bold mb-6">
            Hai completato l'assessment?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Il prossimo passo è parlare con i nostri esperti per una consulenza personalizzata 
            e scoprire come implementare l'AI nella tua azienda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://calendar.app.google/qRHonaahhRhqZqSu8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              Prenota Consulenza Gratuita
            </a>
            <a href="/" className="btn-secondary text-lg px-8 py-4 border-white hover:bg-white hover:text-navy-900">
              Torna alla Homepage
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}