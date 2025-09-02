'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])

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
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight text-gray-900 px-4">
            Diamo forma al <br className="hidden sm:block" />
            <span className="text-blue-600">
              business del futuro
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto px-4 leading-relaxed">
            Partner strategici per la trasformazione digitale attraverso 
            l'intelligenza artificiale generativa e agentiche
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <a href="#cosa-facciamo" className="btn-primary text-base px-8 py-3 inline-block text-center group relative">
              <span className="relative z-10">Scopri i nostri servizi</span>
            </a>
            <Link 
              href="/ai-readiness"
              className="btn-secondary text-base px-8 py-3 inline-block text-center group"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                AI readiness assessment
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}