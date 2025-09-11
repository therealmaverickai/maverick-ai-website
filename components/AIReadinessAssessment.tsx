'use client'

import { useState } from 'react'
import RatingSlider from './RatingSlider'
import { useGoogleAnalytics } from './GoogleAnalytics'

interface AssessmentData {
  // Contact Info
  email: string
  name: string
  role: string
  company: string
  website: string
  privacyConsent: boolean
  
  // Assessment Questions (exact from your survey)
  aiVisionClarity: number // 1-5: Da 1 a 5, quanto l'azienda ha una visione chiara sull'AI
  visionFormalized: 'si' | 'no' | 'in_parte'
  aiStrategicImportance: 'si' | 'no' | 'parzialmente' 
  competitiveAdvantage: number // 1-5: quanto l'AI sarà un fattore chiave di vantaggio competitivo
  investmentPlans: 'si' | 'no'
  currentProjects: '0' | '1-3' | '3-7' | '>7'
  aiAreas: string[] // multiple selection
  pilotProjects: 'si' | 'no' | 'previsto_a_breve'
  employeeUsage: number // 1-5: grado di utilizzo AI da parte dipendenti
  managementUsage: number // 1-5: grado di utilizzo AI da parte management
  mainChallenges: string[] // select 2 most relevant
  partnerships: 'si' | 'no' | 'previste_a_breve'
  dataReadiness: 'si' | 'no' | 'parzialmente'
  internalSkills: 'si' | 'no' | 'limitate'
  trainingInitiatives: 'si' | 'no' | 'previste_a_breve'
  decisionMakerAwareness: 'si' | 'no' | 'parzialmente'
  dedicatedTeam: 'si' | 'no' | 'previsto_a_breve'
  aiPolicies: 'si' | 'no' | 'parzialmente' | 'non_lo_so'
  aiMetrics: 'si' | 'no' | 'in_sviluppo'
}

const AI_AREAS = [
  'Automazione processi',
  'Customer service',
  'Analisi dati',
  'Generazione contenuti'
]

const CHALLENGES = [
  'Resistenza al cambiamento',
  'Mancanza di una visione e di una strategia',
  'Mancanza di competenze',
  'Assenza di use case rilevanti per il nostro settore',
  'Necessità di investimenti ingenti'
]

