// src/hooks/usePageLoader.js
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function usePageLoader() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 500) // smooth delay
    return () => clearTimeout(timeout)
  }, [location])

  return loading
}