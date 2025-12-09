'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { SITE_CONFIG } from '@/lib/constants'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { name: 'Bonuses', href: '#games', id: 'games' },
    { name: 'Games', href: '#download-games', id: 'download-games' },
    { name: 'Leaderboard', href: '#leaderboard', id: 'leaderboard' },
    { name: 'Reviews', href: '#reviews', id: 'reviews' }
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        const offset = 80 // Account for fixed navbar height
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
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
              href="https://www.facebook.com/share/17dubonS1y/"
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
              href="https://www.facebook.com/share/17dubonS1y/"
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
