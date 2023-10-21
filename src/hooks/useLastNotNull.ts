import { useEffect, useState } from 'react'

export default function useLastNotNull<T>(value: T | null | undefined): T | null {
  const [ last, setLast ] = useState<T | null>(null)
  useEffect(() => {
    if (value !== null && value !== undefined) {
      setLast(value)
    }
  }, [ value ])

  return last
}
