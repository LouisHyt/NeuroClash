import { useState, useEffect, useCallback, useRef } from 'react'

type UseCountdownReturnType = {
  count: number
  reset: () => void
  pause: () => void
  resume: () => void
  isPaused: boolean
}

function useCountdown(initialCount: number, onComplete: () => void): UseCountdownReturnType {
  const [count, setCount] = useState(initialCount)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const reset = useCallback(() => setCount(initialCount), [initialCount])

  const pause = useCallback(() => {
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    setIsPaused(false)
  }, [])

  useEffect(() => {
    if (isPaused) return

    if (count <= 0) {
      onComplete()
      return
    }

    timerRef.current = setTimeout(() => {
      setCount(count - 1)
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [count, onComplete, isPaused])

  return { count, reset, pause, resume, isPaused }
}

export default useCountdown
