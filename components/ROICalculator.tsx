'use client'

import { useState } from 'react'

interface ROICalculatorProps {
  roiProjection: {
    timeframe: '6 months' | '1 year' | '2 years'
    expectedRoi: number
    investmentRange: string
    paybackPeriod: string
  }
  cluster: string
}

export default function ROICalculator({ roiProjection, cluster }: ROICalculatorProps) {
  const [customInvestment, setCustomInvestment] = useState(50000)
  const [currentRevenue, setCurrentRevenue] = useState(1000000)
  const [showCustomCalculation, setShowCustomCalculation] = useState(false)

  // Calculate custom ROI based on user inputs
  const calculateCustomROI = () => {
    const efficiency_gains = {
      'AI Explorer': 0.05, // 5% efficiency gain
      'AI Starter': 0.08,  // 8% efficiency gain
      'AI Adopter': 0.12,  // 12% efficiency gain
      'AI Leader': 0.18    // 18% efficiency gain
    }

    const gain = efficiency_gains[cluster as keyof typeof efficiency_gains] || 0.05
    const annualSavings = currentRevenue * gain
    const monthlyROI = (annualSavings - customInvestment) / customInvestment * 100
    const paybackMonths = Math.ceil(customInvestment / (annualSavings / 12))

    return {
      annualSavings: Math.round(annualSavings),
      roiPercentage: Math.round(monthlyROI),
      paybackMonths,
      breakEvenPoint: paybackMonths
    }
  }

  const customResults = calculateCustomROI()

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Proiezione ROI Personalizzata</h3>
          <p className="text-sm text-gray-600">Stima basata sul tuo profilo AI</p>
        </div>
      </div>

      {/* Default ROI Projection */}
      <div className="bg-white rounded-xl p-4 mb-6 border border-green-100">
        <h4 className="font-semibold text-gray-800 mb-3">📊 Proiezione Standard ({cluster})</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{roiProjection.expectedRoi}%</div>
            <div className="text-xs text-gray-600">ROI Atteso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{roiProjection.timeframe}</div>
            <div className="text-xs text-gray-600">Timeframe</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{roiProjection.investmentRange}</div>
            <div className="text-xs text-gray-600">Investimento</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">{roiProjection.paybackPeriod}</div>
            <div className="text-xs text-gray-600">Payback</div>
          </div>
        </div>
      </div>

      {/* Custom Calculator Toggle */}
      <div className="mb-4">
        <button
          onClick={() => setShowCustomCalculation(!showCustomCalculation)}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 font-medium"
        >
          <svg className={`w-4 h-4 transform transition-transform ${showCustomCalculation ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Calcola ROI personalizzato per la tua azienda
        </button>
      </div>

      {/* Custom Calculator */}
      {showCustomCalculation && (
        <div className="bg-white rounded-xl p-4 border border-green-100">
          <h4 className="font-semibold text-gray-800 mb-4">🎯 Calcolo Personalizzato</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fatturato Annuale (€)
              </label>
              <input
                type="number"
                value={currentRevenue}
                onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="1,000,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investimento Previsto AI (€)
              </label>
              <input
                type="number"
                value={customInvestment}
                onChange={(e) => setCustomInvestment(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="50,000"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
            <h5 className="font-semibold mb-3">💰 Risultati Personalizzati</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold">€{customResults.annualSavings.toLocaleString()}</div>
                <div className="text-xs opacity-90">Risparmi Annuali</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{customResults.roiPercentage}%</div>
                <div className="text-xs opacity-90">ROI Annuale</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{customResults.paybackMonths}</div>
                <div className="text-xs opacity-90">Mesi Payback</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">€{Math.round(customResults.annualSavings/12).toLocaleString()}</div>
                <div className="text-xs opacity-90">Risparmio/Mese</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-600">
            <p>* Calcolo basato su medie di settore e il tuo livello AI attuale. I risultati possono variare in base all'implementazione specifica.</p>
          </div>
        </div>
      )}

      {/* ROI Breakdown by AI Applications */}
      <div className="mt-6 bg-white rounded-xl p-4 border border-green-100">
        <h4 className="font-semibold text-gray-800 mb-3">🎯 Potenziali Aree di Impatto</h4>
        <div className="space-y-3">
          {[
            { area: 'Automazione Processi', impact: '15-25%', description: 'Riduzione tempo operativo' },
            { area: 'Customer Service', impact: '30-40%', description: 'Riduzione costi supporto' },
            { area: 'Analisi Predittiva', impact: '10-20%', description: 'Miglioramento decisioni' },
            { area: 'Generazione Contenuti', impact: '50-70%', description: 'Velocità creazione contenuti' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-800">{item.area}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">{item.impact}</div>
                <div className="text-xs text-gray-500">Efficienza</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Vuoi una analisi ROI dettagliata per la tua azienda?
        </p>
        <a
          href="https://calendar.app.google/qRHonaahhRhqZqSu8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Prenota Analisi ROI Gratuita
        </a>
      </div>
    </div>
  )
}