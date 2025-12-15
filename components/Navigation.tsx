'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { SITE_CONFIG } from '@/lib/constants'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [pendingScroll, setPendingScroll] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Scroll to section with retry mechanism
  const scrollToSection = useCallback((targetId: string, retries = 10, delay = 150) => {
    const attemptScroll = (): boolean => {
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        // Wait for next frame to ensure layout is stable
        requestAnimationFrame(() => {
          const offset = 80 // Account for fixed navbar height
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = Math.max(0, elementPosition - offset)

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        })
        return true
      }
      return false
    }

    // Try immediately
    if (attemptScroll()) {
      return
    }

    // Retry with increasing delays to account for dynamic component loading
    for (let i = 1; i <= retries; i++) {
      setTimeout(() => {
        attemptScroll()
      }, delay * i)
    }
  }, [])

  // Handle scrolling after navigation from other pages
  useEffect(() => {
    if (pendingScroll && pathname === '/') {
      // Wait for page to fully render and all components to load
      const attemptScroll = (): boolean => {
        const targetElement = document.getElementById(pendingScroll)
        if (targetElement) {
          requestAnimationFrame(() => {
            const offset = 80
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = Math.max(0, elementPosition - offset)
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          })
          setPendingScroll(null)
          return true
        }
        return false
      }

      // Try multiple times with increasing delays to account for dynamic imports
      let timers: NodeJS.Timeout[] = []
      
      // Try immediately
      if (!attemptScroll()) {
        // Retry with increasing delays to wait for dynamic components
        timers = [
          setTimeout(() => attemptScroll(), 100),
          setTimeout(() => attemptScroll(), 250),
          setTimeout(() => attemptScroll(), 500),
          setTimeout(() => attemptScroll(), 750),
          setTimeout(() => attemptScroll(), 1000),
          setTimeout(() => attemptScroll(), 1500),
          setTimeout(() => attemptScroll(), 2000)
        ]
      }

      return () => {
        timers.forEach(timer => clearTimeout(timer))
      }
    }
  }, [pendingScroll, pathname])

  // Handle URL hash on page load
  useEffect(() => {
    if (pathname === '/' && typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1)
      if (hash && ['games', 'download-games', 'leaderboard', 'reviews'].includes(hash)) {
        // Wait for page to be fully loaded and components rendered
        const handleHashScroll = () => {
          scrollToSection(hash)
        }
        
        // Try immediately if page is already loaded
        if (document.readyState === 'complete') {
          // Give time for dynamic components to render
          setTimeout(handleHashScroll, 200)
        } else {
          window.addEventListener('load', () => {
            setTimeout(handleHashScroll, 200)
          }, { once: true })
        }
        
        // Also try after a delay to catch late-loading components
        const delayedScroll = setTimeout(() => {
          scrollToSection(hash)
        }, 1500)
        
        return () => clearTimeout(delayedScroll)
      }
    }
  }, [pathname, scrollToSection])

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false)
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const navItems = [
    { name: 'Featured', href: '#games', id: 'games' },
    { name: 'Games', href: '#download-games', id: 'download-games' },
    { name: 'Leaderboard', href: '#leaderboard', id: 'leaderboard' },
    { name: 'Reviews', href: '#reviews', id: 'reviews' }
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1)
      
      // If we're on the home page, scroll directly
      if (pathname === '/') {
        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
          scrollToSection(targetId)
        })
        // Update URL hash without triggering scroll
        window.history.replaceState(null, '', `#${targetId}`)
      } else {
        // If we're on a different page, navigate to home first, then scroll
        setPendingScroll(targetId)
        router.push(`/#${targetId}`)
      }
    } else {
      router.push(href)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0604]/95 backdrop-blur-sm border-b border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent font-cursive touch-manipulation"
              style={{ backgroundImage: 'linear-gradient(90deg, #ff7a00, #ffb300, #ffd24a)' }}
            >
              {SITE_CONFIG.name}
            </Link>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-gray-300 hover:text-yellow-400 px-3 py-2.5 text-sm font-medium font-cursive transition-colors duration-200 touch-manipulation min-h-[44px] flex items-center cursor-pointer"
              >
                {item.name}
              </a>
            ))}
            <a
              href="https://www.facebook.com/share/16imCG9Jhw/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black px-4 py-2 rounded-lg text-sm font-bold font-cursive transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/50 min-h-[44px] flex items-center"
            >
              Play Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 mt-2 mb-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-gray-300 hover:text-yellow-400 block px-3 py-3 min-h-[44px] flex items-center rounded-md text-base font-medium font-cursive transition-colors duration-200 touch-manipulation"
              >
                {item.name}
              </a>
            ))}
            <a
              href="https://www.facebook.com/share/16imCG9Jhw/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black px-4 py-3 rounded-lg text-sm font-bold font-cursive transition-all duration-300 mt-2 min-h-[44px] flex items-center justify-center"
            >
              Play Now
            </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
