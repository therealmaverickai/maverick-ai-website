'use client'

import { DimensionScore } from '@/lib/assessmentScoring'

interface AIMaturityHeatmapProps {
  dimensions: {
    strategy: DimensionScore
    technology: DimensionScore
    people: DimensionScore
    governance: DimensionScore
    data: DimensionScore
    culture: DimensionScore
  }
  industryBenchmark: {
    percentile: number
    comparison: 'Below Average' | 'Average' | 'Above Average' | 'Top Performer'
    industryAverage: number
  }
}

export default function AIMaturityHeatmap({ dimensions, industryBenchmark }: AIMaturityHeatmapProps) {
  const dimensionData = [
    {
      name: 'Strategia AI',
      key: 'strategy',
      score: dimensions.strategy.percentage,
      level: dimensions.strategy.level,
      description: dimensions.strategy.description,
      icon: '🎯',
      color: 'blue'
    },
    {
      name: 'Tecnologia',
      key: 'technology',
      score: dimensions.technology.percentage,
      level: dimensions.technology.level,
      description: dimensions.technology.description,
      icon: '⚡',
      color: 'purple'
    },
    {
      name: 'Persone & Skills',
      key: 'people',
      score: dimensions.people.percentage,
      level: dimensions.people.level,
      description: dimensions.people.description,
      icon: '👥',
      color: 'green'
    },
    {
      name: 'Governance',
      key: 'governance',
      score: dimensions.governance.percentage,
      level: dimensions.governance.level,
      description: dimensions.governance.description,
      icon: '🏢',
      color: 'orange'
    },
    {
      name: 'Gestione Dati',
      key: 'data',
      score: dimensions.data.percentage,
      level: dimensions.data.level,
      description: dimensions.data.description,
      icon: '💾',
      color: 'slate'
    },
    {
      name: 'Cultura & Investimenti',
      key: 'culture',
      score: dimensions.culture.percentage,
      level: dimensions.culture.level,
      description: dimensions.culture.description,
      icon: '💼',
      color: 'slate'
    }
  ]

  const getColorClasses = (color: string, score: number) => {
    const intensity = score >= 80 ? '800' : score >= 60 ? '700' : score >= 40 ? '600' : '500'
    return {
      bg: `bg-slate-${intensity}`,
      text: `text-slate-700`,
      border: `border-slate-200`,
      gradient: `from-slate-600 to-slate-${intensity}`
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'text-slate-800 bg-slate-100'
      case 'Advanced': return 'text-slate-700 bg-slate-100'
      case 'Developing': return 'text-slate-700 bg-slate-100'
      case 'Beginner': return 'text-slate-600 bg-slate-100'
      default: return 'text-slate-600 bg-slate-100'
    }
  }

  const getBenchmarkColor = (comparison: string) => {
    switch (comparison) {
      case 'Top Performer': return 'text-slate-800 bg-slate-100 border-slate-300'
      case 'Above Average': return 'text-slate-800 bg-slate-100 border-slate-300'
      case 'Average': return 'text-slate-700 bg-slate-100 border-slate-300'
      case 'Below Average': return 'text-slate-700 bg-slate-100 border-slate-300'
      default: return 'text-slate-700 bg-slate-100 border-slate-300'
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-600 to-slate-800 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Mappa di Maturità AI</h3>
          <p className="text-sm text-slate-600">Analisi multidimensionale delle tue competenze AI</p>
        </div>
      </div>

      {/* Industry Benchmark Card */}
      <div className={`p-4 rounded-xl border-2 mb-6 ${getBenchmarkColor(industryBenchmark.comparison)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold mb-1">Posizionamento Settoriale</h4>
            <p className="text-sm">Il tuo punteggio vs. media di settore</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{industryBenchmark.percentile}° percentile</div>
            <div className="text-sm font-medium">{industryBenchmark.comparison}</div>
          </div>
        </div>
        <div className="mt-3 bg-white bg-opacity-50 rounded-lg p-2 text-sm">
          Media settore: {industryBenchmark.industryAverage}% | La tua posizione: {industryBenchmark.comparison}
        </div>
      </div>

      {/* Keep only the overall maturity visualization - remove individual dimension boxes */}

      {/* Overall Maturity Visualization */}
      <div className="bg-slate-50 rounded-xl p-6">
        <h4 className="font-semibold text-slate-900 mb-4 text-center">📊 Panoramica Maturità AI</h4>

        {/* Radar Chart Simulation with Bars */}
        <div className="space-y-3">
          {dimensionData.map((dimension, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-28 text-sm font-medium text-slate-700 text-right">
                {dimension.name}
              </div>
              <div className="flex-1 bg-slate-200 rounded-full h-5 relative">
                <div
                  className={`h-5 rounded-full bg-gradient-to-r ${getColorClasses(dimension.color, dimension.score).gradient} relative`}
                  style={{ width: `${dimension.score}%` }}
                />
                {/* Move percentage outside the bar to prevent overlap */}
                <div className="absolute -right-12 top-0 h-full flex items-center">
                  <span className="text-slate-700 text-xs font-bold">{dimension.score}%</span>
                </div>
              </div>
              <div className="w-20 text-sm text-center ml-12">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(dimension.level)}`}>
                  {dimension.level}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-center">
          <div className="bg-slate-100 text-slate-600 py-2 px-3 rounded-lg border border-slate-200">
            <span className="font-medium">Beginner</span><br/>0-39%
          </div>
          <div className="bg-slate-100 text-slate-700 py-2 px-3 rounded-lg border border-slate-200">
            <span className="font-medium">Developing</span><br/>40-64%
          </div>
          <div className="bg-slate-100 text-slate-700 py-2 px-3 rounded-lg border border-slate-200">
            <span className="font-medium">Advanced</span><br/>65-79%
          </div>
          <div className="bg-slate-100 text-slate-800 py-2 px-3 rounded-lg border border-slate-200">
            <span className="font-medium">Expert</span><br/>80-100%
          </div>
        </div>
      </div>

      {/* Improvement Insights section removed as requested */}
    </div>
  )
}