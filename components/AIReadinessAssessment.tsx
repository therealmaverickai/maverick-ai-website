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
  const { trackEvent } = useGoogleAnalytics()

  const steps = [
    'Informazioni Aziendali',
    'Visione e Strategia AI', 
    'Progetti AI',
    'Utilizzo Attuale',
    'Organizzazione e Governance',
    'Risultati'
  ]

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
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
      trackEvent('step_completed', 'ai_assessment', `step_${currentStep + 1}_${steps[currentStep]}`, currentStep + 1)
      
      setCurrentStep(currentStep + 1)
      // Scroll to top of the assessment container
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-navy-900 mb-6">Informazioni Aziendali</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">
                  Nome e Cognome *
                </label>
                <input
                  type="text"
                  required
                  value={data.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  placeholder="Mario Rossi"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">
                  Email Aziendale *
                </label>
                <input
                  type="email"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Inserisci un indirizzo email valido"
                  value={data.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors ${
                    emailError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="mario@azienda.com"
                />
                {emailError && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {emailError}
                  </p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">
                  Ruolo in azienda *
                </label>
                <input
                  type="text"
                  required
                  value={data.role || ''}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  placeholder="CEO, CTO, Manager, ecc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">
                  Società *
                </label>
                <input
                  type="text"
                  required
                  value={data.company || ''}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  placeholder="Nome dell'azienda"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">
                Sito web della società
              </label>
              <input
                type="url"
                value={data.website || ''}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                placeholder="https://www.azienda.com"
              />
            </div>

            {/* Privacy and Consent Checkbox */}
            <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="privacyConsent"
                  checked={data.privacyConsent || false}
                  onChange={(e) => handleInputChange('privacyConsent', e.target.checked)}
                  className="mt-1 w-4 h-4 text-accent-600 border-gray-300 rounded focus:ring-accent-500 focus:ring-2"
                  required
                />
                <label htmlFor="privacyConsent" className="ml-3 text-sm text-navy-700 leading-relaxed">
                  <span className="font-semibold">Consenso al trattamento dei dati *</span>
                  <br />
                  Acconsento al trattamento dei miei dati personali per:
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>Elaborazione e invio dei risultati dell'assessment</li>
                    <li>Contatto per consulenze e servizi relativi all'AI</li>
                    <li>Invio di comunicazioni di marketing sui prodotti e servizi Maverick AI</li>
                  </ul>
                  <span className="text-xs text-gray-600 mt-2 block">
                    I tuoi dati saranno trattati in conformità con la nostra{' '}
                    <a href="/privacy-policy" target="_blank" className="text-accent-600 hover:text-accent-700 underline">
                      Privacy Policy
                    </a>
                    . Puoi revocare il consenso in qualsiasi momento.
                  </span>
                </label>
              </div>
              {!data.privacyConsent && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Il consenso è obbligatorio per continuare con l'assessment
                </p>
              )}
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-navy-900 mb-6">Strategia AI</h3>
            
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-6">
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

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                La vision e la strategia aziendale sull'AI sono formalizzate in un documento? *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'in_parte', label: 'In parte' },
                  { value: 'no', label: 'No' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="visionFormalized"
                      value={option.value}
                      checked={data.visionFormalized === option.value}
                      onChange={(e) => handleInputChange('visionFormalized', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                L'AI è considerata un elemento chiave nella strategia aziendale? *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'parzialmente', label: 'Parzialmente' },
                  { value: 'no', label: 'No' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="aiStrategicImportance"
                      value={option.value}
                      checked={data.aiStrategicImportance === option.value}
                      onChange={(e) => handleInputChange('aiStrategicImportance', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-6">
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

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                L'azienda sta pianificando investimenti in AI nei prossimi 12 mesi? *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'no', label: 'No' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="investmentPlans"
                      value={option.value}
                      checked={data.investmentPlans === option.value}
                      onChange={(e) => handleInputChange('investmentPlans', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-navy-900 mb-6">Progetti AI</h3>
            
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                Quanti progetti AI avete già realizzato o state attualmente sviluppando? *
              </label>
              <div className="space-y-2">
                {[
                  { value: '0', label: '0' },
                  { value: '1-3', label: '1-3' },
                  { value: '3-7', label: '3-7' },
                  { value: '>7', label: '>7' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="currentProjects"
                      value={option.value}
                      checked={data.currentProjects === option.value}
                      onChange={(e) => handleInputChange('currentProjects', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                Per quali ambiti l'azienda sta considerando/utilizzando l'AI? (selezione multipla)
              </label>
              <div className="grid sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {AI_AREAS.map(area => (
                  <label key={area} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={(data.aiAreas || []).includes(area)}
                      onChange={(e) => handleArrayChange('aiAreas', area, e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-navy-700 text-sm">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                L'azienda ha già testato dei progetti pilota o Proof of Concept (PoC) di soluzioni AI? *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'no', label: 'No' },
                  { value: 'previsto_a_breve', label: 'Previsto a breve' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="pilotProjects"
                      value={option.value}
                      checked={data.pilotProjects === option.value}
                      onChange={(e) => handleInputChange('pilotProjects', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-navy-900 mb-6">Utilizzo Attuale</h3>
            
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-6">
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

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-6">
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

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                Quali sono le principali sfide che la vostra organizzazione deve/dovrà affrontare nell'adozione dell'AI? (seleziona le 2 più rilevanti) *
              </label>
              <div className="grid gap-2 max-h-60 overflow-y-auto">
                {CHALLENGES.map(challenge => (
                  <label key={challenge} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={(data.mainChallenges || []).includes(challenge)}
                      onChange={(e) => {
                        const currentChallenges = data.mainChallenges || []
                        if (e.target.checked && currentChallenges.length >= 2) {
                          return // Limit to 2 selections
                        }
                        handleArrayChange('mainChallenges', challenge, e.target.checked)
                      }}
                      disabled={(data.mainChallenges || []).length >= 2 && !(data.mainChallenges || []).includes(challenge)}
                      className="mr-3"
                    />
                    <span className={`text-sm ${
                      (data.mainChallenges || []).length >= 2 && !(data.mainChallenges || []).includes(challenge)
                        ? 'text-gray-400'
                        : 'text-navy-700'
                    }`}>
                      {challenge}
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Selezionate: {(data.mainChallenges || []).length}/2
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                L'azienda ha collaborazioni o partnership con esperti di AI, università o startup? *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'no', label: 'No' },
                  { value: 'previste_a_breve', label: 'Previste a breve' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="partnerships"
                      value={option.value}
                      checked={data.partnerships === option.value}
                      onChange={(e) => handleInputChange('partnerships', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-navy-900 mb-6">Organizzazione e Governance</h3>
            
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                I dati aziendali sono sufficientemente strutturati e accessibili per sviluppare soluzioni AI? (es. presenza di un datalake, ecc.) *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'parzialmente', label: 'Parzialmente' },
                  { value: 'no', label: 'No' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="dataReadiness"
                      value={option.value}
                      checked={data.dataReadiness === option.value}
                      onChange={(e) => handleInputChange('dataReadiness', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                Il team aziendale ha competenze interne (sia tecniche che di business) per sviluppare e gestire soluzioni AI? *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'limitate', label: 'Limitate' },
                  { value: 'no', label: 'No' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="internalSkills"
                      value={option.value}
                      checked={data.internalSkills === option.value}
                      onChange={(e) => handleInputChange('internalSkills', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                Avete già avviato iniziative di formazione interna sull'AI? *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'no', label: 'No' },
                  { value: 'previste_a_breve', label: 'Previste a breve' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="trainingInitiatives"
                      value={option.value}
                      checked={data.trainingInitiatives === option.value}
                      onChange={(e) => handleInputChange('trainingInitiatives', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                I decision maker aziendali sono informati sulle opportunità e i rischi dell'AI? *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'parzialmente', label: 'Parzialmente' },
                  { value: 'no', label: 'No' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="decisionMakerAwareness"
                      value={option.value}
                      checked={data.decisionMakerAwareness === option.value}
                      onChange={(e) => handleInputChange('decisionMakerAwareness', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                Esiste un team dedicato all'AI o un responsabile specifico del tema? *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'no', label: 'No' },
                  { value: 'previsto_a_breve', label: 'Previsto a breve' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="dedicatedTeam"
                      value={option.value}
                      checked={data.dedicatedTeam === option.value}
                      onChange={(e) => handleInputChange('dedicatedTeam', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                L'azienda ha definito policy o framework interni per lo sviluppo e l'uso dell'AI? *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'no', label: 'No' },
                  { value: 'parzialmente', label: 'Parzialmente' },
                  { value: 'non_lo_so', label: 'Non lo so' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="aiPolicies"
                      value={option.value}
                      checked={data.aiPolicies === option.value}
                      onChange={(e) => handleInputChange('aiPolicies', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-4">
                Esistono metriche o KPI per monitorare l'impatto delle iniziative AI? *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'si', label: 'Sì' },
                  { value: 'no', label: 'No' },
                  { value: 'in_sviluppo', label: 'In sviluppo' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="aiMetrics"
                      value={option.value}
                      checked={data.aiMetrics === option.value}
                      onChange={(e) => handleInputChange('aiMetrics', e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-navy-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return results ? (
          <div className="space-y-8 text-center">
            <div className="bg-gradient-to-br from-accent-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-navy-900 mb-4">
                I tuoi risultati AI Readiness
              </h3>
              
              <div className="mb-8">
                <div className="text-6xl font-bold text-accent-500 mb-2">
                  {results.score}%
                </div>
                <div className="text-2xl font-semibold text-navy-700">
                  {results.cluster}
                </div>
              </div>

              {/* AI-Generated Executive Summary */}
              {results.aiSummary && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl p-6 mb-6">
                  <div className="text-navy-700 leading-relaxed">
                    {results.aiSummary}
                  </div>
                  <p className="text-right text-xs text-gray-500 mt-4">
                    <em>Analisi generata tramite AI da Maverick AI. Maverick AI declina ogni responsabilità sul contenuto generato dall'AI</em>
                  </p>
                </div>
              )}


              <div className="space-y-4">
                <a
                  href="https://calendar.app.google/y77DW2BB9GJnJexs8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full sm:w-auto inline-block text-center"
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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-navy-900">AI Readiness Assessment</h2>
          <div className="flex items-center space-x-2">
            <div className="bg-accent-50 px-3 py-1.5 rounded-full">
              <span className="text-sm font-semibold text-accent-700">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              ({Math.round(((currentStep + 1) / steps.length) * 100)}%)
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <span 
              key={index}
              className={`text-xs ${index <= currentStep ? 'text-accent-600 font-semibold' : 'text-gray-400'}`}
            >
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {renderStep()}
      </div>

      {/* Validation Message */}
      {!isCurrentStepValid() && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            ⚠️ Completa tutti i campi obbligatori per continuare
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      {currentStep < steps.length - 1 && (
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
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
              className={`btn-primary px-8 ${!isCurrentStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generazione analisi AI in corso...
                </span>
              ) : (
                'Calcola Risultati →'
              )}
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!isCurrentStepValid()}
              className={`btn-primary px-8 ${!isCurrentStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Avanti →
            </button>
          )}
        </div>
      )}
    </div>
  )
}