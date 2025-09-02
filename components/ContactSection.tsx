'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  const services = [
    'AI Strategy & Consulting',
    'Generative AI Solutions', 
    'Agentic AI Systems',
    'Data Analytics & ML',
    'AI Integration & Automation',
    'Training & Support',
    'AI eXcelerate',
    'ProposAI',
    'AI Readiness Assessment'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // Clear any existing messages when user starts typing
    if (submitMessage) {
      setSubmitMessage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || undefined,
          message: formData.message,
          services: formData.service ? [formData.service] : undefined
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          text: 'Messaggio inviato con successo! Ti risponderemo entro 24 ore.'
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          service: ''
        })
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.error || 'Errore nell\'invio del messaggio. Riprova più tardi.'
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitMessage({
        type: 'error',
        text: 'Errore di connessione. Riprova più tardi.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contatti" className="bg-navy-900 text-white section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 px-4">
            Richiedi informazioni
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Sei pronto a trasformare il tuo business con l'AI? Contattaci per una consulenza personalizzata
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Form */}
          <div className="card bg-white text-navy-900 p-6 sm:p-8 mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-6">Compila il form</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-navy-700 mb-2">
                    Nome e cognome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors text-sm sm:text-base"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors text-sm sm:text-base"
                    placeholder="mario@azienda.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-navy-700 mb-2">
                  Azienda
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Nome dell'azienda"
                />
              </div>


              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-navy-700 mb-2">
                  Messaggio *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors resize-none text-sm sm:text-base"
                  placeholder="Descrivi il tuo progetto o le tue esigenze..."
                />
              </div>

              {/* Message Display */}
              {submitMessage && (
                <div className={`p-4 rounded-lg text-center ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitMessage.text}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`btn-primary w-full text-lg transition-all ${
                  isSubmitting 
                    ? 'opacity-75 cursor-not-allowed' 
                    : 'hover:transform hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Invio in corso...
                  </span>
                ) : (
                  'Invia richiesta'
                )}
              </button>

              <p className="text-sm text-navy-500 text-center">
                * Campi obbligatori. Rispettiamo la tua privacy e non condividiamo i tuoi dati.
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <h4 className="text-xl font-bold mb-4">Contatti</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@maverickai.it</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Milano, Italia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}