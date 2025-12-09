'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseAdminDataOptions<T> {
  endpoint: string
  enabled?: boolean
  refreshTrigger?: number
}

interface UseAdminDataReturn<T> {
  data: T[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  mutate: (updates: Partial<T>) => void
}

export function useAdminData<T extends { id: string }>({
  endpoint,
  enabled = true,
  refreshTrigger,
}: UseAdminDataOptions<T>): UseAdminDataReturn<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!enabled) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(endpoint)
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || 'Failed to fetch data')
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }, [endpoint, enabled])

  useEffect(() => {
    fetchData()
  }, [fetchData, refreshTrigger])

  const mutate = useCallback((updates: Partial<T>) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === updates.id ? { ...item, ...updates } : item
      )
    )
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    mutate,
  }
}

