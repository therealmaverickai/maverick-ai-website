'use client'

import { useState, useEffect } from 'react'

interface QuadrantProps {
  strategyScore: number // 0-100 (Y-axis - Vision Strategica)
  executionScore: number // 0-100 (X-axis - Capacità Esecuzione)
  companyName: string
  overallScore: number
}

export default function StrategicPositioningQuadrant({
  strategyScore,
  executionScore,
  companyName,
  overallScore
}: QuadrantProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedPosition, setAnimatedPosition] = useState({ x: 10, y: 10 })

  useEffect(() => {
    setIsVisible(true)
    // Animate the company position with proper coordinate mapping
    const timer = setTimeout(() => {
      // Map scores (0-100) to quadrant coordinates (8-92) to ensure visibility within quadrants
      const mappedX = Math.max(8, Math.min(92, (executionScore * 0.84) + 8)) // Execution on X-axis
      const mappedY = Math.max(8, Math.min(92, ((100 - strategyScore) * 0.84) + 8)) // Strategy on Y-axis (inverted because CSS coordinates)

      setAnimatedPosition({
        x: mappedX,
        y: mappedY
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [strategyScore, executionScore])

  // Determine quadrant based on scores
  const getQuadrant = (strategy: number, execution: number) => {
    const strategyHigh = strategy >= 50
    const executionHigh = execution >= 50

    if (strategyHigh && executionHigh) {
      return {
        name: 'MARKET LEADERS',
        color: 'bg-emerald-500',
        textColor: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-300',
        icon: '🏆',
        description: 'Visione chiara con esecuzione comprovata',
        nextSteps: 'Espandere i vantaggi competitivi AI'
      }
    } else if (strategyHigh && !executionHigh) {
      return {
        name: 'STRATEGIC PLANNERS',
        color: 'bg-amber-500',
        textColor: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-300',
        icon: '📋',
        description: 'Visione chiara, sviluppo capabilities',
        nextSteps: 'Accelerare velocità implementazione'
      }
    } else if (!strategyHigh && executionHigh) {
      return {
        name: 'SCALING PIONEERS',
        color: 'bg-blue-500',
        textColor: 'text-blue-700',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-300',
        icon: '🚀',
        description: 'Forte implementazione, strategia emergente',
        nextSteps: 'Elevare l\'ambizione strategica AI'
      }
    } else {
      return {
        name: 'EMERGING ADOPTERS',
        color: 'bg-slate-500',
        textColor: 'text-slate-700',
        bgColor: 'bg-slate-50',
        borderColor: 'border-slate-300',
        icon: '🌱',
        description: 'Fase di esplorazione AI',
        nextSteps: 'Sviluppare strategia ed esecuzione'
      }
    }
  }

  const currentQuadrant = getQuadrant(strategyScore, executionScore)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Executive Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">AI Strategic Positioning Matrix</h3>
          <p className="text-slate-300 max-w-2xl mx-auto">
            La vostra posizione nel panorama competitivo dell'Intelligenza Artificiale
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* Current Quadrant Indicator */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center px-8 py-6 rounded-xl border-2 ${currentQuadrant.borderColor} ${currentQuadrant.bgColor} shadow-lg hover:shadow-xl transition-all duration-300`}>
            <div className="text-3xl mr-4">{currentQuadrant.icon}</div>
            <div className="text-left">
              <div className="text-xl font-bold text-slate-900 mb-1">
                {currentQuadrant.name}
              </div>
              <div className={`text-sm ${currentQuadrant.textColor} font-medium mb-2`}>
                {currentQuadrant.description}
              </div>
              <div className="flex items-center text-xs text-slate-500">
                <div className="w-2 h-2 bg-slate-400 rounded-full mr-2"></div>
                Score complessivo: {overallScore}%
              </div>
            </div>
          </div>
        </div>

        {/* Executive Metrics Dashboard */}
        <div className="bg-slate-50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-slate-600">VISIONE STRATEGICA</div>
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{strategyScore}%</div>
              <div className="text-xs text-slate-500">Strategy + Governance</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-slate-600">CAPACITÀ ESECUZIONE</div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{executionScore}%</div>
              <div className="text-xs text-slate-500">Technology + People + Data</div>
            </div>
          </div>
        </div>

        {/* Executive Strategic Matrix */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 rounded-xl p-6 shadow-lg border-2 border-slate-200">
            {/* Strategic Axes Labels - Executive Style */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  VISIONE STRATEGICA AI
                </div>
              </div>
            </div>
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 rotate-90 z-20">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  CAPACITÀ ESECUZIONE
                </div>
              </div>
            </div>

            {/* Executive Quadrant Grid - Professional Business Matrix */}
            <div className="relative h-[450px] mx-10 mt-8">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3">
                {/* Top Left - Strategic Planners (High Strategy, Low Execution) */}
                <div className="bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 rounded-xl p-8 flex flex-col items-center justify-center border-2 border-amber-300/50 shadow-md hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-900 mb-2">STRATEGIC PLANNERS</div>
                    <div className="text-sm text-amber-700 font-medium mb-1">Visione Strutturata</div>
                    <div className="text-xs text-amber-600">Esecuzione in Sviluppo</div>
                  </div>
                </div>

                {/* Top Right - Market Leaders (High Strategy, High Execution) */}
                <div className="bg-gradient-to-br from-emerald-50 via-emerald-50 to-emerald-100 rounded-xl p-8 flex flex-col items-center justify-center border-2 border-emerald-300/50 shadow-md hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-900 mb-2">MARKET LEADERS</div>
                    <div className="text-sm text-emerald-700 font-medium mb-1">Eccellenza AI</div>
                    <div className="text-xs text-emerald-600">Leadership Competitiva</div>
                  </div>
                </div>

                {/* Bottom Left - Emerging Adopters (Low Strategy, Low Execution) */}
                <div className="bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200 rounded-xl p-8 flex flex-col items-center justify-center border-2 border-slate-300/50 shadow-md hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-700 mb-2">EMERGING ADOPTERS</div>
                    <div className="text-sm text-slate-600 font-medium mb-1">Fase Iniziale</div>
                    <div className="text-xs text-slate-500">Potenziale in Crescita</div>
                  </div>
                </div>

                {/* Bottom Right - Scaling Pioneers (Low Strategy, High Execution) */}
                <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 rounded-xl p-8 flex flex-col items-center justify-center border-2 border-blue-300/50 shadow-md hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-900 mb-2">SCALING PIONEERS</div>
                    <div className="text-sm text-blue-700 font-medium mb-1">Implementazione Forte</div>
                    <div className="text-xs text-blue-600">Strategia Emergente</div>
                  </div>
                </div>
              </div>

              {/* Executive Company Position Indicator */}
              <div
                className={`absolute w-8 h-8 rounded-full ${currentQuadrant.color} border-4 border-white shadow-2xl transition-all duration-2000 ease-out z-30 company-position-dot`}
                style={{
                  left: `${animatedPosition.x}%`,
                  top: `${animatedPosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Company Name Label - Executive Style */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-40">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-3 rounded-xl text-sm font-bold shadow-2xl border border-slate-700">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      {companyName}
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                </div>
              </div>

              {/* Executive Grid Lines and Axis System */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Primary axes */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-400 opacity-50"></div>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-400 opacity-50"></div>

                {/* Subtle background grid */}
                <div className="absolute left-1/4 top-0 bottom-0 w-px bg-slate-300 opacity-25"></div>
                <div className="absolute left-3/4 top-0 bottom-0 w-px bg-slate-300 opacity-25"></div>
                <div className="absolute top-1/4 left-0 right-0 h-px bg-slate-300 opacity-25"></div>
                <div className="absolute top-3/4 left-0 right-0 h-px bg-slate-300 opacity-25"></div>
              </div>

              {/* Professional Axis Labels */}
              <div className="absolute -bottom-6 left-2 text-xs text-slate-500 font-semibold bg-white px-2 py-1 rounded">0%</div>
              <div className="absolute -bottom-6 right-2 text-xs text-slate-500 font-semibold bg-white px-2 py-1 rounded">100%</div>
              <div className="absolute -left-6 top-2 text-xs text-slate-500 font-semibold rotate-90 origin-left bg-white px-2 py-1 rounded">100%</div>
              <div className="absolute -left-6 bottom-2 text-xs text-slate-500 font-semibold rotate-90 origin-left bg-white px-2 py-1 rounded">0%</div>
            </div>
          </div>
        </div>

        {/* Executive Strategic Recommendations */}
        <div className="mt-10">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-8 border-2 border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">🎯</span>
              </div>
              Raccomandazione strategica immediata
            </h4>
            <p className="text-slate-700 text-lg font-medium leading-relaxed">{currentQuadrant.nextSteps}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .company-position-dot {
          animation: company-pulse 4s infinite ease-in-out;
        }
        @keyframes company-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0,0,0,0.1), 0 0 30px rgba(59, 130, 246, 0.1);
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.3), 0 0 50px rgba(59, 130, 246, 0.2), 0 0 70px rgba(59, 130, 246, 0.1);
            transform: translate(-50%, -50%) scale(1.15);
          }
        }
      `}</style>
    </div>
  )
}