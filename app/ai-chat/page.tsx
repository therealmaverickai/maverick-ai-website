'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import AssessmentAIChat from '@/components/AssessmentAIChat'
import { type AssessmentData } from '@/lib/assessmentScoring'

function AIChatContent() {
  const searchParams = useSearchParams()
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData> | null>(null)
  const [assessmentResults, setAssessmentResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get data from URL parameters or localStorage
    const dataParam = searchParams.get('data')
    const resultsParam = searchParams.get('results')

    try {
      if (dataParam && resultsParam) {
        setAssessmentData(JSON.parse(decodeURIComponent(dataParam)))
        setAssessmentResults(JSON.parse(decodeURIComponent(resultsParam)))
      } else {
        // Fallback to localStorage
        const storedData = localStorage.getItem('assessmentData')
        const storedResults = localStorage.getItem('assessmentResults')

        if (storedData && storedResults) {
          setAssessmentData(JSON.parse(storedData))
          setAssessmentResults(JSON.parse(storedResults))
        }
      }
    } catch (error) {
      console.error('Error loading assessment data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white text-lg">Caricamento consulente AI...</p>
        </div>
      </div>
    )
  }

  if (!assessmentData || !assessmentResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Dati Assessment Non Trovati</h1>
          <p className="text-slate-300 mb-6">
            Non è possibile accedere al consulente AI senza aver completato l'assessment.
          </p>
          <a
            href="/ai-readiness"
            className="inline-flex items-center px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Torna all'Assessment
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AI Strategic Consultant</h1>
                <p className="text-slate-300 text-sm">Consulente personalizzato per {assessmentData.company || 'la tua azienda'}</p>
              </div>
            </div>
            <a
              href="/ai-readiness"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Torna ai Risultati
            </a>
          </div>
        </div>
      </div>

      {/* AI Chat Full Screen */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
          <AssessmentAIChat
            assessmentData={assessmentData}
            assessmentResults={assessmentResults}
          />
        </div>
      </div>
    </div>
  )
}

export default function AIChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Caricamento chat AI...</p>
        </div>
      </div>
    }>
      <AIChatContent />
    </Suspense>
  )
}