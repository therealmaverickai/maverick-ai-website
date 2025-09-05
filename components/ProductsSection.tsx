'use client'

import { useEffect, useRef } from 'react'

export default function ProductsSection() {
  const boxRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const product = {
    name: "AI aXcelerate",
    cta: "Scopri AI aXcelerate"
  }

  useEffect(() => {
    const box = boxRef.current
    const cursor = cursorRef.current
    if (!box || !cursor) return

    let isInBox = false
    let currentMouseX = 0
    let currentMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      if (isInBox) {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
        cursor.style.transform = 'translate(-50%, -50%)'
        
        const rect = box.getBoundingClientRect()
        currentMouseX = e.clientX - rect.left
        currentMouseY = e.clientY - rect.top
        
        createParticle(currentMouseX, currentMouseY)
      }
    }

    const handleMouseEnter = () => {
      isInBox = true
      cursor.style.opacity = '1'
      cursor.style.display = 'block'
    }

    const handleMouseLeave = () => {
      isInBox = false
      cursor.style.opacity = '0'
      cursor.style.display = 'none'
    }

    let lastParticleTime = 0
    
    const createParticle = (x: number, y: number) => {
      const now = Date.now()
      if (now - lastParticleTime < 120) return
      lastParticleTime = now
      
      for (let i = 0; i < 2; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute pointer-events-none z-40 w-2 h-2 bg-blue-500 rounded-full opacity-50'
        
        const offsetX = (Math.random() - 0.5) * 25
        const offsetY = (Math.random() - 0.5) * 25
        
        particle.style.left = `${x + offsetX}px`
        particle.style.top = `${y + offsetY}px`
        particle.style.transform = 'translate(-50%, -50%)'
        
        box.appendChild(particle)
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }, 1000)
      }
    }

    box.addEventListener('mousemove', handleMouseMove)
    box.addEventListener('mouseenter', handleMouseEnter)
    box.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      box.removeEventListener('mousemove', handleMouseMove)
      box.removeEventListener('mouseenter', handleMouseEnter)  
      box.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section id="prodotti" className="bg-white section-padding">
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
            ref={boxRef}
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
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-navy-700">
                      dall'esplorazione delle opportunità AI
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center group">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 text-center border-2 border-green-100 hover:border-green-300 transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0-14h8a2 2 0 012 2v6a2 2 0 01-2 2H9m0-14v14" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-navy-700">
                      alla definizione e prioritizzazione degli use case
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center group">
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 text-center border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-navy-700">
                      fino alla prototipazione e implementazione delle soluzioni
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