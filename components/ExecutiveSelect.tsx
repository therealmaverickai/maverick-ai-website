'use client'

interface ExecutiveSelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string; description?: string }[]
  question: string
  placeholder?: string
}

export default function ExecutiveSelect({
  value,
  onChange,
  options,
  question,
  placeholder = "Seleziona un'opzione"
}: ExecutiveSelectProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">{question}</h3>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              w-full text-left p-4 rounded-lg border-2 transition-all duration-200
              ${value === option.value
                ? 'border-slate-900 bg-slate-50 text-slate-900'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }
            `}
          >
            <div className="flex items-center">
              <div className={`
                w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center
                ${value === option.value
                  ? 'border-slate-900 bg-slate-900'
                  : 'border-slate-300'
                }
              `}>
                {value === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-slate-500 mt-1">{option.description}</div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}