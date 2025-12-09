# NextAuth.js Authentication Setup

This document explains the NextAuth.js authentication implementation for the admin panel.

## 🚀 Overview

The admin panel now uses **NextAuth.js v5 (Auth.js)** for secure authentication. This replaces the previous simple password-based authentication system.

## 📦 Installation

NextAuth.js has been installed:
```bash
npm install next-auth@beta
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
AUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
# OR use NEXTAUTH_SECRET (both work)
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32

# Admin Password (change this in production!)
ADMIN_PASSWORD=your-secure-password-here
```

### Generate AUTH_SECRET

Generate a secure secret key using one of these methods:

**Using OpenSSL:**
```bash
openssl rand -base64 32
```

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Online Generator:**
Visit https://generate-secret.vercel.app/32

## 📁 File Structure

```
├── auth.ts                    # NextAuth configuration
├── auth.config.ts             # Auth config (callbacks, pages)
├── middleware.ts              # Route protection middleware
├── types/
│   └── next-auth.d.ts        # TypeScript type definitions
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts  # NextAuth API route handler
│   └── admin/
│       ├── login/
│       │   └── page.tsx      # Login page (uses NextAuth signIn)
│       └── page.tsx           # Admin dashboard (uses NextAuth session)
├── components/
│   └── providers/
│       └── SessionProvider.tsx # NextAuth SessionProvider wrapper
└── lib/
    └── utils/
        ├── auth.ts            # Password verification
        └── auth-helpers.ts     # Server-side auth utilities
```

## 🔐 How It Works

### 1. Authentication Flow

1. User visits `/admin/login`
2. Enters password
3. `signIn()` function is called with credentials
4. NextAuth validates credentials via `authorize()` function
5. JWT session is created and stored in HTTP-only cookie
6. User is redirected to `/admin` dashboard

### 2. Session Management

- **Strategy**: JWT (JSON Web Tokens)
- **Duration**: 24 hours
- **Storage**: HTTP-only cookie (secure, not accessible via JavaScript)
- **Auto-refresh**: Handled by NextAuth

### 3. Route Protection

**Middleware** (`middleware.ts`):
- Protects all `/admin/*` routes
- Redirects unauthenticated users to `/admin/login`
- Redirects authenticated users away from login page

**Server Components**:
- Use `requireAuth()` or `requireAdmin()` from `lib/utils/auth-helpers.ts`

**Client Components**:
- Use `useAuth()` or `useRequireAuth()` hooks from `hooks/useAuth.ts`

## 🛠️ Usage Examples

### Server Component (Protected Route)

```tsx
import { requireAuth } from '@/lib/utils/auth-helpers'

export default async function AdminPage() {
  const session = await requireAuth()
  
  return <div>Welcome, {session.user?.name}</div>
}
```

### Client Component (Protected Route)

```tsx
'use client'

import { useRequireAuth } from '@/hooks/useAuth'

export default function AdminPage() {
  const { session, isAdmin } = useRequireAuth()
  
  if (!session) return null
  
  return <div>Welcome, {session.user?.name}</div>
}
```

### Login Page

```tsx
'use client'

import { signIn } from 'next-auth/react'

const handleLogin = async () => {
  const result = await signIn('credentials', {
    password: 'user-password',
    redirect: false,
  })
  
  if (result?.ok) {
    router.push('/admin')
  }
}
```

### Logout

```tsx
'use client'

import { signOut } from 'next-auth/react'

const handleLogout = async () => {
  await signOut({ redirect: false })
  router.push('/admin/login')
}
```

### Check Authentication Status

```tsx
'use client'

import { useAuth } from '@/hooks/useAuth'

export default function Component() {
  const { isAuthenticated, isLoading, isAdmin } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <div>Not logged in</div>
  
  return <div>Logged in as {isAdmin ? 'Admin' : 'User'}</div>
}
```

## 🔒 Security Features

1. **HTTP-Only Cookies**: Session tokens stored in HTTP-only cookies (XSS protection)
2. **Secure Cookies**: Cookies marked as secure in production (HTTPS only)
3. **SameSite Protection**: CSRF protection via SameSite cookie attribute
4. **JWT Tokens**: Secure token-based authentication
5. **Password Verification**: Centralized password checking (ready for hashing)

## 🚨 Production Checklist

- [ ] Set strong `AUTH_SECRET` environment variable
- [ ] Change `ADMIN_PASSWORD` to a secure password
- [ ] Implement password hashing (bcrypt, argon2)
- [ ] Enable HTTPS in production
- [ ] Set up rate limiting for login attempts
- [ ] Add audit logging for admin actions
- [ ] Consider implementing 2FA/MFA
- [ ] Set up session monitoring
- [ ] Configure proper CORS settings

## 🔄 Migration from Old Auth

The old authentication system has been replaced:
- ❌ `/api/admin/login` - Replaced by NextAuth `signIn()`
- ❌ `/api/admin/verify` - Replaced by NextAuth `useSession()`
- ❌ `/api/admin/logout` - Replaced by NextAuth `signOut()`
- ❌ Cookie-based sessions - Replaced by NextAuth JWT sessions

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [NextAuth.js v5 (Auth.js) Docs](https://authjs.dev/)
- [Next.js Authentication Guide](https://nextjs.org/docs/app/building-your-application/authentication)

## 🐛 Troubleshooting

### "AUTH_SECRET is not set"
- Add `AUTH_SECRET` or `NEXTAUTH_SECRET` to `.env.local`
- Generate a secure secret key (see above)

### "Invalid credentials"
- Check that `ADMIN_PASSWORD` matches the password being entered
- Verify environment variables are loaded correctly

### Session not persisting
- Check cookie settings in browser
- Verify `AUTH_SECRET` is set
- Check middleware configuration

### Redirect loops
- Verify middleware matcher pattern
- Check callback configuration in `auth.config.ts`

## 💡 Future Enhancements

1. **Password Hashing**: Implement bcrypt or argon2 for password storage
2. **Database Integration**: Store sessions and users in database
3. **Multi-User Support**: Add user management system
4. **Role-Based Access Control**: Implement granular permissions
5. **2FA/MFA**: Add two-factor authentication
6. **OAuth Providers**: Add Google, GitHub, etc. login options
7. **Session Management**: Add active session management UI
8. **Audit Logging**: Track all admin actions



