import { useEffect, useRef } from 'react'

// https://usehooks.com/usePrevious/
export default function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])
  
  return ref.current
}