export default function AIReadinessAssessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<Partial<AssessmentData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [emailError, setEmailError] = useState('')
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [reportRequestStatus, setReportRequestStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const { trackEvent } = useGoogleAnalytics()

  const steps = [
    { name: 'Informazioni Aziendali', icon: '👤', color: 'from-blue-500 to-blue-600' },
    { name: 'Visione e Strategia AI', icon: '🎯', color: 'from-purple-500 to-purple-600' }, 
    { name: 'Progetti AI', icon: '🚀', color: 'from-green-500 to-green-600' },
    { name: 'Utilizzo Attuale', icon: '⚡', color: 'from-orange-500 to-orange-600' },
    { name: 'Organizzazione e Governance', icon: '🏢', color: 'from-red-500 to-red-600' },
    { name: 'Risultati', icon: '📊', color: 'from-indigo-500 to-indigo-600' }
  ]

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const handleDetailedReportRequest = async () => {
    setReportRequestStatus('sending')
    
    try {
      // Send notification to admin about detailed report request
      const response = await fetch('/api/detailed-report-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: data.email,
          userName: data.name,
          userRole: data.role,
          userCompany: data.company,
          assessmentScore: results.score,
          assessmentCluster: results.cluster,
          requestedAt: new Date().toISOString()
        }),
      })

      const result = await response.json()
      
      if (response.ok && result.success) {
        setReportRequestStatus('sent')
        
        // Track event
        trackEvent('detailed_report_requested', 'ai_assessment', `company_${data.company}`)
      } else {
        console.error('Failed to send detailed report request:', result.error)
        setReportRequestStatus('error')
      }
    } catch (error) {
      console.error('Error requesting detailed report:', error)
      setReportRequestStatus('error')
    }
  }

  const handleInputChange = (field: keyof AssessmentData, value: any) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Real-time email validation
    if (field === 'email') {
      if (value && !validateEmail(value)) {
        setEmailError('Inserisci un indirizzo email valido')
      } else {
        setEmailError('')
      }
    }
  }

  const handleArrayChange = (field: keyof AssessmentData, value: string, checked: boolean) => {
    setData(prev => {
      const currentArray = (prev[field] as string[]) || []
      if (checked) {
        return {
          ...prev,
          [field]: [...currentArray, value]
        }
      } else {
        return {
          ...prev,
          [field]: currentArray.filter(item => item !== value)
        }
      }
    })
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      // Track step progression
      trackEvent('step_completed', 'ai_assessment', `step_${currentStep + 1}_${steps[currentStep].name}`, currentStep + 1)
      
      setCurrentStep(currentStep + 1)
      
      // Scroll to assessment container with better targeting
      setTimeout(() => {
        const assessmentElement = document.getElementById('assessment-container')
        if (assessmentElement) {
          assessmentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          // Fallback to window scroll
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100) // Small delay to ensure DOM update
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateScore = () => {
    let totalScore = 0
    
    // 1-5 Scale questions (use numerical value)
    const scaleQuestions = [
      data.aiVisionClarity,
      data.competitiveAdvantage, 
      data.employeeUsage,
      data.managementUsage
    ]
    
    scaleQuestions.forEach(score => {
      if (score) {
        totalScore += score
      }
    })

    // Si/No/Parzialmente questions (Si=5, No=0, Parzialmente=3)
    const binaryQuestions = [
      data.visionFormalized,
      data.aiStrategicImportance,
      data.investmentPlans,
      data.pilotProjects,
      data.partnerships,
      data.dataReadiness,
      data.internalSkills,
      data.trainingInitiatives,
      data.decisionMakerAwareness,
      data.dedicatedTeam,
      data.aiPolicies,
      data.aiMetrics
    ]

    binaryQuestions.forEach(answer => {
      if (answer === 'si') {
        totalScore += 5
      } else if (answer === 'parzialmente') {
        totalScore += 3
      } else if (answer === 'no') {
        totalScore += 0
      }
      // Handle other middle values
      else if (['previsto_a_breve', 'previste_a_breve', 'in_sviluppo', 'non_lo_so'].includes(answer as string)) {
        totalScore += 3 // Middle value
      }
    })

    // Normalize using your formula: (totalScore/(16*5))*100
    // 16 questions total (4 scale + 12 binary), max 5 points each
    const normalizedScore = Math.round((totalScore / (16 * 5)) * 100)
    
    return {
      score: normalizedScore,
      cluster: getCluster(normalizedScore),
      details: {
        totalScore,
        maxPossibleScore: 16 * 5,
        normalizedScore
      }
    }
  }

  const getCluster = (normalizedScore: number) => {
    // Your exact clustering formula
    if (normalizedScore <= 30) return 'AI Explorer'
    if (normalizedScore <= 45) return 'AI Starter' 
    if (normalizedScore <= 65) return 'AI Adopter'
    return 'AI Leader'
  }

  const getRecommendations = (cluster: string) => {
    const recommendations = {
      'AI Explorer': (
        <>
          <p><strong>🔍 AI Explorer (0-30%)</strong></p>
          <p>La tua azienda si trova alle prime fasi del percorso AI. È il momento perfetto per iniziare a costruire le fondamenta:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Definisci una vision AI</strong>: Inizia con workshop strategici per identificare opportunità specifiche per il tuo settore</li>
            <li><strong>Forma il team</strong>: Investi nella formazione base sull'AI per decision makers e dipendenti chiave</li>
            <li><strong>Identifica quick wins</strong>: Parti con progetti pilota a basso rischio ma alto impatto visibile</li>
            <li><strong>Struttura i dati</strong>: Inizia a organizzare e pulire i tuoi dati aziendali</li>
          </ul>
          <p className="text-accent-600 font-semibold">💡 Prossimo passo: Richiedi una consulenza gratuita per definire la tua roadmap AI personalizzata</p>
        </>
      ),
      'AI Starter': (
        <>
          <p><strong>🚀 AI Starter (31-45%)</strong></p>
          <p>Hai già mosso i primi passi! Ora è il momento di accelerare e strutturare il tuo approccio:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Formalizza la strategia</strong>: Documenta vision, obiettivi e roadmap AI aziendale</li>
            <li><strong>Amplia le competenze</strong>: Organizza training avanzati e considera assunzioni strategiche</li>
            <li><strong>Scale i progetti pilota</strong>: Trasforma i test iniziali in soluzioni operative</li>
            <li><strong>Definisci governance</strong>: Crea policy interne e metriche per monitorare i progressi</li>
          </ul>
          <p className="text-accent-600 font-semibold">💡 Prossimo passo: Implementa una strategia AI strutturata per accelerare l'adozione</p>
        </>
      ),
      'AI Adopter': (
        <>
          <p><strong>⚡ AI Adopter (46-65%)</strong></p>
          <p>Ottimo lavoro! Hai una base solida. Ora concentrati su scalabilità e ottimizzazione:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Scala le soluzioni</strong>: Estendi i progetti di successo ad altre aree aziendali</li>
            <li><strong>Ottimizza i processi</strong>: Integra l'AI nei workflow esistenti per massimizzare l'efficienza</li>
            <li><strong>Misura il ROI</strong>: Implementa KPI avanzati per quantificare il valore generato</li>
            <li><strong>Innova continuamente</strong>: Esplora tecnologie emergenti e use case avanzati</li>
          </ul>
          <p className="text-accent-600 font-semibold">💡 Prossimo passo: Diventa un'azienda AI-native ottimizzando e scalando le tue soluzioni</p>
        </>
      ),
      'AI Leader': (
        <>
          <p><strong>🏆 AI Leader (66-100%)</strong></p>
          <p>Congratulazioni! Sei tra i leader dell'adozione AI. Concentrati su innovazione e competitive advantage:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Innova costantemente</strong>: Rimani all'avanguardia con le tecnologie AI più recenti</li>
            <li><strong>Competitive advantage</strong>: Usa l'AI per creare vantaggi competitivi unici e difendibili</li>
            <li><strong>Ecosystem building</strong>: Collabora con partner, università e startup per accelerare l'innovazione</li>
            <li><strong>Best practices sharing</strong>: Diventa un riferimento nel tuo settore condividendo le tue esperienze</li>
          </ul>
          <p className="text-accent-600 font-semibold">💡 Prossimo passo: Mantieni la leadership esplorando frontiere AI avanzate e casi d'uso rivoluzionari</p>
        </>
      )
    }
    
    return recommendations[cluster as keyof typeof recommendations] || recommendations['AI Explorer']
  }

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: // Contact Info
        return data.name && data.email && data.role && data.company && 
               !emailError && validateEmail(data.email || '') && data.privacyConsent
      case 1: // Strategy
        return data.aiVisionClarity && data.visionFormalized && data.aiStrategicImportance && 
               data.competitiveAdvantage && data.investmentPlans
      case 2: // Projects
        return data.currentProjects && data.pilotProjects
      case 3: // Usage
        return data.employeeUsage && data.managementUsage && 
               (data.mainChallenges && data.mainChallenges.length === 2) && data.partnerships
      case 4: // Organization
        return data.dataReadiness && data.internalSkills && data.trainingInitiatives && 
               data.decisionMakerAwareness && data.dedicatedTeam && data.aiPolicies && data.aiMetrics
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Track assessment start
    trackEvent('assessment_submitted', 'ai_assessment', `company_${data.company}`)
    
    try {
      const assessment = calculateScore()
      
      // Send results to API
      const response = await fetch('/api/ai-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          assessment
        }),
      })

      const apiResult = await response.json()
      
      if (response.ok) {
        if (apiResult.success && apiResult.assessment) {
          setResults(apiResult.assessment)
          
          // Track successful assessment completion
          trackEvent('assessment_completed', 'ai_assessment', assessment.cluster, assessment.score)
        } else {
          setResults(assessment)
        }
        nextStep()
      } else {
        // Handle validation errors
        console.error('Assessment submission failed:', apiResult)
        alert(`Errore nell'invio: ${apiResult.error || 'Si è verificato un errore'}`)
        
        // Still show local results as fallback
        setResults(assessment)
        nextStep()
      }
    } catch (error) {
      console.error('Assessment submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Iniziamo con alcune informazioni sulla tua azienda per personalizzare l'assessment
              </p>
            </div>
            
            {/* Personal Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Informazioni Personali</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    required
                    value={data.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-4 text-base border-2 border-transparent bg-white rounded-xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 hover:shadow-md"
                    placeholder="Mario Rossi"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Aziendale *
                  </label>
                  <input
                    type="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Inserisci un indirizzo email valido"
                    value={data.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-4 text-base border-2 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md ${
                      emailError 
                        ? 'border-red-500 bg-red-50 focus:ring-4 focus:ring-red-500/10' 
                        : 'border-transparent bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                    }`}
                    placeholder="mario@azienda.com"
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2" role="alert" aria-live="polite">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {emailError}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Company Info Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Informazioni Aziendali</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Ruolo in azienda *
                  </label>
                  <input
                    type="text"
                    required
                    value={data.role || ''}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="w-full px-4 py-4 text-base border-2 border-transparent bg-white rounded-xl shadow-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 hover:shadow-md"
                    placeholder="CEO, CTO, Manager, ecc."
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Società *
                  </label>
                  <input
                    type="text"
                    required
                    value={data.company || ''}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-4 text-base border-2 border-transparent bg-white rounded-xl shadow-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 hover:shadow-md"
                    placeholder="Nome dell'azienda"
                  />
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Sito web della società
                </label>
                <input
                  type="text"
                  value={data.website || ''}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-4 text-base border-2 border-transparent bg-white rounded-xl shadow-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 hover:shadow-md"
                  placeholder="sito web"
                />
              </div>
            </div>

            {/* Privacy and Consent Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Privacy e Consenso</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      checked={data.privacyConsent || false}
                      onChange={(e) => handleInputChange('privacyConsent', e.target.checked)}
                      className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2 transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label htmlFor="privacyConsent" className="text-base font-semibold text-gray-800 cursor-pointer block mb-3">
                      Acconsento al trattamento dei dati personali *
                    </label>
                    
                    {/* Accordion */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                        className="w-full px-4 py-3 bg-gray-50 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-700">Dettagli sul trattamento dei dati</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isAccordionOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Accordion Content */}
                      <div className={`transition-all duration-300 ${isAccordionOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 bg-white text-sm text-gray-700 leading-relaxed border-t border-gray-200">
                          <p className="font-medium mb-3">Acconsento al trattamento dei miei dati personali per:</p>
                          <ul className="list-disc ml-5 space-y-2">
                            <li>Elaborazione e invio dei risultati dell'assessment</li>
                            <li>Contatto per consulenze e servizi relativi all'AI</li>
                            <li>Invio di comunicazioni di marketing sui prodotti e servizi Maverick AI</li>
                          </ul>
                          <p className="text-xs text-gray-600 mt-4 p-3 bg-gray-50 rounded-lg">
                            🔒 I tuoi dati saranno trattati in conformità con la nostra{' '}
                            <a href="/privacy" target="_blank" className="text-green-600 hover:text-green-700 underline font-medium">
                              Privacy Policy
                            </a>
                            . Puoi revocare il consenso in qualsiasi momento.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {!data.privacyConsent && (
                      <p className="mt-3 text-sm text-red-600 flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Il consenso è obbligatorio per continuare con l'assessment
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-12">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Scopriamo quanto la tua azienda ha sviluppato una visione strategica sull'AI
              </p>
            </div>
            
            {/* Vision Clarity Card */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Chiarezza della Visione AI</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  Da 1 a 5, quanto l'azienda ha una visione chiara sull'AI e il suo impatto sul business? *
                </label>
                <RatingSlider
                  value={data.aiVisionClarity || 1}
                  onChange={(value) => handleInputChange('aiVisionClarity', value)}
                  min={1}
                  max={5}
                  leftLabel="Per nulla chiara"
                  rightLabel="Molto chiara"
                />
              </div>
            </div>

            {/* Vision Documentation Card */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Formalizzazione Strategia</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  La vision e la strategia aziendale sull'AI sono formalizzate in un documento? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3" role="radiogroup" aria-required="true">
                  {[
                    { value: 'si', label: 'Sì', icon: '✅', color: 'from-green-500 to-green-600' },
                    { value: 'in_parte', label: 'In parte', icon: '⚠️', color: 'from-yellow-500 to-yellow-600' },
                    { value: 'no', label: 'No', icon: '❌', color: 'from-red-500 to-red-600' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.visionFormalized === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('visionFormalized', option.value)}>
                      <input
                        type="radio"
                        name="visionFormalized"
                        value={option.value}
                        checked={data.visionFormalized === option.value}
                        onChange={(e) => handleInputChange('visionFormalized', e.target.value)}
                        className="sr-only"
                        aria-describedby={`vision-formalized-${option.value}-desc`}
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.visionFormalized === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-semibold">{option.label}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Importance Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Importanza Strategica</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  L'AI è considerata un elemento chiave nella strategia aziendale? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'si', label: 'Sì', icon: '🎯', color: 'from-emerald-500 to-emerald-600' },
                    { value: 'parzialmente', label: 'Parzialmente', icon: '🤔', color: 'from-orange-500 to-orange-600' },
                    { value: 'no', label: 'No', icon: '🚫', color: 'from-gray-500 to-gray-600' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.aiStrategicImportance === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('aiStrategicImportance', option.value)}>
                      <input
                        type="radio"
                        name="aiStrategicImportance"
                        value={option.value}
                        checked={data.aiStrategicImportance === option.value}
                        onChange={(e) => handleInputChange('aiStrategicImportance', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.aiStrategicImportance === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-semibold">{option.label}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Competitive Advantage Card */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Vantaggio Competitivo</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  Da 1 a 5, quanto l'AI sarà un fattore chiave di vantaggio competitivo nel vostro settore entro i prossimi 3/5 anni? *
                </label>
                <RatingSlider
                  value={data.competitiveAdvantage || 1}
                  onChange={(value) => handleInputChange('competitiveAdvantage', value)}
                  min={1}
                  max={5}
                  leftLabel="Poco importante"
                  rightLabel="Molto importante"
                />
              </div>
            </div>

            {/* Investment Plans Card */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Piani di Investimento</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  L'azienda sta pianificando investimenti in AI nei prossimi 12 mesi? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: 'si', label: 'Sì', icon: '💰', color: 'from-green-500 to-green-600', desc: 'Abbiamo budget allocato' },
                    { value: 'no', label: 'No', icon: '🚫', color: 'from-gray-500 to-gray-600', desc: 'Non sono previsti investimenti' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.investmentPlans === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('investmentPlans', option.value)}>
                      <input
                        type="radio"
                        name="investmentPlans"
                        value={option.value}
                        checked={data.investmentPlans === option.value}
                        onChange={(e) => handleInputChange('investmentPlans', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                        data.investmentPlans === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-3xl mb-3">{option.icon}</div>
                          <div className="font-bold text-lg mb-2">{option.label}</div>
                          <div className={`text-sm ${
                            data.investmentPlans === option.value ? 'text-white/80' : 'text-gray-500'
                          }`}>{option.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Parliamo dei progetti AI che hai già realizzato o che stai pianificando
              </p>
            </div>
            
            {/* Current Projects Count Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Progetti AI Attivi</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  Quanti progetti AI avete già realizzato o state attualmente sviluppando? *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: '0', label: '0', icon: '🆕', color: 'from-gray-500 to-gray-600', desc: 'Siamo all\'inizio' },
                    { value: '1-3', label: '1-3', icon: '🌱', color: 'from-blue-500 to-blue-600', desc: 'Prime esperienze' },
                    { value: '3-7', label: '3-7', icon: '🚀', color: 'from-green-500 to-green-600', desc: 'Buona esperienza' },
                    { value: '>7', label: '>7', icon: '🏆', color: 'from-purple-500 to-purple-600', desc: 'Esperti AI' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.currentProjects === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('currentProjects', option.value)}>
                      <input
                        type="radio"
                        name="currentProjects"
                        value={option.value}
                        checked={data.currentProjects === option.value}
                        onChange={(e) => handleInputChange('currentProjects', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.currentProjects === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-bold text-lg mb-1">{option.label}</div>
                          <div className={`text-xs ${
                            data.currentProjects === option.value ? 'text-white/80' : 'text-gray-500'
                          }`}>{option.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Areas Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Ambiti di Applicazione</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  Per quali ambiti l'azienda sta considerando/utilizzando l'AI? (selezione multipla)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { area: 'Automazione processi', icon: '🔄', color: 'from-orange-500 to-orange-600' },
                    { area: 'Customer service', icon: '🎧', color: 'from-green-500 to-green-600' },
                    { area: 'Analisi dati', icon: '📊', color: 'from-purple-500 to-purple-600' },
                    { area: 'Generazione contenuti', icon: '✍️', color: 'from-pink-500 to-pink-600' }
                  ].map(({area, icon, color}) => (
                    <label key={area} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      (data.aiAreas || []).includes(area) ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}>
                      <input
                        type="checkbox"
                        checked={(data.aiAreas || []).includes(area)}
                        onChange={(e) => handleArrayChange('aiAreas', area, e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        (data.aiAreas || []).includes(area)
                          ? `border-transparent bg-gradient-to-br ${color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{icon}</div>
                          <div className="font-semibold">{area}</div>
                          {(data.aiAreas || []).includes(area) && (
                            <div className="ml-auto">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Selezionate: {(data.aiAreas || []).length} ambiti
                </p>
              </div>
            </div>

            {/* Pilot Projects Card */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Progetti Pilota</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  L'azienda ha già testato dei progetti pilota o Proof of Concept (PoC) di soluzioni AI? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'si', label: 'Sì', icon: '✅', color: 'from-green-500 to-green-600', desc: 'Abbiamo testato soluzioni' },
                    { value: 'no', label: 'No', icon: '🚫', color: 'from-red-500 to-red-600', desc: 'Non abbiamo ancora iniziato' },
                    { value: 'previsto_a_breve', label: 'A breve', icon: '⏳', color: 'from-yellow-500 to-yellow-600', desc: 'Pianifichiamo di iniziare' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.pilotProjects === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('pilotProjects', option.value)}>
                      <input
                        type="radio"
                        name="pilotProjects"
                        value={option.value}
                        checked={data.pilotProjects === option.value}
                        onChange={(e) => handleInputChange('pilotProjects', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.pilotProjects === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-bold mb-2">{option.label}</div>
                          <div className={`text-xs ${
                            data.pilotProjects === option.value ? 'text-white/80' : 'text-gray-500'
                          }`}>{option.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Analizziamo l'utilizzo attuale dell'AI nella tua organizzazione
              </p>
            </div>
            
            {/* Employee Usage Card */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Utilizzo da parte dei Dipendenti</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  Da 1 a 5, quanto è alto il grado di utilizzo dell'AI (es. ChatGPT/Copilot o altre soluzioni) da parte dei dipendenti? *
                </label>
                <RatingSlider
                  value={data.employeeUsage || 1}
                  onChange={(value) => handleInputChange('employeeUsage', value)}
                  min={1}
                  max={5}
                  leftLabel="Molto basso"
                  rightLabel="Molto alto"
                />
              </div>
            </div>

            {/* Management Usage Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Utilizzo da parte del Management</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  Da 1 a 5, quanto è alto il grado di utilizzo dell'AI (es. ChatGPT/Copilot o altre soluzioni) da parte del management? *
                </label>
                <RatingSlider
                  value={data.managementUsage || 1}
                  onChange={(value) => handleInputChange('managementUsage', value)}
                  min={1}
                  max={5}
                  leftLabel="Molto basso"
                  rightLabel="Molto alto"
                />
              </div>
            </div>

            {/* Main Challenges Card */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Principali Sfide</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  Quali sono le principali sfide che la vostra organizzazione deve/dovrà affrontare nell'adozione dell'AI? (seleziona le 2 più rilevanti) *
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { challenge: 'Resistenza al cambiamento', icon: '🛑', color: 'from-red-500 to-red-600' },
                    { challenge: 'Mancanza di una visione e di una strategia', icon: '🎯', color: 'from-orange-500 to-orange-600' },
                    { challenge: 'Mancanza di competenze', icon: '🎓', color: 'from-blue-500 to-blue-600' },
                    { challenge: 'Assenza di use case rilevanti per il nostro settore', icon: '❓', color: 'from-purple-500 to-purple-600' },
                    { challenge: 'Necessità di investimenti ingenti', icon: '💰', color: 'from-green-500 to-green-600' }
                  ].map(({challenge, icon, color}) => {
                    const isSelected = (data.mainChallenges || []).includes(challenge)
                    const isDisabled = (data.mainChallenges || []).length >= 2 && !isSelected
                    
                    return (
                      <label key={challenge} className={`relative overflow-hidden cursor-pointer transition-all duration-200 ${
                        isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                      } ${isSelected ? 'scale-105 shadow-lg' : 'shadow-sm'}`}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            const currentChallenges = data.mainChallenges || []
                            if (e.target.checked && currentChallenges.length >= 2) {
                              return // Limit to 2 selections
                            }
                            handleArrayChange('mainChallenges', challenge, e.target.checked)
                          }}
                          disabled={isDisabled}
                          className="sr-only"
                        />
                        <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? `border-transparent bg-gradient-to-br ${color} text-white` 
                            : isDisabled
                              ? 'border-gray-200 bg-gray-50 text-gray-400'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{icon}</div>
                            <div className="font-semibold flex-1">{challenge}</div>
                            {isSelected && (
                              <div className="ml-auto">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </label>
                    )
                  })}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <p className="text-gray-500">
                    Selezionate: {(data.mainChallenges || []).length}/2
                  </p>
                  {(data.mainChallenges || []).length === 2 && (
                    <p className="text-green-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Completato
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Partnerships Card */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Partnership e Collaborazioni</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  L'azienda ha collaborazioni o partnership con esperti di AI, università o startup? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'si', label: 'Sì', icon: '🤝', color: 'from-green-500 to-green-600', desc: 'Abbiamo partnership attive' },
                    { value: 'no', label: 'No', icon: '🚫', color: 'from-red-500 to-red-600', desc: 'Non abbiamo collaborazioni' },
                    { value: 'previste_a_breve', label: 'A breve', icon: '⏳', color: 'from-yellow-500 to-yellow-600', desc: 'Stiamo pianificando' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.partnerships === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('partnerships', option.value)}>
                      <input
                        type="radio"
                        name="partnerships"
                        value={option.value}
                        checked={data.partnerships === option.value}
                        onChange={(e) => handleInputChange('partnerships', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.partnerships === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-bold mb-2">{option.label}</div>
                          <div className={`text-xs ${
                            data.partnerships === option.value ? 'text-white/80' : 'text-gray-500'
                          }`}>{option.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Esaminiamo l'organizzazione e la governance AI della tua azienda
              </p>
            </div>
            
            {/* Data Readiness Card */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Preparazione dei Dati</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  I dati aziendali sono sufficientemente strutturati e accessibili per sviluppare soluzioni AI? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'si', label: 'Sì', icon: '✅', color: 'from-green-500 to-green-600', desc: 'Dati strutturati e accessibili' },
                    { value: 'parzialmente', label: 'Parzialmente', icon: '⚠️', color: 'from-yellow-500 to-yellow-600', desc: 'Alcuni dati sono pronti' },
                    { value: 'no', label: 'No', icon: '❌', color: 'from-red-500 to-red-600', desc: 'Dati non strutturati' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.dataReadiness === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('dataReadiness', option.value)}>
                      <input
                        type="radio"
                        name="dataReadiness"
                        value={option.value}
                        checked={data.dataReadiness === option.value}
                        onChange={(e) => handleInputChange('dataReadiness', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.dataReadiness === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-bold mb-2">{option.label}</div>
                          <div className={`text-xs ${
                            data.dataReadiness === option.value ? 'text-white/80' : 'text-gray-500'
                          }`}>{option.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Internal Skills Card */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Competenze Interne</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  Il team aziendale ha competenze interne (sia tecniche che di business) per sviluppare e gestire soluzioni AI? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'si', label: 'Sì', icon: '🎓', color: 'from-green-500 to-green-600', desc: 'Competenze complete' },
                    { value: 'limitate', label: 'Limitate', icon: '📚', color: 'from-orange-500 to-orange-600', desc: 'Alcune competenze' },
                    { value: 'no', label: 'No', icon: '🚫', color: 'from-red-500 to-red-600', desc: 'Competenze da sviluppare' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.internalSkills === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('internalSkills', option.value)}>
                      <input
                        type="radio"
                        name="internalSkills"
                        value={option.value}
                        checked={data.internalSkills === option.value}
                        onChange={(e) => handleInputChange('internalSkills', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.internalSkills === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-bold mb-2">{option.label}</div>
                          <div className={`text-xs ${
                            data.internalSkills === option.value ? 'text-white/80' : 'text-gray-500'
                          }`}>{option.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Training Initiatives Card */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Iniziative di Formazione</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  Avete già avviato iniziative di formazione interna sull'AI? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'si', label: 'Sì', icon: '✅', color: 'from-green-500 to-green-600', desc: 'Formazione attiva' },
                    { value: 'no', label: 'No', icon: '🚫', color: 'from-red-500 to-red-600', desc: 'Nessuna formazione' },
                    { value: 'previste_a_breve', label: 'Previste a breve', icon: '📅', color: 'from-yellow-500 to-yellow-600', desc: 'In pianificazione' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.trainingInitiatives === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('trainingInitiatives', option.value)}>
                      <input
                        type="radio"
                        name="trainingInitiatives"
                        value={option.value}
                        checked={data.trainingInitiatives === option.value}
                        onChange={(e) => handleInputChange('trainingInitiatives', e.target.value)}
                        className="sr-only"
                        aria-describedby={`training-${option.value}-desc`}
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.trainingInitiatives === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-semibold mb-1">{option.label}</div>
                          <div className={`text-xs ${
                            data.trainingInitiatives === option.value ? 'text-white/80' : 'text-gray-500'
                          }`} id={`training-${option.value}-desc`}>
                            {option.desc}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Decision Maker Awareness Card */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Consapevolezza Leadership</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  I decision maker aziendali sono informati sulle opportunità e i rischi dell'AI? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'si', label: 'Sì', icon: '👥', color: 'from-green-500 to-green-600', desc: 'Leadership informata' },
                    { value: 'parzialmente', label: 'Parzialmente', icon: '🤔', color: 'from-yellow-500 to-yellow-600', desc: 'Conoscenza limitata' },
                    { value: 'no', label: 'No', icon: '❌', color: 'from-red-500 to-red-600', desc: 'Necessita formazione' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.decisionMakerAwareness === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('decisionMakerAwareness', option.value)}>
                      <input
                        type="radio"
                        name="decisionMakerAwareness"
                        value={option.value}
                        checked={data.decisionMakerAwareness === option.value}
                        onChange={(e) => handleInputChange('decisionMakerAwareness', e.target.value)}
                        className="sr-only"
                        aria-describedby={`decision-maker-${option.value}-desc`}
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.decisionMakerAwareness === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-semibold mb-1">{option.label}</div>
                          <div className={`text-xs ${
                            data.decisionMakerAwareness === option.value ? 'text-white/80' : 'text-gray-500'
                          }`} id={`decision-maker-${option.value}-desc`}>
                            {option.desc}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Dedicated Team Card */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Team Dedicato AI</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  Esiste un team dedicato all'AI o un responsabile specifico del tema? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'si', label: 'Sì', icon: '👨‍💼', color: 'from-green-500 to-green-600', desc: 'Team già attivo' },
                    { value: 'no', label: 'No', icon: '🚫', color: 'from-red-500 to-red-600', desc: 'Nessun team specifico' },
                    { value: 'previsto_a_breve', label: 'Previsto a breve', icon: '📋', color: 'from-yellow-500 to-yellow-600', desc: 'In fase di creazione' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.dedicatedTeam === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('dedicatedTeam', option.value)}>
                      <input
                        type="radio"
                        name="dedicatedTeam"
                        value={option.value}
                        checked={data.dedicatedTeam === option.value}
                        onChange={(e) => handleInputChange('dedicatedTeam', e.target.value)}
                        className="sr-only"
                        aria-describedby={`dedicated-team-${option.value}-desc`}
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.dedicatedTeam === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-semibold mb-1">{option.label}</div>
                          <div className={`text-xs ${
                            data.dedicatedTeam === option.value ? 'text-white/80' : 'text-gray-500'
                          }`} id={`dedicated-team-${option.value}-desc`}>
                            {option.desc}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Policies Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Policy e Framework AI</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  L'azienda ha definito policy o framework interni per lo sviluppo e l'uso dell'AI? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { value: 'si', label: 'Sì', icon: '📋', color: 'from-green-500 to-green-600', desc: 'Policy definite' },
                    { value: 'no', label: 'No', icon: '🚫', color: 'from-red-500 to-red-600', desc: 'Nessuna policy' },
                    { value: 'parzialmente', label: 'Parzialmente', icon: '⚠️', color: 'from-yellow-500 to-yellow-600', desc: 'In via di definizione' },
                    { value: 'non_lo_so', label: 'Non lo so', icon: '❓', color: 'from-gray-500 to-gray-600', desc: 'Da verificare' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.aiPolicies === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('aiPolicies', option.value)}>
                      <input
                        type="radio"
                        name="aiPolicies"
                        value={option.value}
                        checked={data.aiPolicies === option.value}
                        onChange={(e) => handleInputChange('aiPolicies', e.target.value)}
                        className="sr-only"
                        aria-describedby={`ai-policies-${option.value}-desc`}
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.aiPolicies === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-semibold mb-1">{option.label}</div>
                          <div className={`text-xs ${
                            data.aiPolicies === option.value ? 'text-white/80' : 'text-gray-500'
                          }`} id={`ai-policies-${option.value}-desc`}>
                            {option.desc}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Metrics Card */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Metriche e KPI AI</h4>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className="block text-base font-semibold text-gray-800 mb-6">
                  Esistono metriche o KPI per monitorare l'impatto delle iniziative AI? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'si', label: 'Sì', icon: '📊', color: 'from-green-500 to-green-600', desc: 'Metriche definite' },
                    { value: 'no', label: 'No', icon: '🚫', color: 'from-red-500 to-red-600', desc: 'Nessuna metrica' },
                    { value: 'in_sviluppo', label: 'In sviluppo', icon: '⚙️', color: 'from-yellow-500 to-yellow-600', desc: 'In fase di implementazione' }
                  ].map(option => (
                    <label key={option.value} className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                      data.aiMetrics === option.value ? 'scale-105 shadow-lg' : 'shadow-sm'
                    }`}
                    onClick={() => handleInputChange('aiMetrics', option.value)}>
                      <input
                        type="radio"
                        name="aiMetrics"
                        value={option.value}
                        checked={data.aiMetrics === option.value}
                        onChange={(e) => handleInputChange('aiMetrics', e.target.value)}
                        className="sr-only"
                        aria-describedby={`ai-metrics-${option.value}-desc`}
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.aiMetrics === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.color} text-white` 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-semibold mb-1">{option.label}</div>
                          <div className={`text-xs ${
                            data.aiMetrics === option.value ? 'text-white/80' : 'text-gray-500'
                          }`} id={`ai-metrics-${option.value}-desc`}>
                            {option.desc}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return results ? (
          <div className="space-y-6 md:space-y-8 text-center">
            <div className="bg-gradient-to-br from-accent-50 to-blue-50 rounded-2xl p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
                I tuoi risultati AI Readiness
              </h3>
              
              <div className="mb-6 md:mb-8">
                <div className="text-5xl md:text-6xl font-bold text-accent-500 mb-2">
                  {results.score}%
                </div>
                <div className="text-xl md:text-2xl font-semibold text-navy-700">
                  {results.cluster}
                </div>
              </div>

              {/* AI-Generated Executive Summary */}
              {results.aiSummary && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                  <div className="text-navy-700 leading-relaxed text-sm md:text-base">
                    {results.aiSummary}
                  </div>
                  <p className="text-right text-xs text-gray-500 mt-4">
                    <em>Analisi generata tramite AI da Maverick AI. Maverick AI declina ogni responsabilità sul contenuto generato dall'AI</em>
                  </p>
                </div>
              )}

              {/* Full Detailed Report Request Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-green-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-navy-700 mb-2">
                      Vuoi ricevere il report completo?
                    </h3>
                    <p className="text-navy-600 mb-4 text-sm md:text-base">
                      Se vuoi ricevere un'analisi dettagliata con raccomandazioni mirate, strategie di implementazione e una roadmap personalizzata per la tua azienda, richiedi gratuitamente il nostro report completo.
                    </p>
                    <div className="bg-white/70 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-navy-600">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>Completamente gratuito</strong></span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-navy-600 mt-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>Analisi personalizzata</strong></span>
                      </div>
                    </div>
                    {reportRequestStatus === 'sent' ? (
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <div className="flex-1">
                            <p className="font-medium mb-1">Richiesta inviata con successo!</p>
                            <p className="text-sm leading-relaxed">Riceverai il report dettagliato entro 1 giorno lavorativo all'indirizzo <span className="font-medium">{data.email}</span></p>
                          </div>
                        </div>
                      </div>
                    ) : reportRequestStatus === 'error' ? (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="font-medium">Errore nell'invio della richiesta</p>
                            <p className="text-sm">Riprova più tardi o contattaci direttamente</p>
                            <button 
                              onClick={() => setReportRequestStatus('idle')} 
                              className="text-sm underline mt-1"
                            >
                              Riprova
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={handleDetailedReportRequest}
                        disabled={reportRequestStatus === 'sending'}
                        className="btn-primary w-full md:w-auto inline-block text-center py-4 md:py-3 text-base md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {reportRequestStatus === 'sending' ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Invio in corso...
                          </>
                        ) : (
                          '📄 Richiedi report di dettaglio'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="mt-6">
                <a
                  href="https://calendar.app.google/y77DW2BB9GJnJexs8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full md:w-auto inline-block text-center py-4 md:py-3 text-base md:text-sm"
                >
                  🚀 Richiedi Consulenza Personalizzata
                </a>
              </div>
            </div>
          </div>
        ) : null

      default:
        return null
    }
  }

  return (
    <div id="assessment-container" className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 lg:p-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-4 translate-x-4">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-4 -translate-x-4">
        <div className="w-24 h-24 bg-gradient-to-br from-green-100/50 to-blue-100/50 rounded-full blur-2xl"></div>
      </div>
      
      {/* Progress Header */}
      <div className="mb-8 md:mb-10 relative z-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${steps[currentStep].color} flex items-center justify-center text-2xl shadow-lg`}>
              {steps[currentStep].icon}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {steps[currentStep].name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Passaggio {currentStep + 1} di {steps.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <span className="text-sm font-semibold text-gray-700">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% completato
              </span>
            </div>
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div 
              className={`h-3 rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${steps[currentStep].color} shadow-lg`}
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            >
              <div className="h-full bg-white/20 rounded-full"></div>
            </div>
          </div>
          
          {/* Progress dots */}
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                  index <= currentStep 
                    ? `bg-gradient-to-r ${step.color} text-white shadow-lg` 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.icon
                  )}
                </div>
                <span className={`text-xs font-medium text-center max-w-20 leading-tight hidden md:block ${
                  index <= currentStep ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {renderStep()}
      </div>

      {/* Validation Message */}
      {!isCurrentStepValid() && (
        <div className="mb-4 p-4 md:p-3 bg-yellow-50 border border-yellow-200 rounded-lg" role="alert" aria-live="polite">
          <p className="text-yellow-800 text-sm md:text-sm">
            ⚠️ Completa tutti i campi obbligatori per continuare
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      {currentStep < steps.length - 1 && (
        <div className="flex flex-col-reverse md:flex-row justify-between gap-3 md:gap-0">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`w-full md:w-auto px-6 py-4 md:py-3 text-base md:text-sm rounded-lg font-semibold transition-colors ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-navy-700 hover:bg-gray-300'
            }`}
          >
            ← Indietro
          </button>

          {currentStep === steps.length - 2 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isCurrentStepValid()}
              className={`btn-primary w-full md:w-auto px-8 py-4 md:py-3 text-base md:text-sm ${!isCurrentStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="hidden md:inline">Generazione analisi AI in corso...</span>
                  <span className="md:hidden">Generazione in corso...</span>
                </span>
              ) : (
                'Calcola Risultati →'
              )}
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!isCurrentStepValid()}
              className={`btn-primary w-full md:w-auto px-8 py-4 md:py-3 text-base md:text-sm ${!isCurrentStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Avanti →
            </button>
          )}
        </div>
      )}
    </div>
  )
}