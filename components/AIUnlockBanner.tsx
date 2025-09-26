'use client'

import { useState } from 'react'
import { type AssessmentData } from '@/lib/assessmentScoring'

interface AIUnlockBannerProps {
  data: Partial<AssessmentData>
  results: any
}

export default function AIUnlockBanner({ data, results }: AIUnlockBannerProps) {
  const [phone, setPhone] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [showError, setShowError] = useState('')

  const validatePhone = (phoneNumber: string) => {
    // Italian phone number validation (basic)
    const phoneRegex = /^(\+39\s?)?((3[0-9]{2}|0[0-9]{2,3})\s?[0-9]{6,7}|[0-9]{10})$/
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''))
  }

  const handleUnlockAI = async () => {
    if (!phone.trim()) {
      setShowError('Inserisci il tuo numero di telefono')
      return
    }

    if (!validatePhone(phone)) {
      setShowError('Inserisci un numero di telefono italiano valido')
      return
    }

    setIsValidating(true)
    setShowError('')

    try {
      // Update the user data with phone number
      const updatedData = { ...data, phone: phone.trim() }

      // Save phone number and data to Supabase
      const saveResponse = await fetch('/api/ai-chat/save-access-sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone.trim(),
          assessmentData: updatedData,
          assessmentResults: results
        })
      })

      // Log the save result but don't block user flow
      if (saveResponse.ok) {
        const saveResult = await saveResponse.json()
        console.log('Phone number saved to database:', saveResult)
      } else {
        console.warn('Failed to save to database, but continuing...')
      }

      // Store data in localStorage for the AI chat page
      localStorage.setItem('assessmentData', JSON.stringify(updatedData))
      localStorage.setItem('assessmentResults', JSON.stringify(results))

      // Navigate to AI chat page
      window.location.href = '/ai-chat'
    } catch (error) {
      console.error('Error unlocking AI chat:', error)
      setShowError('Errore durante il caricamento. Riprova.')
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <div className="mb-12 bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
      {/* Executive Header - Matching other sections */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Maverick Digital Consultant</h3>
              <p className="text-slate-300">Il nostro digital consultant per discutere dei risultati del vostro assessment</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
            <div className="flex items-center text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-Powered Chat
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface Preview */}
      <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 relative">
        {/* Mock Chat Interface */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 max-w-2xl mx-auto">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 rounded-t-xl">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.091z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold">Maverick Digital Consultant</h4>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  <p className="text-slate-300 text-xs">Sempre disponibile • Specializzato in AI Strategy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Conversation */}
          <div className="p-6 space-y-4 bg-white rounded-b-xl">
            <div className="flex">
              <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 max-w-md">
                <p className="text-sm text-slate-700">
                  Ciao! Ho analizzato i tuoi risultati dell'assessment. Basandomi sul tuo punteggio di <strong>{results?.overallScore || 75}/100</strong> e il cluster <strong>"{results?.cluster || 'Strategic Planners'}"</strong>, posso fornirti raccomandazioni specifiche.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-slate-900 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-md">
                <p className="text-sm">Quali sono le prime 3 azioni prioritarie da implementare?</p>
              </div>
            </div>

            <div className="flex">
              <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 max-w-lg">
                <p className="text-sm text-slate-700">
                  Perfetto! Per <strong>{data?.company || 'la tua azienda'}</strong> nel settore <strong>{data?.industry || 'Technology'}</strong>, ti consiglio di:
                  <br/><br/>
                  1️⃣ <strong>Definire una AI Strategy formale</strong><br/>
                  2️⃣ <strong>Avviare un progetto pilota</strong><br/>
                  3️⃣ <strong>Formare il team interno</strong>
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-slate-900 text-white rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                <p className="text-sm">Approfondisci il punto 1...</p>
                <div className="flex items-center mt-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unlock Overlay */}
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <div className="bg-slate-900/90 backdrop-blur border border-white/20 rounded-2xl p-8 text-center text-white max-w-md mx-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-2">Accedi al Digital Consultant</h4>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
              Inserisci il tuo numero per avere accesso al Digital Consultant
            </p>

            <div className="space-y-4">
              <div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    if (showError) setShowError('')
                  }}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur border-2 border-white/30 rounded-lg text-white placeholder-slate-300 focus:border-white/50 focus:outline-none transition-all"
                  placeholder="+39 334 123 4567"
                />
                {showError && (
                  <p className="text-red-300 text-sm mt-2">{showError}</p>
                )}
                <p className="text-slate-400 text-xs mt-2">
                  Proseguendo accetti di ricevere comunicazioni di marketing da parte di Maverick
                </p>
              </div>

              <button
                onClick={handleUnlockAI}
                disabled={isValidating || !phone.trim()}
                className="w-full bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                {isValidating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Caricamento...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Inizia la chat
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}