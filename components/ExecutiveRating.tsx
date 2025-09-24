'use client'

import { useState } from 'react'

interface ExecutiveRatingProps {
  value: number | undefined
  onChange: (value: number) => void
  min: number
  max: number
  leftLabel: string
  rightLabel: string
  question: string
  showValidationError?: boolean
}

export default function ExecutiveRating({
  value,
  onChange,
  min,
  max,
  leftLabel,
  rightLabel,
  question,
  showValidationError = false
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
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {question}
          <span className="text-red-500 ml-1">*</span>
        </h3>
        <div className="flex justify-between text-sm text-slate-500 mb-4">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
        {showValidationError && value === undefined && (
          <div className="text-red-500 text-sm mb-2">
            Seleziona una valutazione per continuare
          </div>
        )}
      </div>

      {/* Executive Rating Scale */}
      <div className={`flex justify-between gap-2 ${showValidationError && value === undefined ? 'ring-2 ring-red-300 rounded-lg p-2' : ''}`}>
        {Array.from({ length: max - min + 1 }, (_, index) => {
          const ratingValue = min + index
          const isSelected = value !== undefined && value === ratingValue
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
        {(hoveredValue !== null || value !== undefined) && (
          <span className={`text-sm font-medium ${getValueColor(hoveredValue || value || min)}`}>
            {getValueLabel(hoveredValue || value || min)}
          </span>
        )}
        {hoveredValue === null && value === undefined && (
          <span className="text-sm font-medium text-slate-400">
            Seleziona una valutazione
          </span>
        )}
      </div>
    </div>
  )
}