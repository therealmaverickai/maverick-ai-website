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
    <div className="space-y-4">
      {/* Labels above the slider */}
      <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-2">
        <span className="text-left font-medium flex-1 pr-2">{leftLabel}</span>
        <span className="text-right font-medium flex-1 pl-2">{rightLabel}</span>
      </div>

      <div 
        ref={sliderRef}
        className="relative py-12 md:py-10 px-4 touch-pan-x"
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
        {/* Track - Mobile Optimized */}
        <div className={`relative ${isMobile ? 'h-4' : 'h-3 md:h-2'} bg-gray-100 rounded-full shadow-inner`}>
          {/* Progress */}
          <div 
            className="h-full bg-gradient-to-r from-accent-400 to-accent-600 transition-all duration-500 ease-out rounded-full shadow-sm"
            style={{ width: `${percentage}%` }}
          />
          
          {/* Thumb with Value - Mobile Optimized */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 ${isMobile ? 'w-12 h-12' : 'w-10 h-10 md:w-8 md:h-8'} bg-accent-500 rounded-full shadow-lg cursor-pointer transform transition-all duration-200 flex items-center justify-center ${
              isDragging ? 'scale-125 shadow-xl ring-4 ring-accent-200' : isHovering && !isMobile ? 'scale-110 shadow-lg' : ''
            } ${isMobile ? 'select-none' : ''}`}
            style={{ 
              left: `calc(${percentage}% - ${isMobile ? '24px' : '20px'})`,
              zIndex: 10,
              minWidth: isMobile ? '44px' : 'auto',
              minHeight: isMobile ? '44px' : 'auto'
            }}
          >
            <span className={`text-white font-semibold ${isMobile ? 'text-base' : 'text-sm'}`}>
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