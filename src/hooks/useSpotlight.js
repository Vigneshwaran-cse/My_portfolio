import { useRef, useCallback } from 'react'

/**
 * Spotlight effect: tracks mouse over a card and sets CSS vars --mx --my
 * Usage: spread `...spotlightProps` onto the target element
 */
export function useSpotlight() {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)
  }, [])

  return { ref, onMouseMove }
}
