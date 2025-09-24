'use client'

import React, { useState, useEffect } from 'react'
import { type AssessmentData } from '@/lib/assessmentScoring'
import ExecutiveRating from './ExecutiveRating'
import ExecutiveSelect from './ExecutiveSelect'
import ExecutiveMultiSelect from './ExecutiveMultiSelect'
import ExecutiveResultsChart from './ExecutiveResultsChart'
import AssessmentAIChat from './AssessmentAIChat'
import StrategicPositioningQuadrant from './StrategicPositioningQuadrant'

const AI_AREAS = [
  'Automazione processi',
  'Customer service',
  'Analisi dati',
  'Generazione contenuti',
  'Ricerca e sviluppo',
  'Marketing e vendite'
]

const CHALLENGES = [
  'Resistenza al cambiamento',
  'Mancanza di una visione e di una strategia',
  'Mancanza di competenze',
  'Assenza di use case rilevanti per il nostro settore',
  'Necessità di investimenti ingenti',
  'Questioni di sicurezza e privacy'
]

interface StepProps {
  data: Partial<AssessmentData>
  onChange: (field: keyof AssessmentData, value: any) => void
  onArrayChange?: (field: keyof AssessmentData, values: string[]) => void
  emailError?: string
  showValidationErrors?: boolean
}

