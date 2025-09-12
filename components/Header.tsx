'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Skip Navigation Links */}
      <div className="sr-only focus-within:not-sr-only">
        <a 
          href="#main-content" 
          className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-2 z-[60] focus:relative focus:z-[60] rounded-br-md font-semibold shadow-lg transition-all duration-200 hover:bg-blue-700"
        >
          Skip to main content
        </a>
        <a 
          href="#navigation" 
          className="absolute top-0 left-32 bg-blue-600 text-white px-4 py-2 z-[60] focus:relative focus:z-[60] rounded-br-md font-semibold shadow-lg transition-all duration-200 hover:bg-blue-700"
        >
          Skip to navigation
        </a>
      </div>
      <div className="container-width">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center -ml-2">
            <Link href="/" className="hover:scale-105 transition-all duration-300 group">
              <Image
                src="/logo.png"
                alt="Maverick AI - Intelligenza Artificiale per il Business"
                width={135}
                height={45}
                priority
                className="h-11 w-auto"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }}
              />
            </Link>
          </div>


          {/* Desktop Navigation */}
          <nav id="navigation" className="hidden lg:flex space-x-8 ml-auto" role="navigation" aria-label="Main navigation">
            <Link href="/#home" className="nav-link text-gray-700 hover:text-blue-600 transition-all duration-300 relative group py-2">
              <span>Home</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-8 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link href="/#cosa-facciamo" className="nav-link text-gray-700 hover:text-blue-600 transition-all duration-300 relative group py-2">
              <span>Servizi</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-8 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link href="/#come-lavoriamo" className="nav-link text-gray-700 hover:text-blue-600 transition-all duration-300 relative group py-2">
              <span>Approccio</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-8 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link href="/#prodotti" className="nav-link text-gray-700 hover:text-blue-600 transition-all duration-300 relative group py-2">
              <span>AI aXcelerate</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-12 transition-all duration-300 rounded-full"></div>
            </Link>
            {/* <Link href="/partner" className="nav-link text-gray-700 hover:text-blue-600 transition-all duration-300 relative group py-2">
              <span>Partner</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-8 transition-all duration-300 rounded-full"></div>
            </Link> */}
            <Link href="/ai-readiness" className="nav-link text-gray-700 hover:text-blue-600 transition-all duration-300 relative group py-2">
              <span>AI Readiness Assessment</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-16 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link href="/use-cases" className="nav-link text-gray-700 hover:text-blue-600 transition-all duration-300 relative group py-2">
              <span>Case history</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-10 transition-all duration-300 rounded-full"></div>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute inset-0 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : ''}`}>
                <svg className={`w-6 h-6 text-gray-700 transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </span>
              <span className={`absolute inset-0 transition-transform duration-300 ${isMenuOpen ? 'rotate-0' : 'rotate-45 scale-0'}`}>
                <svg className={`w-6 h-6 text-gray-700 transition-opacity duration-200 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 mt-4 pt-4 animate-in fade-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/#home" 
                className="text-navy-700 hover:text-accent-500 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#cosa-facciamo" 
                className="text-navy-700 hover:text-accent-500 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Servizi
              </Link>
              <Link 
                href="/#come-lavoriamo" 
                className="text-navy-700 hover:text-accent-500 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Approccio
              </Link>
              <Link 
                href="/#prodotti" 
                className="text-navy-700 hover:text-accent-500 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                AI aXcelerate
              </Link>
              {/* <Link 
                href="/partner" 
                className="text-navy-700 hover:text-accent-500 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Partner
              </Link> */}
              <Link 
                href="/ai-readiness" 
                className="text-navy-700 hover:text-accent-500 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Readiness Assessment
              </Link>
              <Link 
                href="/use-cases" 
                className="text-navy-700 hover:text-accent-500 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Case history
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