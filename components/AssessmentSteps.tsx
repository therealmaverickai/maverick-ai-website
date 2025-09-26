'use client'

import React, { useState, useEffect } from 'react'
import { type AssessmentData } from '@/lib/assessmentScoring'
import ExecutiveRating from './ExecutiveRating'
import ExecutiveSelect from './ExecutiveSelect'
import ExecutiveMultiSelect from './ExecutiveMultiSelect'
import ExecutiveResultsChart from './ExecutiveResultsChart'
import AssessmentAIChat from './AssessmentAIChat'
import StrategicPositioningQuadrant from './StrategicPositioningQuadrant'
import AIUnlockBanner from './AIUnlockBanner'

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

        {/* Industry and Company Size Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Settore di Attività *
            </label>
            <select
              value={data.industry || ''}
              onChange={(e) => onChange('industry', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
            >
              <option value="">Seleziona il settore</option>
              <optgroup label="Servizi Professionali">
                <option value="Consulenza Strategica">Consulenza Strategica</option>
                <option value="Consulenza IT">Consulenza IT</option>
                <option value="Servizi Legali">Servizi Legali</option>
                <option value="Servizi Contabili">Servizi Contabili</option>
                <option value="Servizi Marketing">Servizi Marketing</option>
                <option value="Architettura e Ingegneria">Architettura e Ingegneria</option>
              </optgroup>
              <optgroup label="Tecnologia">
                <option value="Software Development">Software Development</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Services">Cloud Services</option>
                <option value="AI/ML">AI/ML</option>
                <option value="IoT">IoT</option>
                <option value="Fintech">Fintech</option>
                <option value="Healthtech">Healthtech</option>
              </optgroup>
              <optgroup label="Manifatturiero">
                <option value="Automotive">Automotive</option>
                <option value="Farmaceutico">Farmaceutico</option>
                <option value="Alimentare">Alimentare</option>
                <option value="Tessile">Tessile</option>
                <option value="Chimico">Chimico</option>
                <option value="Meccanico">Meccanico</option>
                <option value="Elettronico">Elettronico</option>
              </optgroup>
              <optgroup label="Servizi Finanziari">
                <option value="Banche">Banche</option>
                <option value="Assicurazioni">Assicurazioni</option>
                <option value="Investimenti">Investimenti</option>
                <option value="Private Equity">Private Equity</option>
                <option value="Venture Capital">Venture Capital</option>
              </optgroup>
              <optgroup label="Retail e E-commerce">
                <option value="Retail Tradizionale">Retail Tradizionale</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Fashion">Fashion</option>
                <option value="Luxury">Luxury</option>
                <option value="Food & Beverage">Food & Beverage</option>
              </optgroup>
              <optgroup label="Sanità">
                <option value="Ospedali">Ospedali</option>
                <option value="Cliniche Private">Cliniche Private</option>
                <option value="Dispositivi Medici">Dispositivi Medici</option>
                <option value="Biotecnologie">Biotecnologie</option>
              </optgroup>
              <optgroup label="Servizi">
                <option value="Logistica">Logistica</option>
                <option value="Trasporti">Trasporti</option>
                <option value="Turismo">Turismo</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Utilities">Utilities</option>
                <option value="Telecomunicazioni">Telecomunicazioni</option>
              </optgroup>
              <optgroup label="Pubblico">
                <option value="PA Centrale">PA Centrale</option>
                <option value="PA Locale">PA Locale</option>
                <option value="Sanità Pubblica">Sanità Pubblica</option>
                <option value="Università">Università</option>
                <option value="Enti di Ricerca">Enti di Ricerca</option>
              </optgroup>
              <optgroup label="Altri">
                <option value="Energia">Energia</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Media">Media</option>
                <option value="Editoria">Editoria</option>
                <option value="Non Profit">Non Profit</option>
                <option value="Altro">Altro</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Dimensione Aziendale *
            </label>
            <select
              value={data.companySize || ''}
              onChange={(e) => onChange('companySize', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
            >
              <option value="">Seleziona la dimensione</option>
              <option value="micro">Micro impresa (fino a €2M di fatturato, 1-10 dipendenti)</option>
              <option value="piccola">Piccola impresa (€2M - €10M di fatturato, 11-50 dipendenti)</option>
              <option value="media">Media impresa (€10M - €50M di fatturato, 51-250 dipendenti)</option>
              <option value="grande">Grande impresa (€50M - €500M di fatturato, 251-1000 dipendenti)</option>
              <option value="enterprise">Enterprise (oltre €500M di fatturato, oltre 1000 dipendenti)</option>
            </select>
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
  const [aiUseCases, setAiUseCases] = useState<any>(null)
  const [isGeneratingUseCases, setIsGeneratingUseCases] = useState(false)
  const [useCasesError, setUseCasesError] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

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

  // Generate AI use cases when component loads
  const generateAIUseCases = async () => {
    if (!results || !data || isGeneratingUseCases) return

    setIsGeneratingUseCases(true)
    setUseCasesError(null)

    try {
      const response = await fetch('/api/ai-usecases/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentData: data,
          assessmentResults: results
        })
      })

      const result = await response.json()

      if (result.success) {
        setAiUseCases(result.useCases)
        console.log('AI use cases generated successfully')
      } else {
        throw new Error(result.error || 'Failed to generate use cases')
      }
    } catch (error) {
      console.error('Error generating AI use cases:', error)
      setUseCasesError('Impossibile generare i use case AI. Riprova più tardi.')
      // Could add fallback use cases here if needed
    } finally {
      setIsGeneratingUseCases(false)
    }
  }

  // Generate roadmap and use cases on component mount
  useEffect(() => {
    if (results && data && !aiRoadmap && !isGeneratingRoadmap) {
      generateAIRoadmap()
    }
    if (results && data && !aiUseCases && !isGeneratingUseCases) {
      generateAIUseCases()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, data])

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <div className="pt-8 relative">
      {/* Enhanced Scroll Progress Indicator */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="bg-slate-900/95 backdrop-blur-sm rounded-2xl px-4 py-6 shadow-2xl border border-slate-700">
          <div className="flex flex-col items-center">
            {/* Scroll Progress Circle */}
            <div className="relative w-12 h-12 mb-4">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-600"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-white"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="transparent"
                  strokeDasharray={`${scrollProgress}, 100`}
                  style={{
                    transition: 'stroke-dasharray 0.3s ease-out'
                  }}
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {Math.round(scrollProgress)}%
                </span>
              </div>
            </div>

            {/* Scroll Status Text */}
            <div className="text-center">
              {scrollProgress < 20 ? (
                <>
                  <div className="text-xs font-bold text-white mb-1">SCORRI</div>
                  <div className="text-xs text-slate-300 leading-tight">
                    Per vedere<br/>tutti i risultati
                  </div>
                </>
              ) : scrollProgress < 80 ? (
                <>
                  <div className="text-xs font-bold text-white mb-1">CONTINUA</div>
                  <div className="text-xs text-slate-300 leading-tight">
                    Altri contenuti<br/>più in basso
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xs font-bold text-emerald-400 mb-1">COMPLETO</div>
                  <div className="text-xs text-slate-300 leading-tight">
                    Hai visto<br/>tutto!
                  </div>
                </>
              )}
            </div>

            {/* Animated Arrow (only show if not at bottom) */}
            {scrollProgress < 95 && (
              <div className="mt-3 animate-bounce">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m0 0l7-7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section - Executive Style */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden mb-12 mx-8">
        {/* Executive Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Risultati AI Readiness Assessment</h2>
                <p className="text-slate-300">Analisi dell'AI Readiness di {data.company}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
              <div className="flex items-center text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI-Powered Analysis
              </div>
            </div>
          </div>
        </div>

        {/* Assessment Results Content */}
        <div className="p-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Left Column - Score and Classification (1/3 width) */}
            <div className="flex flex-col items-center justify-center">
              {/* Overall Score Circle */}
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

              {/* Cluster Badge and Industry Benchmark */}
              <div className="flex flex-col items-center space-y-3">
                <div className={`inline-flex items-center px-6 py-3 rounded-xl border-2 ${getScoreBgColor(results.overallScore)}`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      {results.cluster}
                    </div>
                  </div>
                </div>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getBenchmarkColor(results.industryBenchmark.comparison)}`}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {results.industryBenchmark.percentile}° percentile • {results.industryBenchmark.comparison}
                </div>
              </div>
            </div>

            {/* Right Column - AI Executive Summary (2/3 width) */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">

              {results.aiSummary ? (
                <div className="text-slate-700 text-sm leading-relaxed space-y-3">
                  {results.aiSummary.split('\n').map((paragraph: string, index: number) => {
                    if (paragraph.trim()) {
                      // Check if it's a markdown-style heading
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h4 key={index} className="font-bold text-slate-900 text-base mt-4 mb-2">
                            {paragraph.replace(/\*\*/g, '')}
                          </h4>
                        )
                      }
                      // Check if it's a bullet point
                      if (paragraph.startsWith('•') || paragraph.startsWith('-')) {
                        return (
                          <div key={index} className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>{paragraph.replace(/^[•-]\s*/, '')}</span>
                          </div>
                        )
                      }
                      return <p key={index}>{paragraph}</p>
                    }
                    return null
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center bg-white rounded-lg px-4 py-3 border border-slate-200">
                    <div className="w-6 h-6 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin mr-3"></div>
                    <span className="text-slate-600 text-sm">Generazione executive summary in corso...</span>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 italic">
                  Analisi personalizzata generata da Maverick AI basata sui risultati del vostro assessment
                </p>
              </div>
            </div>
          </div>

          {/* AI Unlock Banner */}
          <div className="mx-8">
            <AIUnlockBanner data={data} results={results} />
          </div>

        </div>
      </div>

      {/* Strategic Positioning Quadrant - Full Width */}
      <div className="mb-12 px-8">
        <StrategicPositioningQuadrant
          strategyScore={Math.round((results.dimensions.strategy.percentage + results.dimensions.governance.percentage) / 2)}
          executionScore={Math.round((results.dimensions.technology.percentage + results.dimensions.people.percentage + results.dimensions.data.percentage) / 3)}
          companyName={data.company || 'La Vostra Azienda'}
          overallScore={results.overallScore}
        />
      </div>

      {/* Use Case AI Module */}
      <div className="mb-12 bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden mx-8">
        {/* Executive Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Use case AI</h3>
                <p className="text-slate-300">Esplora i principali use case AI per {data.company}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
              <div className="flex items-center text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI-Powered Analysis
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Content */}
        <div className="p-8">
          {/* Loading State */}
          {isGeneratingUseCases ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center text-slate-600">
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg font-medium">Generazione use case AI personalizzati...</span>
              </div>
              <p className="text-slate-500 mt-2 text-sm">Analizziamo i risultati del vostro assessment per identificare i migliori use case AI</p>
            </div>
          ) : useCasesError ? (
            <div className="text-center py-8">
              <div className="text-red-600 bg-red-50 rounded-xl p-6">
                <svg className="w-8 h-8 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="font-medium">{useCasesError}</p>
                <button
                  onClick={generateAIUseCases}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  Riprova
                </button>
              </div>
            </div>
          ) : aiUseCases && aiUseCases.length > 0 ? (
            <div className="space-y-6">
              {/* Introduction */}
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-slate-900 mb-3">Use Case AI Prioritizzati</h4>
                <p className="text-slate-600 text-sm">Basati sui risultati del vostro assessment e ottimizzati per {data.company}</p>
              </div>

              {/* Use Cases Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {aiUseCases.map((useCase: any, index: number) => (
                  <div key={index} className="bg-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                    {/* Use Case Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                            {index + 1}
                          </div>
                          <h5 className="font-bold text-slate-900 text-lg">{useCase.title}</h5>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            useCase.complexity === 'Bassa' ? 'bg-emerald-100 text-emerald-700' :
                            useCase.complexity === 'Media' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            Complessità {useCase.complexity}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <p className="text-slate-700 text-sm leading-relaxed">{useCase.description}</p>
                    </div>

                    {/* Impact & ROI */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <h6 className="font-semibold text-slate-900 text-sm mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          Impatto Atteso
                        </h6>
                        <p className="text-slate-600 text-sm">{useCase.impact}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <h6 className="font-semibold text-slate-900 text-sm mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          ROI e Timeline
                        </h6>
                        <p className="text-slate-600 text-sm">{useCase.roi}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="bg-slate-900 rounded-xl p-8 text-center text-white mt-8">
                <h5 className="text-xl font-bold mb-4">Vuoi approfondire questi use case?</h5>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  I nostri esperti possono aiutarti a valutare la fattibilità e a pianificare l'implementazione di questi use case specifici per {data.company}.
                </p>
                <a
                  href="https://calendar.app.google/qRHonaahhRhqZqSu8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Discuti gli Use Case
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-slate-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="font-medium mb-2">Nessun use case disponibile</p>
                <p className="text-sm">Completa l'assessment per vedere i use case AI personalizzati</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Executive Strategic Roadmap - Compact Version */}
      <div className="mb-12 bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden mx-8">
        {/* Executive Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Roadmap di adozione AI</h3>
                <p className="text-slate-300">Roadmap personalizzata per l'adozione AI in {data.company}</p>
              </div>
            </div>
            {aiRoadmap && (
              <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                <div className="flex items-center text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI-Powered Analysis
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          {/* AI-Generated Roadmap Loading State */}
          {isGeneratingRoadmap ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center bg-slate-50 rounded-xl px-8 py-6 border border-slate-200">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-blue-500 rounded-full animate-spin" style={{animationDirection: 'reverse' as const, animationDuration: '2s'}}></div>
                </div>
                <div className="ml-6 text-left">
                  <div className="flex items-center text-slate-900 font-bold text-lg mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Elaborazione strategica AI in corso
                  </div>
                  <p className="text-slate-600">Il nostro sistema esperto sta creando una roadmap personalizzata basata sui vostri risultati</p>
                </div>
              </div>
            </div>
          ) : roadmapError ? (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-amber-900 mb-2">Sistema di generazione temporaneamente non disponibile</div>
                  <p className="text-amber-800">{roadmapError}</p>
                  <p className="text-amber-700 text-sm mt-2">Verrà utilizzata la roadmap standardizzata basata sul vostro cluster AI</p>
                </div>
              </div>
            </div>
          ) : null}

          {/* Clean Timeline Overview */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-slate-900 mb-3">Timeline</h4>
              <p className="text-slate-600 text-sm">Il vostro percorso verso l'eccellenza AI</p>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="text-red-600 font-semibold text-xs mb-1">FASE 1</div>
                  <div className="text-slate-900 font-bold text-lg">0-30 giorni</div>
                  <div className="text-slate-600 text-sm">Quick Wins</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="text-blue-600 font-semibold text-xs mb-1">FASE 2</div>
                  <div className="text-slate-900 font-bold text-lg">3-6 mesi</div>
                  <div className="text-slate-600 text-sm">Implementazione</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="text-emerald-600 font-semibold text-xs mb-1">FASE 3</div>
                  <div className="text-slate-900 font-bold text-lg">6-18 mesi</div>
                  <div className="text-slate-600 text-sm">Leadership</div>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Roadmap Phases */}
          <div className="space-y-4">
            {/* Phase 1: Immediate Actions */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <h4 className="font-bold text-slate-900 text-lg">Azioni immediate</h4>
                    <span className="ml-3 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">0-3 mesi</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">Quick wins operativi con ROI immediato</p>
                  <div className="space-y-2">
                    {(aiRoadmap?.immediate || results.recommendations.immediate).slice(0, 3).map((rec: string, index: number) => (
                      <div key={index} className="flex items-start text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2: Medium Term */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <h4 className="font-bold text-slate-900 text-lg">Sviluppo strutturale</h4>
                    <span className="ml-3 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">3-18 mesi</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">Implementazioni di soluzioni in processi core</p>
                  <div className="space-y-2">
                    {(aiRoadmap?.shortTerm || results.recommendations.shortTerm).slice(0, 3).map((rec: string, index: number) => (
                      <div key={index} className="flex items-start text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3: Long Term */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <h4 className="font-bold text-slate-900 text-lg">Visione a lungo termine</h4>
                    <span className="ml-3 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">&gt;18 mesi</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">Trasformazione in una AI-driven company</p>
                  <div className="space-y-2">
                    {(aiRoadmap?.longTerm || results.recommendations.longTerm).slice(0, 3).map((rec: string, index: number) => (
                      <div key={index} className="flex items-start text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Clean CTA Section */}
      <div className="mb-12 bg-slate-900 rounded-2xl shadow-lg mx-8">
        <div className="p-12 text-center text-white">
          <h4 className="text-3xl font-bold mb-6">
            Vuoi implementare questi risultati?
          </h4>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Prenota una consulenza strategica <strong className="text-white">gratuita</strong> per trasformare
            l'assessment di <strong className="text-white">{data.company}</strong> in un piano d'azione concreto.
          </p>

          <a
            href="https://calendar.app.google/qRHonaahhRhqZqSu8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Prenota una call
            <svg className="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>

          <p className="text-slate-400 text-sm mt-4">
            45 minuti • Analisi personalizzata • Piano d'azione specifico
          </p>
        </div>
      </div>

    </div>
  )
}