'use client'

interface ExecutiveMultiSelectProps {
  values: string[]
  onChange: (values: string[]) => void
  options: string[]
  question: string
  maxSelections?: number
  minSelections?: number
}

export default function ExecutiveMultiSelect({
  values,
  onChange,
  options,
  question,
  maxSelections,
  minSelections = 1
}: ExecutiveMultiSelectProps) {
  const handleToggle = (option: string) => {
    const isSelected = values.includes(option)

    if (isSelected) {
      if (values.length > minSelections) {
        onChange(values.filter(v => v !== option))
      }
    } else {
      if (!maxSelections || values.length < maxSelections) {
        onChange([...values, option])
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{question}</h3>
        {maxSelections && (
          <p className="text-sm text-slate-500">
            Seleziona fino a {maxSelections} opzioni ({values.length}/{maxSelections})
          </p>
        )}
      </div>

      <div className="grid gap-3">
        {options.map((option) => {
          const isSelected = values.includes(option)
          const isDisabled = !isSelected && maxSelections && values.length >= maxSelections

          return (
            <button
              key={option}
              onClick={() => !isDisabled && handleToggle(option)}
              disabled={Boolean(isDisabled)}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${isSelected
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : isDisabled
                    ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }
              `}
            >
              <div className="flex items-center">
                <div className={`
                  w-5 h-5 rounded border-2 mr-3 flex items-center justify-center
                  ${isSelected
                    ? 'border-white bg-white'
                    : isDisabled
                      ? 'border-slate-300'
                      : 'border-slate-300'
                  }
                `}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`font-medium ${isDisabled ? 'text-slate-400' : ''}`}>
                  {option}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}