'use client'

import { useState, useCallback } from 'react'

interface UseAdminMutationOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

interface UseAdminMutationReturn {
  mutate: (options: {
    endpoint: string
    method: 'POST' | 'PUT' | 'DELETE'
    data?: any
  }) => Promise<boolean>
  loading: boolean
  error: string | null
}

export function useAdminMutation({
  onSuccess,
  onError,
}: UseAdminMutationOptions = {}): UseAdminMutationReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = useCallback(
    async ({
      endpoint,
      method,
      data,
    }: {
      endpoint: string
      method: 'POST' | 'PUT' | 'DELETE'
      data?: any
    }): Promise<boolean> => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(endpoint, {
          method,
          headers: data ? { 'Content-Type': 'application/json' } : {},
          body: data ? JSON.stringify(data) : undefined,
        })

        const result = await response.json()

        if (result.success) {
          onSuccess?.()
          return true
        } else {
          const errorMsg = result.error || 'Operation failed'
          setError(errorMsg)
          onError?.(errorMsg)
          return false
        }
      } catch (err) {
        const errorMsg = 'Operation failed. Please try again.'
        setError(errorMsg)
        onError?.(errorMsg)
        return false
      } finally {
        setLoading(false)
      }
    },
    [onSuccess, onError]
  )

  return { mutate, loading, error }
}



