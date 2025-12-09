import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')
      const isOnLogin = nextUrl.pathname.startsWith('/admin/login')

      if (isOnAdmin) {
        if (isLoggedIn) {
          // Redirect away from login if already authenticated
          if (isOnLogin) {
            return Response.redirect(new URL('/admin', nextUrl))
          }
          return true
        }
        // Redirect to login if not authenticated
        return false
      }

      return true
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig



