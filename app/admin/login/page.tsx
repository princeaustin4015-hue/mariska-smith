'use client'

// NOTE: Admin panel is currently disabled via middleware
// All /admin routes redirect to home page
// To re-enable: Update middleware.ts to uncomment the admin protection code

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ErrorMessage from '@/components/admin/ErrorMessage'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid password. Please try again.')
      } else if (result?.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError('Login failed. Please try again.')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0604] px-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-[#19110a] to-[#0f0a06] border-[rgba(255,210,74,0.35)]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white text-center font-cursive">
            Admin Login
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Enter your password to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#0f0a06] border-[rgba(255,210,74,0.35)] text-white"
                disabled={loading}
              />
            </div>
            {error && <ErrorMessage message={error} />}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