export function CompanyInfoStep({ data, onChange, emailError, showValidationErrors }: StepProps) {
  const handlePrivacyChange = (accepted: boolean) => {
    onChange('privacyConsent', accepted)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Informazioni Aziendali</h2>
        <p className="text-slate-600">
          Iniziamo con alcune informazioni di base per personalizzare la valutazione
        </p>
      </div>

      <div className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nome e Cognome *
            </label>
            <input
              type="text"
              value={data.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
              placeholder="Mario Rossi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Aziendale *
            </label>
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors ${
                emailError ? 'border-red-500' : 'border-slate-200'
              }`}
              placeholder="mario.rossi@azienda.com"
            />
            {emailError && (
              <p className="text-red-600 text-sm mt-1">{emailError}</p>
            )}
          </div>
        </div>

        {/* Role and Company Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Ruolo in Azienda *
            </label>
            <select
              value={data.role || ''}
              onChange={(e) => onChange('role', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
            >
              <option value="">Seleziona il tuo ruolo</option>
              <option value="CEO">CEO / Amministratore Delegato</option>
              <option value="CTO">CTO / Direttore Tecnico</option>
              <option value="CDO">CDO / Chief Digital Officer</option>
              <option value="IT Manager">IT Manager / Responsabile IT</option>
              <option value="Operations Manager">Operations Manager</option>
              <option value="Innovation Manager">Innovation Manager</option>
              <option value="Entrepreneur">Imprenditore</option>
              <option value="Consultant">Consulente</option>
              <option value="Other">Altro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nome Azienda *
            </label>
            <input
              type="text"
              value={data.company || ''}
              onChange={(e) => onChange('company', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
              placeholder="Nome della tua azienda"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Sito Web Aziendale
          </label>
          <input
            type="url"
            value={data.website || ''}
            onChange={(e) => onChange('website', e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
            placeholder="https://www.azienda.com"
          />
        </div>

        {/* Privacy Consent */}
        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-start">
            <button
              type="button"
              onClick={() => handlePrivacyChange(!data.privacyConsent)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 mt-0.5 transition-colors ${
                data.privacyConsent
                  ? 'border-slate-900 bg-slate-900'
                  : showValidationErrors && !data.privacyConsent
                  ? 'border-red-500 bg-white hover:border-red-600'
                  : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
            >
              {data.privacyConsent && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div className="text-sm">
              <p className={`${showValidationErrors && !data.privacyConsent ? 'text-red-700' : 'text-slate-700'}`}>
                Acconsento al trattamento dei miei dati personali per ricevere l'assessment AI e comunicazioni relative ai servizi Maverick AI. *
              </p>
              <p className="text-slate-500 mt-1">
                Leggi la nostra{' '}
                <a href="/privacy" className="text-slate-700 underline hover:text-slate-900">
                  Privacy Policy
                </a>
              </p>
              {showValidationErrors && !data.privacyConsent && (
                <p className="text-red-600 mt-2 text-xs">
                  È necessario accettare il consenso al trattamento dei dati per continuare
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StrategyStep({ data, onChange, showValidationErrors }: StepProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Vision e Strategia AI</h2>
        <p className="text-slate-600">
          Valutiamo la chiarezza della vostra strategia AI e gli investimenti pianificati
        </p>
      </div>

      <div className="space-y-10">
        {/* AI Vision Clarity */}
        <ExecutiveRating
          value={data.aiVisionClarity}
          onChange={(value) => onChange('aiVisionClarity', value)}
          min={1}
          max={5}
          leftLabel="Vision poco chiara"
          rightLabel="Vision molto chiara"
          question="Quanto è chiara la vision AI della vostra organizzazione?"
          showValidationError={showValidationErrors}
        />

        {/* Vision Formalized */}
        <ExecutiveSelect
          value={data.visionFormalized || ''}
          onChange={(value) => onChange('visionFormalized', value)}
          question="La strategia AI è stata formalizzata in documenti ufficiali?"
          options={[
            { value: 'si', label: 'Sì, completamente documentata' },
            { value: 'in_parte', label: 'In parte, documenti preliminari' },
            { value: 'no', label: 'No, solo discussioni informali' }
          ]}
        />

        {/* Strategic Importance */}
        <ExecutiveSelect
          value={data.aiStrategicImportance || ''}
          onChange={(value) => onChange('aiStrategicImportance', value)}
          question="L'AI è considerata strategicamente importante per il futuro dell'azienda?"
          options={[
            { value: 'si', label: 'Sì, priorità assoluta' },
            { value: 'parzialmente', label: 'Parzialmente, tra le priorità' },
            { value: 'no', label: 'No, non è una priorità' }
          ]}
        />

        {/* Competitive Advantage */}
        <ExecutiveRating
          value={data.competitiveAdvantage}
          onChange={(value) => onChange('competitiveAdvantage', value)}
          min={1}
          max={5}
          leftLabel="Poco rilevante"
          rightLabel="Fattore chiave"
          question="Quanto l'AI sarà un fattore di vantaggio competitivo nel vostro settore?"
          showValidationError={showValidationErrors}
        />

        {/* Investment Plans */}
        <ExecutiveSelect
          value={data.investmentPlans || ''}
          onChange={(value) => onChange('investmentPlans', value)}
          question="Ci sono piani di investimento dedicati all'AI?"
          options={[
            { value: 'si', label: 'Sì, budget dedicato approvato' },
            { value: 'no', label: 'No, nessun budget specifico' }
          ]}
        />

        {/* AI Budget Allocation */}
        <ExecutiveSelect
          value={data.aiBudgetAllocation || ''}
          onChange={(value) => onChange('aiBudgetAllocation', value)}
          question="Che percentuale del budget IT/innovazione è dedicata all'AI?"
          options={[
            { value: 'oltre_30', label: 'Oltre il 30%', description: 'Investimento strategico significativo' },
            { value: '15_30', label: '15-30%', description: 'Investimento sostanziale' },
            { value: '5_15', label: '5-15%', description: 'Investimento moderato' },
            { value: 'sotto_5', label: 'Sotto il 5%', description: 'Investimento limitato' },
            { value: 'non_definito', label: 'Non ancora definito', description: 'Budget in fase di pianificazione' }
          ]}
        />

        {/* AI Investment Timeline */}
        <ExecutiveSelect
          value={data.aiInvestmentTimeline || ''}
          onChange={(value) => onChange('aiInvestmentTimeline', value)}
          question="Su quale orizzonte temporale pianificate i maggiori investimenti AI?"
          options={[
            { value: 'continuo', label: 'Investimento continuo', description: 'Piano pluriennale strutturato' },
            { value: '6_mesi', label: 'Prossimi 6 mesi', description: 'Investimenti immediati' },
            { value: '12_mesi', label: 'Entro 12 mesi', description: 'Piano annuale' },
            { value: '18_mesi', label: 'Entro 18 mesi', description: 'Pianificazione a medio termine' },
            { value: 'oltre_24_mesi', label: 'Oltre 24 mesi', description: 'Visione a lungo termine' }
          ]}
        />

        {/* AI Investment Priority */}
        <ExecutiveRating
          value={data.aiInvestmentPriority}
          onChange={(value) => onChange('aiInvestmentPriority', value)}
          min={1}
          max={5}
          leftLabel="Bassa priorità"
          rightLabel="Massima priorità"
          question="Che priorità hanno gli investimenti AI rispetto ad altre iniziative tecnologiche?"
          showValidationError={showValidationErrors}
        />
      </div>
    </div>
  )
}

export function ImplementationStep({ data, onChange, onArrayChange, showValidationErrors }: StepProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementazione e Progetti</h2>
        <p className="text-slate-600">
          Analizziamo lo stato attuale dei vostri progetti AI e l'infrastruttura tecnologica
        </p>
      </div>

      <div className="space-y-10">
        {/* Current Projects */}
        <ExecutiveSelect
          value={data.currentProjects || ''}
          onChange={(value) => onChange('currentProjects', value)}
          question="Quanti progetti AI sono attualmente attivi nella vostra organizzazione?"
          options={[
            { value: '0', label: 'Nessun progetto attivo', description: 'Fase esplorativa' },
            { value: '1-3', label: '1-3 progetti', description: 'Prime implementazioni' },
            { value: '3-7', label: '3-7 progetti', description: 'Adozione strutturata' },
            { value: '>7', label: 'Più di 7 progetti', description: 'Organizzazione AI-native' }
          ]}
        />

        {/* AI Areas */}
        {onArrayChange && (
          <ExecutiveMultiSelect
            values={data.aiAreas || []}
            onChange={(values) => onArrayChange('aiAreas', values)}
            options={AI_AREAS}
            question="In quali aree state applicando o considerando l'AI? (Massimo 3)"
            maxSelections={3}
          />
        )}

        {/* Pilot Projects */}
        <ExecutiveSelect
          value={data.pilotProjects || ''}
          onChange={(value) => onChange('pilotProjects', value)}
          question="Avete progetti pilota AI in corso o pianificati?"
          options={[
            { value: 'si', label: 'Sì, progetti pilota attivi' },
            { value: 'previsto_a_breve', label: 'Previsti nei prossimi 6 mesi' },
            { value: 'no', label: 'No, nessun progetto pilota' }
          ]}
        />

        {/* Data Readiness */}
        <ExecutiveSelect
          value={data.dataReadiness || ''}
          onChange={(value) => onChange('dataReadiness', value)}
          question="I vostri dati sono pronti per applicazioni AI?"
          options={[
            { value: 'si', label: 'Sì, dati strutturati e accessibili' },
            { value: 'parzialmente', label: 'Parzialmente, necessaria organizzazione' },
            { value: 'no', label: 'No, dati non strutturati' }
          ]}
        />

        {/* Partnerships */}
        <ExecutiveSelect
          value={data.partnerships || ''}
          onChange={(value) => onChange('partnerships', value)}
          question="Avete partnership tecnologiche per l'AI?"
          options={[
            { value: 'si', label: 'Sì, partnership attive' },
            { value: 'previste_a_breve', label: 'In fase di definizione' },
            { value: 'no', label: 'No, sviluppo interno' }
          ]}
        />
      </div>
    </div>
  )
}

export function OrganizationStep({ data, onChange, onArrayChange, showValidationErrors }: StepProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Organizzazione e Competenze</h2>
        <p className="text-slate-600">
          Valutiamo le competenze interne e la governance AI della vostra organizzazione
        </p>
      </div>

      <div className="space-y-10">
        {/* Employee and Management Usage */}
        <div className="grid md:grid-cols-2 gap-8">
          <ExecutiveRating
            value={data.employeeUsage}
            onChange={(value) => onChange('employeeUsage', value)}
            min={1}
            max={5}
            leftLabel="Nessun utilizzo"
            rightLabel="Utilizzo estensivo"
            question="Livello di utilizzo AI da parte dei dipendenti"
            showValidationError={showValidationErrors}
          />

          <ExecutiveRating
            value={data.managementUsage}
            onChange={(value) => onChange('managementUsage', value)}
            min={1}
            max={5}
            leftLabel="Nessun utilizzo"
            rightLabel="Utilizzo strategico"
            question="Livello di utilizzo AI da parte del management"
            showValidationError={showValidationErrors}
          />
        </div>

        {/* Internal Skills */}
        <ExecutiveSelect
          value={data.internalSkills || ''}
          onChange={(value) => onChange('internalSkills', value)}
          question="Che livello di competenze AI avete internamente?"
          options={[
            { value: 'si', label: 'Competenze avanzate', description: 'Team specializzato' },
            { value: 'limitate', label: 'Competenze limitate', description: 'Conoscenza base' },
            { value: 'no', label: 'Nessuna competenza', description: 'Necessaria formazione' }
          ]}
        />

        {/* Training Initiatives */}
        <ExecutiveSelect
          value={data.trainingInitiatives || ''}
          onChange={(value) => onChange('trainingInitiatives', value)}
          question="Ci sono iniziative di formazione AI in azienda?"
          options={[
            { value: 'si', label: 'Sì, programmi strutturati' },
            { value: 'previste_a_breve', label: 'Previste nei prossimi mesi' },
            { value: 'no', label: 'No, nessuna formazione' }
          ]}
        />

        {/* Decision Maker Awareness */}
        <ExecutiveSelect
          value={data.decisionMakerAwareness || ''}
          onChange={(value) => onChange('decisionMakerAwareness', value)}
          question="I decision maker sono consapevoli delle potenzialità AI?"
          options={[
            { value: 'si', label: 'Sì, alta consapevolezza' },
            { value: 'parzialmente', label: 'Parzialmente, in apprendimento' },
            { value: 'no', label: 'No, scarsa consapevolezza' }
          ]}
        />

        {/* Main Challenges */}
        {onArrayChange && (
          <ExecutiveMultiSelect
            values={data.mainChallenges || []}
            onChange={(values) => onArrayChange('mainChallenges', values)}
            options={CHALLENGES}
            question="Quali sono le principali sfide per l'adozione AI? (Massimo 2)"
            maxSelections={2}
          />
        )}

        {/* Dedicated Team */}
        <ExecutiveSelect
          value={data.dedicatedTeam || ''}
          onChange={(value) => onChange('dedicatedTeam', value)}
          question="Esiste un team dedicato all'AI?"
          options={[
            { value: 'si', label: 'Sì, team dedicato attivo' },
            { value: 'previsto_a_breve', label: 'In fase di costituzione' },
            { value: 'no', label: 'No, nessun team dedicato' }
          ]}
        />

        {/* AI Policies and Metrics */}
        <div className="grid md:grid-cols-2 gap-8">
          <ExecutiveSelect
            value={data.aiPolicies || ''}
            onChange={(value) => onChange('aiPolicies', value)}
            question="Esistono policy interne per l'AI?"
            options={[
              { value: 'si', label: 'Sì, policy definite' },
              { value: 'parzialmente', label: 'In fase di definizione' },
              { value: 'no', label: 'No, nessuna policy' },
              { value: 'non_lo_so', label: 'Non lo so' }
            ]}
          />

          <ExecutiveSelect
            value={data.aiMetrics || ''}
            onChange={(value) => onChange('aiMetrics', value)}
            question="Misurate i risultati AI con KPI specifici?"
            options={[
              { value: 'si', label: 'Sì, metriche definite' },
              { value: 'in_sviluppo', label: 'In fase di sviluppo' },
              { value: 'no', label: 'No, nessuna metrica' }
            ]}
          />
        </div>

        {/* AI Change Readiness */}
        <ExecutiveSelect
          value={data.aiChangeReadiness || ''}
          onChange={(value) => onChange('aiChangeReadiness', value)}
          question="Come descrivereste l'atteggiamento dell'organizzazione verso il cambiamento AI?"
          options={[
            { value: 'proattivo', label: 'Proattivo', description: 'Anticipa e guida il cambiamento' },
            { value: 'adattivo', label: 'Adattivo', description: 'Si adatta rapidamente alle novità' },
            { value: 'cauto', label: 'Cauto', description: 'Approccio prudente al cambiamento' },
            { value: 'resistente', label: 'Resistente', description: 'Difficoltà nel cambiare' }
          ]}
        />

        {/* Employee AI Adoption */}
        <ExecutiveRating
          value={data.employeeAIAdoption}
          onChange={(value) => onChange('employeeAIAdoption', value)}
          min={1}
          max={5}
          leftLabel="Molto resistenti"
          rightLabel="Molto entusiasti"
          question="Come rispondono tipicamente i dipendenti all'introduzione di nuovi strumenti AI?"
          showValidationError={showValidationErrors}
        />

        {/* Leadership AI Communication */}
        <ExecutiveSelect
          value={data.leadershipAICommunication || ''}
          onChange={(value) => onChange('leadershipAICommunication', value)}
          question="Con che frequenza il leadership team comunica l'importanza dell'AI?"
          options={[
            { value: 'strategicamente', label: 'Strategicamente', description: 'Comunicazione integrata nella vision' },
            { value: 'regolarmente', label: 'Regolarmente', description: 'Messaggi frequenti e consistenti' },
            { value: 'occasionalmente', label: 'Occasionalmente', description: 'Comunicazione sporadica' },
            { value: 'mai', label: 'Mai o raramente', description: 'Scarsa comunicazione' }
          ]}
        />

        {/* AI Ethics Framework */}
        <ExecutiveSelect
          value={data.aiEthicsFramework || ''}
          onChange={(value) => onChange('aiEthicsFramework', value)}
          question="Avete linee guida etiche formali per l'utilizzo dell'AI?"
          options={[
            { value: 'si', label: 'Sì, framework completo', description: 'Principi etici definiti e implementati' },
            { value: 'parzialmente', label: 'Parzialmente', description: 'Alcune linee guida di base' },
            { value: 'in_sviluppo', label: 'In sviluppo', description: 'Framework in fase di creazione' },
            { value: 'no', label: 'No', description: 'Nessuna linea guida etica' }
          ]}
        />

        {/* Data Privacy Compliance */}
        <ExecutiveSelect
          value={data.dataPrivacyCompliance || ''}
          onChange={(value) => onChange('dataPrivacyCompliance', value)}
          question="Come garantite la conformità GDPR/privacy nei progetti AI?"
          options={[
            { value: 'completo', label: 'Conformità completa', description: 'Processi strutturati e verificati' },
            { value: 'parziale', label: 'Conformità parziale', description: 'Alcuni controlli implementati' },
            { value: 'minimo', label: 'Conformità minima', description: 'Solo requisiti di base' },
            { value: 'non_implementato', label: 'Non implementato', description: 'Conformità da sviluppare' }
          ]}
        />

      </div>
    </div>
  )
}

export function ResultsStep({ results, data }: { results: any; data: Partial<AssessmentData> }) {
  const [requestingConsultation, setRequestingConsultation] = useState(false)
  const [aiRoadmap, setAiRoadmap] = useState<any>(null)
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false)
  const [roadmapError, setRoadmapError] = useState<string | null>(null)

  // Generate AI roadmap when component loads
  const generateAIRoadmap = async () => {
    if (!results || !data || isGeneratingRoadmap) return

    setIsGeneratingRoadmap(true)
    setRoadmapError(null)

    try {
      const response = await fetch('/api/ai-roadmap/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentData: data,
          assessmentResults: results
        })
      })

      const result = await response.json()

      if (result.success) {
        setAiRoadmap(result.roadmap)
        console.log('AI roadmap generated successfully')
      } else {
        throw new Error(result.error || 'Failed to generate roadmap')
      }
    } catch (error) {
      console.error('Error generating AI roadmap:', error)
      setRoadmapError('Impossibile generare la roadmap AI. Verrà mostrata una versione standard.')
      // Keep the static recommendations as fallback
    } finally {
      setIsGeneratingRoadmap(false)
    }
  }

  // Generate roadmap on component mount
  useEffect(() => {
    if (results && data && !aiRoadmap && !isGeneratingRoadmap) {
      generateAIRoadmap()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, data])

  const handleConsultationRequest = async () => {
    setRequestingConsultation(true)

    try {
      // Could integrate with calendar booking API here
      window.open('https://calendar.app.google/qRHonaahhRhqZqSu8', '_blank')
    } catch (error) {
      console.error('Error opening consultation booking:', error)
    } finally {
      setRequestingConsultation(false)
    }
  }

  if (!results) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
        <p className="text-slate-600">Elaborazione dei risultati in corso...</p>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-600'
    if (score >= 50) return 'text-blue-600'
    if (score >= 25) return 'text-amber-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return 'bg-emerald-50 border-emerald-200'
    if (score >= 50) return 'bg-blue-50 border-blue-200'
    if (score >= 25) return 'bg-amber-50 border-amber-200'
    return 'bg-red-50 border-red-200'
  }

  const getBenchmarkColor = (comparison: string) => {
    switch (comparison) {
      case 'Top Performer': return 'text-emerald-600 bg-emerald-50'
      case 'Above Average': return 'text-blue-600 bg-blue-50'
      case 'Average': return 'text-amber-600 bg-amber-50'
      default: return 'text-red-600 bg-red-50'
    }
  }

  return (
    <div className="p-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Risultati assessment AI</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Ecco la valutazione completa della maturità AI della vostra organizzazione
        </p>
      </div>

      {/* Overall Score Circle - Moved above cluster badge */}
      <div className="text-center mb-8">
        <div className="inline-flex flex-col items-center">
          <div className="relative w-32 h-32 mb-6">
            {/* Background circle */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Progress circle */}
              <path
                className={getScoreColor(results.overallScore).replace('text-', 'text-')}
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={`${results.overallScore}, 100`}
                style={{
                  transition: 'stroke-dasharray 2s ease-in-out',
                  transitionDelay: '0.5s'
                }}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            {/* Score text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(results.overallScore)}`}>
                  {results.overallScore}%
                </div>
                <div className="text-xs text-slate-500 font-medium">OVERALL</div>
              </div>
            </div>
          </div>

          {/* Industry Benchmark */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getBenchmarkColor(results.industryBenchmark.comparison)}`}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {results.industryBenchmark.percentile}° percentile • {results.industryBenchmark.comparison}
          </div>
        </div>
      </div>

      {/* Cluster Badge */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-6 py-3 rounded-xl border-2 ${getScoreBgColor(results.overallScore)}`}>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {results.cluster}
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat - Full Dark Box */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 mb-12 relative overflow-hidden shadow-xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl"></div>

        <div className="relative z-10">
          {results ? (
            <AssessmentAIChat
              assessmentData={data || {}}
              assessmentResults={results}
            />
          ) : (
            <div className="text-center text-white p-8">
              <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Caricamento consulente AI...</p>
            </div>
          )}
        </div>
      </div>

      {/* Strategic Positioning Quadrant */}
      <div className="mb-12">
        <StrategicPositioningQuadrant
          strategyScore={Math.round((results.dimensions.strategy.percentage + results.dimensions.governance.percentage) / 2)}
          executionScore={Math.round((results.dimensions.technology.percentage + results.dimensions.people.percentage) / 2)}
          companyName={data.company || 'La Vostra Azienda'}
          overallScore={results.overallScore}
        />
      </div>


      {/* Recommendations */}
      <div className="mb-12 bg-slate-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">🎯 Roadmap strategica</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Piano d'azione personalizzato basato sui vostri risultati per accelerare l'adozione AI
          </p>
        </div>

        {/* AI-Generated Roadmap or Loading State */}
        {isGeneratingRoadmap ? (
          <div className="text-center py-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="ml-4">
                <div className="flex items-center text-blue-600 font-semibold mb-1">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generazione roadmap AI in corso...
                </div>
                <p className="text-slate-600 text-sm">Il nostro AI sta analizzando i vostri dati per creare una strategia personalizzata</p>
              </div>
            </div>
          </div>
        ) : roadmapError ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <div className="flex items-center text-amber-800 mb-2">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Attenzione
            </div>
            <p className="text-amber-700 text-sm">{roadmapError}</p>
          </div>
        ) : null}

        <div className="space-y-6">
          {/* AI-Generated Immediate Actions */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              Azioni immediate
              {aiRoadmap && (
                <span className="ml-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI generated
                </span>
              )}
            </h4>
            <ul className="space-y-3">
              {(aiRoadmap?.immediate || results.recommendations.immediate).map((rec: string, index: number) => (
                <li key={index} className="text-slate-800 flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="font-medium">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI-Generated Short Term Goals */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              Obiettivi a breve termine (3-6 mesi)
              {aiRoadmap && (
                <span className="ml-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI generated
                </span>
              )}
            </h4>
            <ul className="space-y-3">
              {(aiRoadmap?.shortTerm || results.recommendations.shortTerm).map((rec: string, index: number) => (
                <li key={index} className="text-slate-800 flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="font-medium">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI-Generated Long Term Vision */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              Visione a lungo termine (6-18 mesi)
              {aiRoadmap && (
                <span className="ml-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI generated
                </span>
              )}
            </h4>
            <ul className="space-y-3">
              {(aiRoadmap?.longTerm || results.recommendations.longTerm).map((rec: string, index: number) => (
                <li key={index} className="text-slate-800 flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="font-medium">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


      {/* Strategic Call to Action */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-10 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl"></div>

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Azione immediata raccomandata
          </div>

          <h3 className="text-3xl font-bold mb-4">🚀 Trasforma i risultati in azione</h3>
          <p className="text-slate-200 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
            Non lasciare che questa valutazione rimanga solo un documento.
            <span className="font-semibold text-white"> Trasformala in una roadmap concreta</span> con il supporto dei nostri esperti AI.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                📋
              </div>
              <div className="font-semibold text-white mb-1">Strategia personalizzata</div>
              <div className="text-slate-300 text-sm">Roadmap specifica per il tuo settore</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                ⚡
              </div>
              <div className="font-semibold text-white mb-1">Quick wins</div>
              <div className="text-slate-300 text-sm">Azioni immediate ad alto impatto</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                📈
              </div>
              <div className="font-semibold text-white mb-1">ROI accelerato</div>
              <div className="text-slate-300 text-sm">Massimizza il ritorno dell'investimento AI</div>
            </div>
          </div>

          <button
            onClick={handleConsultationRequest}
            disabled={requestingConsultation}
            className="bg-white text-slate-900 px-10 py-5 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
          >
            {requestingConsultation ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Apertura calendario...
              </>
            ) : (
              <>
                📅 Prenota consulenza strategica gratuita
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </>
            )}
          </button>

        </div>
      </div>

    </div>
  )
}