import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Admin panel is temporarily disabled - redirect all admin routes to home
  // TODO: Re-enable admin panel in the future by uncommenting the code below
  if (nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  // Original admin protection code (commented out for future use):
  /*
  // Protect admin routes
  if (nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page
    if (nextUrl.pathname.startsWith('/admin/login')) {
      // Redirect to dashboard if already logged in
      if (isLoggedIn) {
        return NextResponse.redirect(new URL('/admin', nextUrl))
      }
      return NextResponse.next()
    }

    // Require authentication for all other admin routes
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', nextUrl))
    }
  }
  */

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}

