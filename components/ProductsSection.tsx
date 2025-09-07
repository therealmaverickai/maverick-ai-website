'use client'

import { useEffect, useRef } from 'react'

export default function ProductsSection() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const product = {
    name: "AI aXcelerate",
    cta: "Scopri AI aXcelerate"
  }

  useEffect(() => {
    const section = document.getElementById('prodotti')
    const cursor = cursorRef.current
    if (!section || !cursor) return

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
    <section id="prodotti" className="bg-white section-padding relative overflow-hidden">
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
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="text-2xl drop-shadow-2xl transform rotate-12">🚀</div>
          </div>
        </div>
      </div>

      <div className="container-width">
        <div className="text-center">
          <div 
            className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="text-center relative z-10">
              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-4 px-4">
                AI aXcelerate
              </h2>
              
              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-navy-600 font-semibold mb-8 px-4">
                Il programma per accelerare l'adozione dell'AI in azienda
              </p>
              
              {/* Description */}
              <p className="text-base sm:text-lg text-navy-700 max-w-4xl mx-auto px-4 leading-relaxed mb-8">
                Un percorso end-to-end pensato per guidare le imprese nell'integrazione dell'intelligenza artificiale. AIxcelerate combina consulenza strategica, design dei processi e sviluppo tecnologico, accompagnando le aziende:
              </p>

              {/* Fancy Bullet Points */}
              <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto mb-10 px-4">
                <div className="flex-1 flex items-center justify-center group">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">1</span>
                    </div>
                    <p className="text-sm font-semibold text-navy-700">
                      Dall'esplorazione delle opportunità per la tua azienda
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center group">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 text-center border-2 border-green-100 hover:border-green-300 transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">2</span>
                    </div>
                    <p className="text-sm font-semibold text-navy-700">
                      Alla definizione e prioritizzazione degli use case
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center group">
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 text-center border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">3</span>
                    </div>
                    <p className="text-sm font-semibold text-navy-700">
                      Fino alla prototipazione e implementazione delle soluzioni
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <a href="/ai-axcelerate" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-block text-center">
                  {product.cta}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Pronto a rivoluzionare il tuo business?
              </h3>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Scopri come AI aXcelerate può accelerare la tua trasformazione digitale con una demo personalizzata
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contatti" className="bg-white text-navy-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-block text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                  Parla con un esperto
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}