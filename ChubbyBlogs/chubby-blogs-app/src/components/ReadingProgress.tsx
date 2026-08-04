'use client'

import { useEffect, useRef } from 'react'

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const progress = (scrollTop / docHeight) * 100
      if (barRef.current) {
        barRef.current.style.width = `${Math.min(progress, 100)}%`
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        backgroundColor: 'var(--color-accent)',
        zIndex: 100,
        transition: 'width 0.1s ease-out',
        width: '0%',
      }}
      ref={barRef}
    />
  )
}
