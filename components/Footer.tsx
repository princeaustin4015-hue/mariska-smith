'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault()
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
        }
    }

    return (
        <footer
            className="relative overflow-hidden text-white"
            style={{
                backgroundImage: "url('/feature section photo.jpg')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Vignette effect for seamless transition and focus */}
            <div className="pointer-events-none absolute inset-0 z-10" style={{
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.85) 100%)'
            }}></div>
            {/* Overlay for highlight and readability */}
            <div className="absolute inset-0 bg-black/80 z-0"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 roomy-copy relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 sm:col-span-2">
                        <div className="mb-4 sm:mb-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-cursive">
                                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#ff7a00,#ffb300,#ffd24a)' }}>
                                    {SITE_CONFIG.name}
                                </span>
                            </h3>
                            <p className="text-gray-400 text-sm sm:text-base md:text-lg font-medium font-serif">
                                {SITE_CONFIG.tagline}
                            </p>
                        </div>
                        <p className="text-gray-500 mb-4 sm:mb-6 max-w-md text-sm sm:text-base font-serif">
                            Play arcade games, earn credits and tokens, and claim amazing bonuses!
                            Join thousands of players worldwide!
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-3 sm:space-x-4">
                            <a
                              href={`https://twitter.com/${SITE_CONFIG.social.twitter.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-[var(--accent-gold)] transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px]"
                              aria-label="Twitter"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                              </svg>
                            </a>
                            <a
                              href="https://www.instagram.com/mariska_smit_?igsh=MXNkbWZxaGQ3MzcxMQ=="
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-[var(--accent-gold)] transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px]"
                              aria-label="Instagram"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                            </a>
                            <a
                              href="https://www.facebook.com/share/16imCG9Jhw/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-[var(--accent-gold)] transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px]"
                              aria-label="Facebook"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                              </svg>
                            </a>
                            <a
                              href="https://t.me/+12297308774"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-[var(--accent-gold)] transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px]"
                              aria-label="Telegram"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                              </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                      <h4 className="text-white font-bold mb-3 sm:mb-4 font-cursive text-base sm:text-lg">Quick Links</h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        <li><a href="#games" onClick={(e) => handleLinkClick(e, '#games')} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center cursor-pointer">Featured</a></li>
                        <li><a href="#download-games" onClick={(e) => handleLinkClick(e, '#download-games')} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center cursor-pointer">Games</a></li>
                        <li><a href="#leaderboard" onClick={(e) => handleLinkClick(e, '#leaderboard')} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center cursor-pointer">Leaderboard</a></li>
                        <li><a href="#reviews" onClick={(e) => handleLinkClick(e, '#reviews')} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center cursor-pointer">Reviews</a></li>
                      </ul>
                    </div>

                    {/* Support */}
                    <div>
                      <h4 className="text-white font-bold mb-3 sm:mb-4 font-cursive text-base sm:text-lg">Support</h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center cursor-pointer">Help Center</Link></li>
                        <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center cursor-pointer">FAQ</Link></li>
                        <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center cursor-pointer">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center cursor-pointer">Privacy Policy</Link></li>
                      </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[rgba(255,210,74,0.2)] mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-7 md:pt-8">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                    <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left font-medium font-serif">
                      © {currentYear} {SITE_CONFIG.name}. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <span className="text-gray-500 text-xs sm:text-sm font-medium font-serif">Made with</span>
                      <span className="text-red-500">♥</span>
                      <span className="text-gray-500 text-xs sm:text-sm font-medium font-serif">for gamers worldwide</span>
                    </div>
                  </div>
                </div>
            </div>
        </footer>
    );
}
