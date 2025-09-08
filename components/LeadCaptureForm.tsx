'use client'

import { useState } from 'react'
import { z } from 'zod'

// Validation schema
const leadSchema = z.object({
  fullName: z.string().min(2, 'Nome deve contenere almeno 2 caratteri'),
  email: z.string().email('Inserisci un email valida'),
  company: z.string().min(2, 'Nome azienda richiesto'),
  website: z.string().url('Inserisci un URL valido').optional().or(z.literal('')),
  industry: z.string().min(1, 'Seleziona un settore'),
  companySize: z.string().min(1, 'Seleziona la dimensione aziendale'),
  jobRole: z.string().min(2, 'Ruolo richiesto'),
  businessDescription: z.string().min(20, 'Descrizione deve contenere almeno 20 caratteri')
})

type LeadFormData = z.infer<typeof leadSchema>

interface LeadCaptureFormProps {
  onSubmit: (data: LeadFormData) => void
  isLoading?: boolean
}

export default function LeadCaptureForm({ onSubmit, isLoading }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    company: '',
    website: '',
    industry: '',
    companySize: '',
    jobRole: '',
    businessDescription: ''
  })

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({})

  const industries = [
    'Tecnologia e Software',
    'Servizi Finanziari',
    'Sanità e Farmaceutico',
    'Retail e E-commerce',
    'Manifatturiero',
    'Energia e Utilities',
    'Trasporti e Logistica',
    'Immobiliare',
    'Educazione',
    'Media e Comunicazione',
    'Consulenza',
    'Agricoltura e Alimentare',
    'Automotive',
    'Costruzioni',
    'Turismo e Hospitality',
    'Beni di Lusso',
    'Servizi Professionali',
    'Non-profit',
    'Governo e Pubblica Amministrazione',
    'Telecomunicazioni',
    'Chimica e Materiali',
    'Aerospaziale e Difesa',
    'Moda e Tessile',
    'Sport e Fitness',
    'Arte e Cultura',
    'Altro'
  ]

  const companySizes = [
    { value: 'startup', label: 'Startup (1-10 dipendenti)' },
    { value: 'sme', label: 'PMI (11-250 dipendenti)' },
    { value: 'enterprise', label: 'Grande Impresa (250+ dipendenti)' }
  ]

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const validatedData = leadSchema.parse(formData)
      setErrors({})
      onSubmit(validatedData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof LeadFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const field = err.path[0] as keyof LeadFormData
            newErrors[field] = err.message
          }
        })
        setErrors(newErrors)
      }
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-base font-semibold text-gray-800 mb-3">
            Nome e Cognome *
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Mario Rossi"
            disabled={isLoading}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-base font-semibold text-gray-800 mb-3">
            Email Aziendale *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="mario.rossi@azienda.it"
            disabled={isLoading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
        </div>

        {/* Company and Website Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-base font-semibold text-gray-800 mb-3">
              Nome Azienda *
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Acme S.r.l."
              disabled={isLoading}
            />
            {errors.company && <p className="text-red-500 text-sm mt-2">{errors.company}</p>}
          </div>

          <div>
            <label htmlFor="website" className="block text-base font-semibold text-gray-800 mb-3">
              Sito Web Aziendale
            </label>
            <input
              type="url"
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg ${
                errors.website ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://www.azienda.it"
              disabled={isLoading}
            />
            {errors.website && <p className="text-red-500 text-sm mt-2">{errors.website}</p>}
          </div>
        </div>

        {/* Industry and Company Size Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="industry" className="block text-base font-semibold text-gray-800 mb-3">
              Settore di Attività *
            </label>
            <select
              id="industry"
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg ${
                errors.industry ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            >
              <option value="">Seleziona settore</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {errors.industry && <p className="text-red-500 text-sm mt-2">{errors.industry}</p>}
          </div>

          <div>
            <label htmlFor="companySize" className="block text-base font-semibold text-gray-800 mb-3">
              Dimensione Azienda *
            </label>
            <select
              id="companySize"
              value={formData.companySize}
              onChange={(e) => handleInputChange('companySize', e.target.value)}
              className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg ${
                errors.companySize ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            >
              <option value="">Seleziona dimensione</option>
              {companySizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
            {errors.companySize && <p className="text-red-500 text-sm mt-2">{errors.companySize}</p>}
          </div>
        </div>

        {/* Job Role */}
        <div>
          <label htmlFor="jobRole" className="block text-base font-semibold text-gray-800 mb-3">
            Ruolo/Posizione *
          </label>
          <input
            type="text"
            id="jobRole"
            value={formData.jobRole}
            onChange={(e) => handleInputChange('jobRole', e.target.value)}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg ${
              errors.jobRole ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="CEO, CTO, Direttore Operativo, etc."
            disabled={isLoading}
          />
          {errors.jobRole && <p className="text-red-500 text-sm mt-2">{errors.jobRole}</p>}
        </div>

        {/* Business Description */}
        <div>
          <label htmlFor="businessDescription" className="block text-base font-semibold text-gray-800 mb-3">
            Descrizione del Business *
          </label>
          <textarea
            id="businessDescription"
            rows={5}
            value={formData.businessDescription}
            onChange={(e) => handleInputChange('businessDescription', e.target.value)}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-lg ${
              errors.businessDescription ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Descrivi brevemente la tua azienda, i principali prodotti/servizi, i processi chiave e le sfide operative che affronti quotidianamente..."
            disabled={isLoading}
          />
          {errors.businessDescription && <p className="text-red-500 text-sm mt-2">{errors.businessDescription}</p>}
          <p className="text-base text-gray-600 mt-2">
            Minimo 20 caratteri - Più dettagli fornisci, più personalizzate saranno le raccomandazioni AI
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xl shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-4"></div>
                Analisi in corso...
              </div>
            ) : (
              <>
                🤖 Avvia AI Assistant
              </>
            )}
          </button>

          <p className="text-sm text-gray-600 text-center mt-6">
            I tuoi dati saranno utilizzati esclusivamente per fornire consulenza personalizzata e non saranno condivisi con terze parti.
          </p>
        </div>
      </form>
    </div>
  )
}