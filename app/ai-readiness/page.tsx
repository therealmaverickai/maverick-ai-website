'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import AIReadinessAssessmentExecutive from '@/components/AIReadinessAssessmentExecutive'
import Footer from '@/components/Footer'

export default function AIReadinessPage() {
  const [assessmentStarted, setAssessmentStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(4)
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <Breadcrumb />

      {/* Executive Assessment Section */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Executive Header */}
          <div className="text-center mb-6">
            {/* Assessment Title - Show on landing page and during assessment steps, hide on results page */}
            {currentStep < totalSteps && (
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">AI Readiness Assessment</h1>
                <p className="text-slate-600 text-lg">Valutazione della maturità AI della vostra organizzazione</p>
              </div>
            )}

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

          <AIReadinessAssessmentExecutive
            onAssessmentStart={setAssessmentStarted}
            onStepChange={(step, total) => {
              setCurrentStep(step)
              setTotalSteps(total)
            }}
          />
        </div>
      </section>


      <Footer />
    </main>
  )
}