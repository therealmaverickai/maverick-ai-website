'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-width">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:scale-105 transition-all duration-300 group">
              <span className="group-hover:text-blue-600 transition-colors duration-300">Maverick</span> 
              <span className="text-blue-600 group-hover:rotate-12 inline-block transition-transform duration-300">AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/#home" className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group py-2">
              <span>Home</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/#chi-serviamo" className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group py-2">
              <span>Clienti</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/#cosa-facciamo" className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group py-2">
              <span>Servizi</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/#prodotti" className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group py-2">
              <span>AI aXcelerate</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/ai-readiness" className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group py-2">
              <span>AI Readiness Assessment</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </nav>

          {/* CTA Button */}
          <Link href="/#contatti" className="hidden md:block btn-primary">
            Richiedi Informazioni
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-4 pt-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/#home" 
                className="text-navy-700 hover:text-accent-500 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#chi-serviamo" 
                className="text-navy-700 hover:text-accent-500 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Clienti
              </Link>
              <Link 
                href="/#cosa-facciamo" 
                className="text-navy-700 hover:text-accent-500 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Servizi
              </Link>
              <Link 
                href="/#prodotti" 
                className="text-navy-700 hover:text-accent-500 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                AI aXcelerate
              </Link>
              <Link 
                href="/ai-readiness" 
                className="text-navy-700 hover:text-accent-500 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Readiness Assessment
              </Link>
              <Link 
                href="/#contatti" 
                className="btn-primary w-full mt-4 inline-block text-center text-sm py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Richiedi Informazioni
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}