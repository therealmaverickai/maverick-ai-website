'use client'

interface Step {
  name: string
  description: string
  completed: boolean
  current: boolean
}

interface ExecutiveProgressProps {
  steps: Step[]
  currentStep: number
  totalSteps: number
}

export default function ExecutiveProgress({ steps, currentStep, totalSteps }: ExecutiveProgressProps) {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
      {/* Progress Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-sm font-medium text-slate-900 uppercase tracking-wide">
            Strategic Assessment Progress
          </h4>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {progressPercentage}% Completato
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Fase</p>
          <p className="text-lg font-semibold text-slate-900">
            {currentStep + 1} di {totalSteps}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="overflow-hidden h-2 bg-slate-100 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-slate-800 to-slate-900 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Steps Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`
              p-3 rounded-lg border transition-all duration-200
              ${step.current
                ? 'border-slate-900 bg-slate-50 text-slate-900'
                : step.completed
                  ? 'border-green-200 bg-green-50 text-green-800'
                  : 'border-slate-200 bg-white text-slate-500'
              }
            `}
          >
            <div className="flex items-center mb-2">
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mr-2
                ${step.current
                  ? 'bg-slate-900 text-white'
                  : step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 text-slate-400'
                }
              `}>
                {step.completed ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <h5 className="text-sm font-medium truncate">{step.name}</h5>
            </div>
            <p className="text-xs opacity-75">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}