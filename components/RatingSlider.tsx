'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

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
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || window.navigator.maxTouchPoints > 0)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Enhanced touch handling for mobile
  const handleTouch = useCallback((e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return
    
    const rect = sliderRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX
    if (!clientX) return
    
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const newValue = Math.round(min + (percentage / 100) * (max - min))
    
    if (newValue !== value) {
      onChange(newValue)
      // Haptic feedback on mobile
      if ('vibrate' in navigator && isMobile) {
        navigator.vibrate(10)
      }
    }
  }, [min, max, value, onChange, isMobile])

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
    handleTouch(e)
  }, [handleTouch])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (isDragging) {
      handleTouch(e)
    }
  }, [isDragging, handleTouch])

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return // Prevent mouse events on mobile
    setIsDragging(true)
    handleTouch(e)
  }, [isMobile, handleTouch])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !isDragging) return
    handleTouch(e)
  }, [isMobile, isDragging, handleTouch])

  const handleMouseUp = useCallback(() => {
    if (isMobile) return
    setIsDragging(false)
  }, [isMobile])

  // Global mouse events for drag outside slider
  useEffect(() => {
    if (!isDragging || isMobile) return
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return
      const rect = sliderRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      const newValue = Math.round(min + (percentage / 100) * (max - min))
      if (newValue !== value) onChange(newValue)
    }
    
    const handleGlobalMouseUp = () => setIsDragging(false)
    
    document.addEventListener('mousemove', handleGlobalMouseMove)
    document.addEventListener('mouseup', handleGlobalMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, min, max, value, onChange, isMobile])

  const getColorIntensity = (value: number) => {
    const percentage = ((value - min) / (max - min)) * 100
    return Math.round(percentage)
  }

  const percentage = ((value - min) / (max - min)) * 100
  const colorIntensity = getColorIntensity(value)

  return (
    <div className="space-y-6">
      {/* Executive Labels */}
      <div className="flex justify-between text-sm text-slate-600">
        <span className="font-medium flex-1 pr-4">{leftLabel}</span>
        <span className="font-medium flex-1 pl-4 text-right">{rightLabel}</span>
      </div>

      <div
        ref={sliderRef}
        className="relative py-8 px-6 touch-pan-x"
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ touchAction: 'pan-x' }}
      >
        {/* Executive Track */}
        <div className={`relative ${isMobile ? 'h-3' : 'h-2'} bg-slate-200 rounded-full`}>
          {/* Progress */}
          <div
            className="h-full bg-gradient-to-r from-slate-700 to-slate-900 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${percentage}%` }}
          />

          {/* Executive Thumb with Value */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${isMobile ? 'w-14 h-14' : 'w-12 h-12'} bg-white border-2 border-slate-300 rounded-2xl shadow-lg cursor-pointer transform transition-all duration-200 flex items-center justify-center ${
              isDragging ? 'scale-110 shadow-xl border-slate-400' : isHovering && !isMobile ? 'scale-105 shadow-lg border-slate-400' : ''
            } ${isMobile ? 'select-none' : ''}`}
            style={{
              left: `calc(${percentage}% - ${isMobile ? '28px' : '24px'})`,
              zIndex: 10,
              minWidth: isMobile ? '56px' : '48px',
              minHeight: isMobile ? '56px' : '48px'
            }}
          >
            <span className={`text-slate-800 font-semibold ${isMobile ? 'text-lg' : 'text-base'}`}>
              {value}
            </span>
          </div>
        </div>

        {/* Fallback Slider Input - Hidden on Mobile for Better Touch */}
        {!isMobile && (
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label={`Rating scale from ${leftLabel} to ${rightLabel}`}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={`${value} out of ${max} - ${value <= 2 ? leftLabel : value >= 4 ? rightLabel : 'Medio'}`}
            aria-orientation="horizontal"
            role="slider"
          />
        )}
        
        {/* Mobile Accessibility */}
        {isMobile && (
          <div
            role="slider"
            aria-label={`Rating scale from ${leftLabel} to ${rightLabel}`}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={`${value} out of ${max} - ${value <= 2 ? leftLabel : value >= 4 ? rightLabel : 'Medio'}`}
            aria-orientation="horizontal"
            tabIndex={0}
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
    </div>
  )
}