import { auth } from '@/auth'
import { redirect } from 'next/navigation'

/**
 * Get the current session on the server side
 * Use this in Server Components and Server Actions
 */
export async function getServerSession() {
  const session = await auth()
  return session
}

/**
 * Require authentication - redirects to login if not authenticated
 * Use this in Server Components
 */
export async function requireAuth() {
  const session = await auth()
  
  if (!session) {
    redirect('/admin/login')
  }
  
  return session
}

/**
 * Check if user has admin role
 */
export function isAdmin(session: { user?: { role?: string } } | null): boolean {
  return session?.user?.role === 'admin'
}

/**
 * Require admin role - redirects to login if not admin
 */
export async function requireAdmin() {
  const session = await requireAuth()
  
  if (!isAdmin(session)) {
    redirect('/admin/login')
  }
  
  return session
}



