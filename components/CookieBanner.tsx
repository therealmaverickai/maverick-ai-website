'use client'

import { useState, useEffect } from 'react'
import { 
  hasGivenConsent, 
  acceptAllCookies, 
  acceptNecessaryCookies,
  getCookiePreferences,
  setCookiePreferences,
  clearDisallowedCookies,
  CookiePreferences 
} from '@/utils/cookies'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = hasGivenConsent()
    setShowBanner(!hasConsent)
    
    if (hasConsent) {
      // Load existing preferences
      setPreferences(getCookiePreferences())
    }
  }, [])

  const handleAcceptAll = () => {
    acceptAllCookies()
    setShowBanner(false)
    setShowPreferences(false)
    window.location.reload() // Reload to apply cookies
  }

  const handleAcceptNecessary = () => {
    acceptNecessaryCookies()
    clearDisallowedCookies()
    setShowBanner(false)
    setShowPreferences(false)
  }

  const handleCustomizePreferences = () => {
    setShowPreferences(true)
  }

  const handleSavePreferences = () => {
    setCookiePreferences(preferences)
    clearDisallowedCookies()
    setShowBanner(false)
    setShowPreferences(false)
    if (preferences.analytics) {
      window.location.reload() // Reload to apply analytics cookies
    }
  }

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out">
        <div className="container-width py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🍪</span>
                <h3 className="text-lg font-semibold text-navy-900">
                  Rispetta la tua privacy
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Utilizziamo i cookie per migliorare la tua esperienza di navigazione, 
                analizzare il traffico del sito e personalizzare i contenuti. 
                Puoi scegliere quali cookie accettare.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 min-w-0 lg:min-w-fit">
              <button
                onClick={handleCustomizePreferences}
                className="px-4 py-2 text-accent-600 hover:text-accent-700 font-medium text-sm border border-accent-600 hover:border-accent-700 rounded-lg transition-colors duration-200"
              >
                Personalizza
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200"
              >
                Solo necessari
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-accent-600 hover:bg-accent-700 text-white font-medium text-sm rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Accetta tutti
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-navy-900">Preferenze Cookie</h2>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <p className="text-gray-600">
                Gestisci le tue preferenze sui cookie. Puoi abilitare o disabilitare diverse 
                categorie di cookie secondo le tue preferenze.
              </p>

              {/* Cookie Categories */}
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 mr-4">
                    <h3 className="font-semibold text-navy-900 mb-1">Cookie Necessari</h3>
                    <p className="text-sm text-gray-600">
                      Questi cookie sono essenziali per il funzionamento del sito web e non possono essere disabilitati.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled={true}
                      className="w-4 h-4 text-accent-600 rounded border-gray-300 opacity-50 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1 mr-4">
                    <h3 className="font-semibold text-navy-900 mb-1">Cookie Analitici</h3>
                    <p className="text-sm text-gray-600">
                      Ci aiutano a capire come i visitatori interagiscono con il sito web raccogliendo informazioni in modo anonimo.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => handlePreferenceChange('analytics')}
                      className="w-4 h-4 text-accent-600 rounded border-gray-300 focus:ring-accent-500"
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1 mr-4">
                    <h3 className="font-semibold text-navy-900 mb-1">Cookie di Marketing</h3>
                    <p className="text-sm text-gray-600">
                      Utilizzati per mostrare pubblicità più pertinenti per te e i tuoi interessi.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => handlePreferenceChange('marketing')}
                      className="w-4 h-4 text-accent-600 rounded border-gray-300 focus:ring-accent-500"
                    />
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1 mr-4">
                    <h3 className="font-semibold text-navy-900 mb-1">Cookie Funzionali</h3>
                    <p className="text-sm text-gray-600">
                      Permettono al sito web di fornire funzionalità e personalizzazione migliorate.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => handlePreferenceChange('functional')}
                      className="w-4 h-4 text-accent-600 rounded border-gray-300 focus:ring-accent-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200"
              >
                Annulla
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Salva Preferenze
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}