'use client'

import { useState } from 'react'

interface ExecutiveRatingProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  leftLabel: string
  rightLabel: string
  question: string
}

export default function ExecutiveRating({
  value,
  onChange,
  min,
  max,
  leftLabel,
  rightLabel,
  question
}: ExecutiveRatingProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)

  const getValueLabel = (val: number) => {
    if (val <= 2) return leftLabel
    if (val >= 4) return rightLabel
    return 'Intermedio'
  }

  const getValueColor = (val: number) => {
    if (val <= 2) return 'text-amber-600'
    if (val >= 4) return 'text-emerald-600'
    return 'text-slate-600'
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{question}</h3>
        <div className="flex justify-between text-sm text-slate-500 mb-4">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      </div>

      {/* Executive Rating Scale */}
      <div className="flex justify-between gap-2">
        {Array.from({ length: max - min + 1 }, (_, index) => {
          const ratingValue = min + index
          const isSelected = value === ratingValue
          const isHovered = hoveredValue === ratingValue

          return (
            <button
              key={ratingValue}
              onClick={() => onChange(ratingValue)}
              onMouseEnter={() => setHoveredValue(ratingValue)}
              onMouseLeave={() => setHoveredValue(null)}
              className={`
                flex-1 h-12 rounded-lg border-2 transition-all duration-200 font-medium text-sm
                ${isSelected
                  ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                  : isHovered
                    ? 'border-slate-400 bg-slate-50 text-slate-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }
              `}
              aria-label={`Rating ${ratingValue} out of ${max}`}
            >
              {ratingValue}
            </button>
          )
        })}
      </div>

      {/* Selected Value Display */}
      <div className="text-center">
        <span className={`text-sm font-medium ${getValueColor(hoveredValue || value)}`}>
          {getValueLabel(hoveredValue || value)}
        </span>
      </div>
    </div>
  )
}