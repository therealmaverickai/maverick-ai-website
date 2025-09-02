'use client'

import { useState, useEffect } from 'react'
import { 
  getCookiePreferences,
  setCookiePreferences,
  clearDisallowedCookies,
  CookiePreferences 
} from '@/utils/cookies'

interface CookieSettingsProps {
  isOpen: boolean
  onClose: () => void
}

export default function CookieSettings({ isOpen, onClose }: CookieSettingsProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    if (isOpen) {
      setPreferences(getCookiePreferences())
    }
  }, [isOpen])

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSave = () => {
    setCookiePreferences(preferences)
    clearDisallowedCookies()
    onClose()
    if (preferences.analytics) {
      window.location.reload() // Reload to apply analytics cookies
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-navy-900">Impostazioni Cookie</h2>
            <button
              onClick={onClose}
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
            Gestisci le tue preferenze sui cookie. Le modifiche saranno applicate immediatamente.
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
                  Google Analytics e altri strumenti per analizzare il traffico del sito web.
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
                  Facebook Pixel, Google Ads e altri strumenti pubblicitari.
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
                  Preferenze del tema, lingua e altre funzionalità di personalizzazione.
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
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200"
          >
            Annulla
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Salva Modifiche
          </button>
        </div>
      </div>
    </div>
  )
}