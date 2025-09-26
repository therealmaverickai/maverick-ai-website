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
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
      {/* Executive Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">AI Strategic Matrix</h3>
              <p className="text-slate-300">Il vostro posizionamento strategico nell'adozione dell'Intelligenza Artificiale</p>
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

      <div className="px-8 pb-6">
        {/* Simple Matrix Container */}
        <div className="relative max-w-3xl mx-auto mt-8 overflow-visible">
          {/* Left Axis Label - Overlapping Left Side */}
          <div className="absolute top-1/2 transform -translate-y-1/2 -rotate-90 z-10" style={{ left: '-75px' }}>
            <div className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm border whitespace-nowrap">
              Capacità di Esecuzione
            </div>
          </div>


          {/* Clean Matrix Grid */}
          <div className="relative bg-slate-50 rounded-xl border border-slate-200 p-6">

            {/* Top Axis Label */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <div className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm border">
                Visione Strategica
              </div>
            </div>


            {/* Clean Matrix Grid */}
            <div className="relative h-[280px] mt-2">
              {/* Grid Lines */}
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-300"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300"></div>
              </div>

              {/* Quadrant Labels - Minimal and Well-Spaced */}
              <div className="absolute top-3 right-3 text-xs font-medium text-emerald-700">Market Leaders</div>
              <div className="absolute top-3 left-3 text-xs font-medium text-amber-700">Strategic Planners</div>
              <div className="absolute bottom-3 left-3 text-xs font-medium text-slate-600">Emerging Adopters</div>
              <div className="absolute bottom-3 right-3 text-xs font-medium text-blue-700">Scaling Pioneers</div>

              {/* Company Position Dot - Clean and Elegant */}
              <div
                className={`absolute w-5 h-5 rounded-full ${currentQuadrant.color} border-2 border-white shadow-md transition-all duration-1000 ease-out z-10`}
                style={{
                  left: `${animatedPosition.x}%`,
                  top: `${animatedPosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Company Label - Simple and Clean */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-slate-900 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                    {companyName}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-1 border-r-1 border-t-1 border-transparent border-t-slate-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}