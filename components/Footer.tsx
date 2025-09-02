'use client'

import { useState } from 'react'
import CookieSettings from './CookieSettings'

export default function Footer() {
  const [showCookieSettings, setShowCookieSettings] = useState(false)
  return (
    <footer className="bg-navy-900 text-white py-12 border-t border-navy-700">
      <div className="container-width">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              Maverick <span className="text-accent-500">AI</span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Startup specializzata in Intelligenza Artificiale Generativa e Agentiche per il business. 
              Partner strategici per la trasformazione digitale del futuro.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-accent-500 hover:bg-accent-600 p-2 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="bg-accent-500 hover:bg-accent-600 p-2 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="bg-accent-500 hover:bg-accent-600 p-2 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-accent-500 transition-colors">Home</a></li>
              <li><a href="#chi-serviamo" className="text-gray-300 hover:text-accent-500 transition-colors">Clienti</a></li>
              <li><a href="#cosa-facciamo" className="text-gray-300 hover:text-accent-500 transition-colors">Servizi</a></li>
              <li><a href="#prodotti" className="text-gray-300 hover:text-accent-500 transition-colors">AI aXcelerate</a></li>
              <li><a href="/ai-readiness" className="text-gray-300 hover:text-accent-500 transition-colors">AI Readiness Assessment</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Servizi</h4>
            <ul className="space-y-2">
              <li><a href="#cosa-facciamo" className="text-gray-300 hover:text-accent-500 transition-colors">Business process optimization</a></li>
              <li><a href="#cosa-facciamo" className="text-gray-300 hover:text-accent-500 transition-colors">Educational workshop & masterclass</a></li>
              <li><a href="#cosa-facciamo" className="text-gray-300 hover:text-accent-500 transition-colors">AI vision & strategic plan</a></li>
              <li><a href="#cosa-facciamo" className="text-gray-300 hover:text-accent-500 transition-colors">Startup studio & venture building</a></li>
              <li><a href="#cosa-facciamo" className="text-gray-300 hover:text-accent-500 transition-colors">Change management & operating model</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            <div className="mb-2">
              © 2025 Maverick AI. Tutti i diritti riservati.
            </div>
            <div className="text-xs text-gray-500">
              Maverick s.r.l. - Viale Lunigiana 23, 20125, Milano<br/>
              C.F. e P.I. 14113510961 - Capitale Sociale € 10.000,00 i.v.
            </div>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-accent-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-accent-500 transition-colors">Terms of Service</a>
            <button 
              onClick={() => setShowCookieSettings(true)}
              className="text-gray-400 hover:text-accent-500 transition-colors"
            >
              Impostazioni Cookie
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      <CookieSettings 
        isOpen={showCookieSettings}
        onClose={() => setShowCookieSettings(false)}
      />
    </footer>
  )
}