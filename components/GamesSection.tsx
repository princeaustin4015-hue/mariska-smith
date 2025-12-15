
'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { BonusOffer } from '@/lib/types/bonus'

export default function GamesSection() {
  const [bonuses, setBonuses] = useState<BonusOffer[]>([])

  const fetchBonuses = useCallback(async () => {
    try {
      const response = await fetch('/api/bonuses?activeOnly=true', {
        cache: 'no-store' // Always fetch fresh data on client
      })
      const data = await response.json()
      if (data.success) {
        setBonuses(data.data)
      }
    } catch (error) {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching bonuses:', error)
      }
      // Fallback to empty array if API fails
      setBonuses([])
    }
  }, [])

  useEffect(() => {
    fetchBonuses()
  }, [fetchBonuses])

  return (
    <section
      id="games"
      className="py-12 sm:py-16 md:py-20 relative overflow-hidden scroll-mt-20"
      style={{
        backgroundImage: "url('/game section bg.webp')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.55)]"></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 sm:h-16 md:h-24" style={{ background: 'linear-gradient(180deg, #0b0604 0%, rgba(11,6,4,0.7) 40%, rgba(11,6,4,0) 100%)' }}></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-16 md:h-24" style={{ background: 'linear-gradient(0deg, #000 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 roomy-copy">
        <div className="relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 text-center font-cursive px-2">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#ff7a00,#ffb300,#ffd24a)' }}>
                Bonuses & Credits
              </span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4 font-medium font-serif">
              Claim bonuses, earn credits and tokens by playing arcade games
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {bonuses.map((offer, idx) => (
              <div
                key={`offer-${idx}`}
                className="relative group bg-gradient-to-br from-[#19110a] to-[#0f0a06] rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-[rgba(255,210,74,0.3)] shadow-xl hover:shadow-[0_0_40px_rgba(255,179,0,0.4)] transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 flex flex-col overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`}></div>

                {/* Badge */}
                {offer.badge && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-10">
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-lg animate-pulse">
                      {offer.badge}
                    </span>
                  </div>
                )}

                {/* Highlight badge */}
                {offer.highlight && (
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-lg">
                      {offer.highlight}
                    </span>
                  </div>
                )}

                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-tr-full"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon or Image */}
                  {offer.imageUrl ? (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-4 sm:mb-5 md:mb-6 rounded-xl sm:rounded-2xl overflow-hidden relative shadow-2xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                      <Image
                        src={offer.imageUrl}
                        alt={offer.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 mb-3 sm:mb-4 md:mb-5 rounded-xl sm:rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-bold bg-gradient-to-br from-yellow-400 to-orange-300 shadow-2xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                      <span className="select-none">{offer.icon}</span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-2 sm:mb-3 font-cursive group-hover:text-yellow-300 transition-colors duration-300">
                    {offer.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed min-h-[2.5rem] sm:min-h-[3rem] px-1 font-medium font-serif">
                    {offer.description}
                  </p>

                  {/* Details */}
                  <div className="w-full mb-3 sm:mb-4 md:mb-5 pb-3 sm:pb-4 border-b border-yellow-400/20">
                    <p className="text-yellow-300/80 text-[10px] sm:text-xs font-semibold tracking-wide px-1 font-serif">
                      {offer.details}
                    </p>
                  </div>

                  {/* Action Button */}
                  <a
                    href="https://www.facebook.com/share/16imCG9Jhw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 active:scale-95 text-black px-4 py-3 sm:px-5 sm:py-3 md:px-6 md:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/50 group-hover:shadow-2xl touch-manipulation font-cursive min-h-[44px] flex items-center justify-center text-center"
                  >
                    {offer.action || 'Claim Bonus'}
                  </a>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

