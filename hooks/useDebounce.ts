import { useRef } from 'react'

export default function useDebounce(callback: () => void) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return () => {
    // Clear the previous timer if it was set
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set a 250ms delay before calling the callback function
    timeoutRef.current = setTimeout(() => {
      callback()
    }, 250)
  }
}
