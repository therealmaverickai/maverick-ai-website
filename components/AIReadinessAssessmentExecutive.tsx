'use client'

import { useState } from 'react'
import { calculateEnhancedScore, type AssessmentData } from '@/lib/assessmentScoring'
import { useGoogleAnalytics } from './GoogleAnalytics'
import ExecutiveProgress from './ExecutiveProgress'
import { CompanyInfoStep, StrategyStep, ImplementationStep, OrganizationStep, ResultsStep } from './AssessmentSteps'


export default function AIReadinessAssessmentExecutive({ onAssessmentStart }: { onAssessmentStart?: (started: boolean) => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<Partial<AssessmentData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [emailError, setEmailError] = useState('')
  const [assessmentStarted, setAssessmentStarted] = useState(false)
  const [showValidationErrors, setShowValidationErrors] = useState(false)
  const { trackEvent } = useGoogleAnalytics()

  const assessmentSteps = [
    {
      name: 'Informazioni Aziendali',
      description: 'Contatti e panoramica aziendale',
      icon: '👤',
      completed: false,
      current: currentStep === 0
    },
    {
      name: 'Vision Strategica',
      description: 'Strategia e pianificazione AI',
      icon: '🎯',
      completed: false,
      current: currentStep === 1
    },
    {
      name: 'Implementazione',
      description: 'Progetti e tecnologie attuali',
      icon: '🚀',
      completed: false,
      current: currentStep === 2
    },
    {
      name: 'Organizzazione',
      description: 'Team, competenze e governance',
      icon: '🏢',
      completed: false,
      current: currentStep === 3
    }
  ]

  const totalAssessmentSteps = assessmentSteps.length

  // Update step completion status
  const updatedSteps = assessmentSteps.map((step, index) => ({
    ...step,
    completed: index < currentStep,
    current: index === currentStep
  }))

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const handleInputChange = (field: keyof AssessmentData, value: any) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear validation errors when user makes changes
    if (showValidationErrors && value) {
      setShowValidationErrors(false)
    }

    // Start assessment tracking when first field is filled
    if (!assessmentStarted && value && field === 'name') {
      setAssessmentStarted(true)
      onAssessmentStart?.(true)
    }

    if (field === 'email') {
      if (value && !validateEmail(value)) {
        setEmailError('Inserisci un indirizzo email aziendale valido')
      } else {
        setEmailError('')
      }
    }
  }

  const handleArrayChange = (field: keyof AssessmentData, values: string[]) => {
    setData(prev => ({
      ...prev,
      [field]: values
    }))
  }

  const nextStep = () => {
    if (!canProceed()) {
      setShowValidationErrors(true)
      return
    }

    setShowValidationErrors(false)

    if (currentStep < totalAssessmentSteps - 1) {
      trackEvent('assessment_step_completed', 'executive_assessment', `step_${currentStep + 1}`, currentStep + 1)
      setCurrentStep(currentStep + 1)

      // Smooth scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    } else if (currentStep === totalAssessmentSteps - 1) {
      // Calculate results on last assessment step
      calculateResults()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setShowValidationErrors(false)
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateResults = async () => {
    setIsSubmitting(true)

    try {
      // Use the enhanced scoring system
      const result = calculateEnhancedScore(data)

      // Save to database
      const response = await fetch('/api/ai-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          assessment: {
            score: result.overallScore,
            cluster: result.cluster,
            details: {
              totalScore: result.overallScore,
              maxPossibleScore: 100,
              normalizedScore: result.overallScore
            }
          }
        }),
      })

      if (response.ok) {
        setResults(result)
        setCurrentStep(currentStep + 1) // Move to results step

        // Scroll to top when results are shown
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 100)

        trackEvent('assessment_completed', 'executive_assessment', result.cluster, result.overallScore)
      } else {
        console.error('Failed to save assessment')
      }
    } catch (error) {
      console.error('Error calculating results:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Company Info
        return data.name && data.email && data.company && data.role && data.privacyConsent && !emailError
      case 1: // Strategy (Enhanced with investment planning)
        return data.aiVisionClarity && data.visionFormalized && data.aiStrategicImportance && data.competitiveAdvantage && data.aiBudgetAllocation && data.aiInvestmentTimeline && data.aiInvestmentPriority
      case 2: // Implementation
        return data.currentProjects && data.pilotProjects && data.dataReadiness
      case 3: // Organization (Enhanced with culture, ethics & privacy)
        return data.internalSkills && data.decisionMakerAwareness && data.aiChangeReadiness && data.employeeAIAdoption && data.leadershipAICommunication && data.aiEthicsFramework && data.dataPrivacyCompliance
      default:
        return false
    }
  }

  return (
    <div className="max-w-4xl mx-auto" id="assessment-container">
      {/* Executive Progress */}
      {/* Show progress only during assessment steps, not on results */}
      {currentStep < totalAssessmentSteps && (
        <ExecutiveProgress
          steps={updatedSteps}
          currentStep={currentStep}
          totalSteps={totalAssessmentSteps}
        />
      )}

      {/* Assessment Content */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
        {currentStep === 0 && <CompanyInfoStep data={data} onChange={handleInputChange} emailError={emailError} showValidationErrors={showValidationErrors} />}
        {currentStep === 1 && <StrategyStep data={data} onChange={handleInputChange} showValidationErrors={showValidationErrors} />}
        {currentStep === 2 && <ImplementationStep data={data} onChange={handleInputChange} onArrayChange={handleArrayChange} showValidationErrors={showValidationErrors} />}
        {currentStep === 3 && <OrganizationStep data={data} onChange={handleInputChange} onArrayChange={handleArrayChange} showValidationErrors={showValidationErrors} />}
        {currentStep === totalAssessmentSteps && <ResultsStep results={results} data={data} />}

        {/* Navigation */}
        {currentStep < totalAssessmentSteps && (
          <div className="px-8 py-6 border-t border-slate-100 flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-3 text-slate-600 bg-slate-100 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
            >
              Indietro
            </button>

            <button
              onClick={nextStep}
              disabled={!canProceed() || isSubmitting}
              className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Elaborazione...
                </>
              ) : currentStep === totalAssessmentSteps - 1 ? (
                'Calcola Assessment'
              ) : (
                'Continua'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}