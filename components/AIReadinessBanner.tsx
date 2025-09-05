'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function AIReadinessBanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cursor = cursorRef.current
    if (!section || !cursor) {
      return
    }

    let isInSection = false
    let currentMouseX = 0
    let currentMouseY = 0
    let particleInterval: NodeJS.Timeout | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (isInSection) {
        // Use viewport coordinates for fixed cursor
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
        cursor.style.transform = 'translate(-50%, -50%)'
        
        // Update current mouse position
        const rect = section.getBoundingClientRect()
        currentMouseX = e.clientX - rect.left
        currentMouseY = e.clientY - rect.top
        
        // Create particle trail using section-relative coordinates
        createParticle(currentMouseX, currentMouseY)
      }
    }

    const startContinuousParticles = () => {
      // Create particles every 300ms when stationary
      particleInterval = setInterval(() => {
        if (isInSection && currentMouseX !== 0 && currentMouseY !== 0) {
          createParticle(currentMouseX, currentMouseY)
        }
      }, 300)
    }

    const stopContinuousParticles = () => {
      if (particleInterval) {
        clearInterval(particleInterval)
        particleInterval = null
      }
    }

    const handleMouseEnter = () => {
      isInSection = true
      cursor.style.opacity = '1'
      cursor.style.display = 'block'
      document.body.style.cursor = 'none'
      startContinuousParticles()
    }

    const handleMouseLeave = () => {
      isInSection = false
      cursor.style.opacity = '0'
      cursor.style.display = 'none'
      document.body.style.cursor = 'default'
      stopContinuousParticles()
    }

    let lastParticleTime = 0
    
    const createParticle = (x: number, y: number) => {
      const now = Date.now()
      if (now - lastParticleTime < 120) return
      lastParticleTime = now
      
      // Create 2-3 particles for effect
      for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute pointer-events-none z-40 w-2 h-2 bg-blue-500 rounded-full opacity-50 tech-particle'
        
        // Small random offset
        const offsetX = (Math.random() - 0.5) * 25
        const offsetY = (Math.random() - 0.5) * 25
        
        particle.style.left = `${x + offsetX}px`
        particle.style.top = `${y + offsetY}px`
        particle.style.transform = 'translate(-50%, -50%)'
        
        section.appendChild(particle)
        
        // Clean removal
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }, 1000)
      }
    }

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseenter', handleMouseEnter)
    section.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseenter', handleMouseEnter)  
      section.removeEventListener('mouseleave', handleMouseLeave)
      stopContinuousParticles()
      document.body.style.cursor = 'default'
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="bg-white section-padding relative overflow-hidden"
    >
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed pointer-events-none z-50 opacity-0 transition-opacity duration-300"
        style={{ 
          transform: 'translate(-50%, -50%)',
          display: 'none'
        }}
      >
        <div className="relative">
          {/* Target emoji cursor for AI assessment */}
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="text-2xl drop-shadow-2xl transform">🎯</div>
          </div>
        </div>
      </div>

      <div className="container-width relative z-0">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            Assessment gratuito
          </div>
          
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            È la tua azienda pronta per l'<span className="text-blue-600">AI</span>?
          </h2>
          
          {/* Subheading */}
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Scopri in <span className="font-semibold text-gray-900">5 minuti</span> il livello di preparazione della tua azienda 
            con il nostro assessment personalizzato.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="group card p-6 text-center cursor-pointer shimmer-effect">
              <div className="text-3xl mb-3 floating-animation">⏱️</div>
              <div className="text-gray-900 font-medium">5 minuti</div>
            </div>
            <div className="group card p-6 text-center cursor-pointer shimmer-effect">
              <div className="text-3xl mb-3 floating-animation" style={{animationDelay: '0.5s'}}>🎯</div>
              <div className="text-gray-900 font-medium">Risultati immediati</div>
            </div>
            <div className="group card p-6 text-center cursor-pointer shimmer-effect">
              <div className="text-3xl mb-3 floating-animation" style={{animationDelay: '1s'}}>🔒</div>
              <div className="text-gray-900 font-medium">100% gratuito</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="pt-4">
            <Link 
              href="/ai-readiness"
              className="btn-primary text-lg px-12 py-4 inline-flex items-center space-x-3 group"
            >
              <span className="relative z-10">Inizia assessment gratuito</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}