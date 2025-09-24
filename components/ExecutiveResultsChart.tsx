'use client'

import { useState, useEffect } from 'react'

interface DimensionData {
  name: string
  score: number
  maxScore: number
  percentage: number
  level: string
  description: string
}

interface ExecutiveResultsChartProps {
  dimensions: Record<string, DimensionData>
  overallScore: number
  industryBenchmark: {
    percentile: number
    comparison: string
    industryAverage: number
  }
}

export default function ExecutiveResultsChart({
  dimensions,
  overallScore,
  industryBenchmark
}: ExecutiveResultsChartProps) {
  const [animatedScores, setAnimatedScores] = useState<Record<string, number>>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Animate scores on mount
    const timer = setTimeout(() => {
      const animated: Record<string, number> = {}
      Object.entries(dimensions).forEach(([key, dimension]) => {
        animated[key] = dimension.percentage
      })
      setAnimatedScores(animated)
    }, 500)

    return () => clearTimeout(timer)
  }, [dimensions])

  const dimensionNames = {
    strategy: 'Strategia AI',
    technology: 'Tecnologia',
    people: 'Competenze',
    governance: 'Governance',
    data: 'Gestione Dati',
    culture: 'Cultura & Esperienza'
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-emerald-500'
    if (percentage >= 65) return 'bg-blue-500'
    if (percentage >= 40) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const getScoreTextColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-600'
    if (percentage >= 65) return 'text-blue-600'
    if (percentage >= 40) return 'text-amber-600'
    return 'text-red-600'
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
    <div className="space-y-8">

      {/* Dimensions Radar Chart Visual */}
      <div className="bg-slate-50 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">
          Profilo Multidimensionale AI Readiness
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(dimensions).map(([key, dimension], index) => {
            const animatedScore = animatedScores[key] || 0

            return (
              <div
                key={key}
                className="bg-white rounded-lg p-4 border border-slate-200 hover:shadow-sm transition-all duration-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-slate-900 text-sm">
                    {dimensionNames[key as keyof typeof dimensionNames]}
                  </h4>
                  <span className={`text-lg font-bold ${getScoreTextColor(dimension.percentage)}`}>
                    {Math.round(animatedScore)}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-3">
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getScoreColor(dimension.percentage)} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: `${animatedScore}%`,
                        transitionDelay: `${index * 0.1}s`
                      }}
                    />
                  </div>
                </div>

                {/* Level Badge */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                    dimension.level === 'Expert' ? 'bg-emerald-100 text-emerald-800' :
                    dimension.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                    dimension.level === 'Developing' ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {dimension.level}
                  </span>

                  {/* Level Icon */}
                  <div className={`w-2 h-2 rounded-full ${
                    dimension.level === 'Expert' ? 'bg-emerald-500' :
                    dimension.level === 'Advanced' ? 'bg-blue-500' :
                    dimension.level === 'Developing' ? 'bg-amber-500' :
                    'bg-red-500'
                  }`} />
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {dimension.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Comparative Analysis */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Analisi Comparativa</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">La Vostra Organizzazione</span>
            <span className={`text-lg font-bold ${getScoreTextColor(overallScore)}`}>
              {overallScore}%
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">Media di Settore</span>
            <span className="text-lg font-semibold text-slate-600">
              {industryBenchmark.industryAverage}%
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">Differenza</span>
            <span className={`text-lg font-bold ${
              overallScore >= industryBenchmark.industryAverage ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {overallScore >= industryBenchmark.industryAverage ? '+' : ''}
              {overallScore - industryBenchmark.industryAverage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}