'use client'

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
                backgroundImage: "url('/feature section photo.webp')",
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
                            Experience the ultimate luck-based gaming platform with thrilling games,
                            fair play, and amazing rewards. Join thousands of players worldwide!
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
                              href={`https://discord.gg/${SITE_CONFIG.social.discord}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-[var(--accent-gold)] transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px]"
                              aria-label="Discord"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                              </svg>
                            </a>
                            <a
                              href={`https://t.me/${SITE_CONFIG.social.telegram}`}
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
                        <li><a href="#games" onClick={(e) => handleLinkClick(e, '#games')} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center cursor-pointer">Bonuses</a></li>
                        <li><a href="#download-games" onClick={(e) => handleLinkClick(e, '#download-games')} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center cursor-pointer">Games</a></li>
                        <li><a href="#leaderboard" onClick={(e) => handleLinkClick(e, '#leaderboard')} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center cursor-pointer">Leaderboard</a></li>
                        <li><a href="#reviews" onClick={(e) => handleLinkClick(e, '#reviews')} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center cursor-pointer">Reviews</a></li>
                      </ul>
                    </div>

                    {/* Support */}
                    <div>
                      <h4 className="text-white font-bold mb-3 sm:mb-4 font-cursive text-base sm:text-lg">Support</h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        <li><a href="#help" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center">Help Center</a></li>
                        <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center">FAQ</a></li>
                        <li><a href="#terms" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center">Terms of Service</a></li>
                        <li><a href="#privacy" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium font-serif touch-manipulation block py-2 min-h-[44px] flex items-center">Privacy Policy</a></li>
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
