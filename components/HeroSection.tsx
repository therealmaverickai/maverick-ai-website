'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    // Check if this is a preview environment
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname
      setIsPreview(hostname.includes('git-') || hostname.includes('preview') || hostname.includes('vercel.app'))
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const cursor = cursorRef.current
    if (!section || !cursor) {
      console.log('Section or cursor ref not found')
      return
    }

    console.log('Hero cursor effect initialized')
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
      console.log('Mouse entered hero section')
      isInSection = true
      cursor.style.opacity = '1'
      cursor.style.display = 'block'
      document.body.style.cursor = 'none'
      startContinuousParticles()
    }

    const handleMouseLeave = () => {
      console.log('Mouse left hero section')
      isInSection = false
      cursor.style.opacity = '0'
      cursor.style.display = 'none'
      document.body.style.cursor = 'default'
      stopContinuousParticles()
    }

    let lastParticleTime = 0
    
    const createParticle = (x: number, y: number) => {
      const now = Date.now()
      if (now - lastParticleTime < 120) return // Slightly more frequent
      lastParticleTime = now
      
      // Create 2-3 particles for a bit more effect
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
      id="home" 
      className="bg-white text-gray-900 section-padding relative overflow-hidden"
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
          {/* Rocket emoji cursor - clean and simple */}
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="text-2xl drop-shadow-2xl transform rotate-12">🚀</div>
          </div>
        </div>
      </div>

      <div className="container-width relative z-0">
        {isPreview && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg mb-4 text-center">
            🚧 Preview Environment - Testing New Features
          </div>
        )}
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-8 leading-tight text-gray-900 px-4 fade-in-up"
            itemProp="headline"
            data-ai-summary="Main value proposition and company mission"
          >
            Diamo forma al <br className="hidden sm:block" />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent font-extrabold">
                business del futuro
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </h1>
          
          <p 
            className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto px-4 leading-relaxed fade-in-up stagger-animation"
            style={{"--stagger": 1} as any}
            itemProp="description"
            data-ai-summary="Core business description and value proposition"
          >
            Un partner strategico che guida le aziende nella trasformazione digitale, trasformando l'AI in soluzioni pratiche, ad alto impatto e in tempi rapidi.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center px-4 fade-in-up stagger-animation" style={{"--stagger": 2} as any}>
            <a href="#cosa-facciamo" className="btn-primary text-base px-8 py-4 inline-block text-center group relative hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Scopri i nostri servizi
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <Link 
              href="/ai-readiness"
              className="btn-secondary text-base px-8 py-4 inline-block text-center group relative overflow-hidden hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                AI Readiness Assessment
              </span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 fade-in-up stagger-animation" style={{"--stagger": 3} as any}>
            <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide font-medium">
              Già scelto da
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-gray-400 font-semibold text-lg hover:text-gray-600 transition-colors">
                Private Equity
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="text-gray-400 font-semibold text-lg hover:text-gray-600 transition-colors">
                Scale-up
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="text-gray-400 font-semibold text-lg hover:text-gray-600 transition-colors">
                Enterprise
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}