'use client'

import { useState } from 'react'

interface RatingSliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  leftLabel: string
  rightLabel: string
  showValue?: boolean
}

export default function RatingSlider({ 
  value, 
  onChange, 
  min, 
  max, 
  step = 1, 
  leftLabel, 
  rightLabel,
  showValue = true 
}: RatingSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const getColorIntensity = (value: number) => {
    const percentage = ((value - min) / (max - min)) * 100
    return Math.round(percentage)
  }

  const percentage = ((value - min) / (max - min)) * 100
  const colorIntensity = getColorIntensity(value)

  return (
    <div className="space-y-4">
      {/* Labels above the slider */}
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span className="text-left font-medium">{leftLabel}</span>
        <span className="text-right font-medium">{rightLabel}</span>
      </div>

      <div 
        className="relative py-6"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Track */}
        <div className="relative h-2 bg-gray-100 rounded-full shadow-inner">
          {/* Progress */}
          <div 
            className="h-full bg-gradient-to-r from-accent-400 to-accent-600 transition-all duration-500 ease-out rounded-full shadow-sm"
            style={{ width: `${percentage}%` }}
          />
          
          {/* Thumb with Value */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-accent-500 rounded-full shadow-lg cursor-pointer transform transition-all duration-300 flex items-center justify-center ${
              isDragging ? 'scale-125 shadow-xl' : isHovering ? 'scale-110 shadow-lg' : ''
            }`}
            style={{ left: `calc(${percentage}% - 16px)` }}
          >
            <span className="text-white text-sm font-semibold">
              {value}
            </span>
          </div>
        </div>

        {/* Slider Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  )
}