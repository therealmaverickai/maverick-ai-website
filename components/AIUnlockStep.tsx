'use client'

import React from 'react'
import { type AssessmentData } from '@/lib/assessmentScoring'

interface AIUnlockStepProps {
  data: Partial<AssessmentData>
  onChange: (field: keyof AssessmentData, value: any) => void
  showValidationErrors?: boolean
}

export default function AIUnlockStep({ data, onChange, showValidationErrors }: AIUnlockStepProps) {
  const handleMarketingConsentChange = (accepted: boolean) => {
    onChange('marketingConsent', accepted)
  }

  const validatePhone = (phone: string) => {
    // Italian phone number validation (basic)
    const phoneRegex = /^(\+39\s?)?((3[0-9]{2}|0[0-9]{2,3})\s?[0-9]{6,7}|[0-9]{10})$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const isPhoneValid = data.phone ? validatePhone(data.phone) : false

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-8 relative overflow-hidden shadow-xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">🚀 Sblocca il tuo Consulente AI Personale</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            Stai per accedere al nostro consulente AI avanzato che analizzerà i tuoi risultati e fornirà
            <span className="text-white font-semibold"> raccomandazioni strategiche personalizzate</span> per la tua azienda.
          </p>

          {/* Value Proposition Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-white mb-1">Strategia AI Personalizzata</div>
              <div className="text-slate-300 text-sm">Roadmap specifica per il tuo settore</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-white mb-1">Quick Wins Immediate</div>
              <div className="text-slate-300 text-sm">Azioni ad alto impatto da implementare subito</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-2xl mb-2">📈</div>
              <div className="font-semibold text-white mb-1">ROI Projection</div>
              <div className="text-slate-300 text-sm">Calcolo personalizzato del ritorno investimento</div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Per sbloccare il consulente AI:</h3>

            <div className="space-y-4">
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Numero di Telefono *
                </label>
                <input
                  type="tel"
                  value={data.phone || ''}
                  onChange={(e) => onChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur border-2 rounded-lg text-white placeholder-slate-300 transition-all duration-300 ${
                    showValidationErrors && !isPhoneValid
                      ? 'border-red-400 focus:border-red-300'
                      : 'border-white/20 focus:border-white/40 hover:border-white/30'
                  } focus:outline-none focus:ring-0`}
                  placeholder="+39 334 123 4567"
                />
                {showValidationErrors && data.phone && !isPhoneValid && (
                  <p className="text-red-300 text-sm mt-1">Inserisci un numero di telefono italiano valido</p>
                )}
                <p className="text-slate-300 text-xs mt-1">
                  Il tuo numero verrà utilizzato solo per comunicazioni strategiche AI di alto valore
                </p>
              </div>

              {/* Marketing Consent */}
              <div className="border-t border-white/20 pt-4">
                <div className="flex items-start">
                  <button
                    type="button"
                    onClick={() => handleMarketingConsentChange(!data.marketingConsent)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 mt-0.5 transition-all duration-300 ${
                      data.marketingConsent
                        ? 'border-white bg-white'
                        : showValidationErrors && !data.marketingConsent
                        ? 'border-red-400 bg-transparent hover:border-red-300'
                        : 'border-white/40 bg-transparent hover:border-white/60'
                    }`}
                  >
                    {data.marketingConsent && (
                      <svg className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <div className="text-sm">
                    <p className={`${showValidationErrors && !data.marketingConsent ? 'text-red-300' : 'text-white'}`}>
                      Acconsento a ricevere comunicazioni strategiche AI, case studies esclusivi e inviti a eventi premium di Maverick AI. *
                    </p>
                    <p className="text-slate-300 text-xs mt-2">
                      Massimo 2-3 comunicazioni al mese con contenuti di alto valore. Puoi annullare l'iscrizione in qualsiasi momento.
                    </p>
                    {showValidationErrors && !data.marketingConsent && (
                      <p className="text-red-300 text-xs mt-2">
                        È necessario accettare per accedere al consulente AI
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center bg-white/5 backdrop-blur rounded-full px-4 py-2 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-slate-300">I tuoi dati sono sicuri e protetti • Conformi GDPR</span>
          </div>
        </div>
      </div>
    </div>
  )
}