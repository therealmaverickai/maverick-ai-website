'use client'

import { useState, useEffect } from 'react'

interface QuadrantProps {
  strategyScore: number // 0-100
  executionScore: number // 0-100
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
  const [animatedPosition, setAnimatedPosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    setIsVisible(true)
    // Animate the company position
    const timer = setTimeout(() => {
      setAnimatedPosition({
        x: executionScore,
        y: strategyScore
      })
    }, 800)
    return () => clearTimeout(timer)
  }, [strategyScore, executionScore])

  // Determine quadrant based on scores
  const getQuadrant = (strategy: number, execution: number) => {
    const strategyHigh = strategy >= 60
    const executionHigh = execution >= 60

    if (strategyHigh && executionHigh) {
      return {
        name: 'MARKET LEADERS',
        color: 'bg-emerald-500',
        textColor: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
        icon: '🏆',
        description: 'Visione chiara con esecuzione comprovata',
        nextSteps: 'Espandere i vantaggi competitivi AI'
      }
    } else if (!strategyHigh && executionHigh) {
      return {
        name: 'SCALING PIONEERS',
        color: 'bg-blue-500',
        textColor: 'text-blue-700',
        bgColor: 'bg-blue-50',
        icon: '🚀',
        description: 'Forte implementazione, strategia emergente',
        nextSteps: 'Elevare l\'ambizione strategica AI'
      }
    } else if (strategyHigh && !executionHigh) {
      return {
        name: 'STRATEGIC PLANNERS',
        color: 'bg-amber-500',
        textColor: 'text-amber-700',
        bgColor: 'bg-amber-50',
        icon: '📋',
        description: 'Visione chiara, sviluppo capabilities',
        nextSteps: 'Accelerare velocità implementazione'
      }
    } else {
      return {
        name: 'EMERGING ADOPTERS',
        color: 'bg-slate-500',
        textColor: 'text-slate-700',
        bgColor: 'bg-slate-50',
        icon: '🌱',
        description: 'Fase di esplorazione AI',
        nextSteps: 'Sviluppare strategia ed esecuzione'
      }
    }
  }

  const currentQuadrant = getQuadrant(strategyScore, executionScore)

  // Get competitive benchmark companies in each quadrant (examples)
  const getQuadrantExamples = (quadrantName: string) => {
    const examples = {
      'MARKET LEADERS': ['Netflix', 'Tesla', 'Microsoft', 'Google'],
      'SCALING PIONEERS': ['Siemens', 'BMW', 'Unilever', 'Walmart'],
      'STRATEGIC PLANNERS': ['JP Morgan', 'Lufthansa', 'Axa', 'Schneider'],
      'EMERGING ADOPTERS': ['Tradizionali', 'PMI', 'Settore Pubblico', 'No-profit']
    }
    return examples[quadrantName as keyof typeof examples] || []
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">🎯 Posizionamento strategico AI</h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          La vostra organizzazione nel panorama competitivo globale dell'AI
        </p>
      </div>

      {/* Executive Full-Width Quadrant */}
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12 shadow-lg border border-slate-200">
          {/* Strategic Axes Labels - Executive Style */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              VISIONE STRATEGICA AI
            </div>
          </div>
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 rotate-90 z-20">
            <div className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              CAPACITÀ ESECUZIONE
            </div>
          </div>

          {/* Executive Quadrant Grid - Larger and More Professional */}
          <div className="relative h-[500px] mx-8">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3">
              {/* Top Right - Market Leaders */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 flex flex-col items-center justify-center border-3 border-emerald-300 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-900 mb-1">MARKET LEADERS</div>
                  <div className="text-sm text-emerald-700 font-medium">Visione + Esecuzione</div>
                </div>
              </div>

              {/* Top Left - Strategic Planners */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 flex flex-col items-center justify-center border-3 border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-2xl">📋</span>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-900 mb-1">STRATEGIC PLANNERS</div>
                  <div className="text-sm text-amber-700 font-medium">Visione Forte</div>
                </div>
              </div>

              {/* Bottom Right - Scaling Pioneers */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 flex flex-col items-center justify-center border-3 border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-2xl">🚀</span>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-900 mb-1">SCALING PIONEERS</div>
                  <div className="text-sm text-blue-700 font-medium">Esecuzione Forte</div>
                </div>
              </div>

              {/* Bottom Left - Emerging Adopters */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center border-3 border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-slate-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-2xl">🌱</span>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-700 mb-1">EMERGING ADOPTERS</div>
                  <div className="text-sm text-slate-600 font-medium">Fase Esplorativa</div>
                </div>
              </div>
            </div>

            {/* Executive Company Position Indicator */}
            <div
              className={`absolute w-8 h-8 rounded-full ${currentQuadrant.color} border-4 border-white shadow-2xl transition-all duration-2000 ease-out z-30 pulse-glow`}
              style={{
                left: `${Math.max(5, Math.min(95, (animatedPosition.x * 0.9) + 5))}%`,
                bottom: `${Math.max(5, Math.min(95, (animatedPosition.y * 0.9) + 5))}%`,
                transform: 'translate(-50%, 50%)'
              }}
            >
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-40">
                <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-xl border border-slate-700">
                  {companyName}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
              </div>
            </div>

            {/* Executive Grid Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-400 opacity-30"></div>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-400 opacity-30"></div>
            </div>
          </div>


          {/* Executive Classification Banner */}
          <div className="mt-8 text-center">
            <div className={`inline-flex items-center px-8 py-4 rounded-2xl ${currentQuadrant.bgColor} border-2 ${currentQuadrant.color.replace('bg-', 'border-')} shadow-lg`}>
              <div className="text-4xl mr-4">{currentQuadrant.icon}</div>
              <div>
                <div className={`text-2xl font-bold ${currentQuadrant.textColor} mb-1`}>
                  {currentQuadrant.name}
                </div>
                <div className={`text-sm ${currentQuadrant.textColor} font-medium`}>
                  {currentQuadrant.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pulse-glow {
          animation: pulse-glow 3s infinite;
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2);
          }
        }
      `}</style>
    </div>
  )
}