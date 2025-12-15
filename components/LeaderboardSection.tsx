'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { LeaderboardItem, GiveawayItem } from '@/lib/types/bonus'

export default function LeaderboardSection() {
  const [leaderboardItem, setLeaderboardItem] = useState<LeaderboardItem | null>(null)
  const [giveawayItem, setGiveawayItem] = useState<GiveawayItem | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const [leaderboardRes, giveawayRes] = await Promise.all([
        fetch('/api/leaderboard', { cache: 'no-store' }),
        fetch('/api/giveaways', { cache: 'no-store' })
      ])
      
      const leaderboardData = await leaderboardRes.json()
      const giveawayData = await giveawayRes.json()
      
      if (leaderboardData.success && leaderboardData.data.length > 0) {
        setLeaderboardItem(leaderboardData.data[0])
      }
      
      if (giveawayData.success && giveawayData.data.length > 0) {
        setGiveawayItem(giveawayData.data[0])
      }
    } catch (error) {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching data:', error)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <section
      id="leaderboard"
      className="py-12 sm:py-16 md:py-20 relative overflow-hidden scroll-mt-20"
      style={{
        backgroundImage: "url('/feature section photo.jpg')",
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
          <motion.div 
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 text-center font-cursive px-2">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#ff7a00,#ffb300,#ffd24a)' }}>
                Leaderboard & Tokens
              </span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4 font-medium font-serif">
              Compete for top spots and earn tokens in arcade games
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {/* Leaderboard Card */}
            {leaderboardItem && (
              <motion.div 
                className="relative group bg-gradient-to-br from-[#19110a] to-[#0f0a06] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-[rgba(255,210,74,0.3)] shadow-xl hover:shadow-[0_0_40px_rgba(255,179,0,0.4)] transition-all duration-500 transform hover:scale-[1.02] flex flex-col items-center justify-center min-h-[300px] sm:min-h-[350px] overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>
                
                <div className="relative z-10 text-center">
                  {leaderboardItem.imageUrl ? (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-4 sm:mb-6 rounded-full overflow-hidden relative shadow-2xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 mx-auto">
                      <Image
                        src={leaderboardItem.imageUrl}
                        alt={leaderboardItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-4 sm:mb-6 rounded-full flex items-center justify-center text-5xl sm:text-6xl font-bold bg-gradient-to-br from-yellow-400 to-orange-300 shadow-2xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 mx-auto">
                      <span className="select-none">{leaderboardItem.icon || '🏆'}</span>
                    </div>
                  )}
                  
                  <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-cursive group-hover:text-yellow-300 transition-colors duration-300">
                    {leaderboardItem.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed font-medium font-serif">
                    {leaderboardItem.description}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
                    <span className="text-yellow-300 text-sm sm:text-base font-bold font-cursive animate-pulse">
                      {leaderboardItem.status === 'coming-soon' ? 'Coming Soon' : leaderboardItem.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Giveaways Card */}
            {giveawayItem && (
              <motion.div 
                className="relative group bg-gradient-to-br from-[#19110a] to-[#0f0a06] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-[rgba(255,210,74,0.3)] shadow-xl hover:shadow-[0_0_40px_rgba(255,179,0,0.4)] transition-all duration-500 transform hover:scale-[1.02] flex flex-col items-center justify-center min-h-[300px] sm:min-h-[350px] overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>
                
                <div className="relative z-10 text-center">
                  {giveawayItem.imageUrl ? (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-4 sm:mb-6 rounded-full overflow-hidden relative shadow-2xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 mx-auto">
                      <Image
                        src={giveawayItem.imageUrl}
                        alt={giveawayItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-4 sm:mb-6 rounded-full flex items-center justify-center text-5xl sm:text-6xl font-bold bg-gradient-to-br from-yellow-400 to-orange-300 shadow-2xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 mx-auto">
                      <span className="select-none">{giveawayItem.icon || '🎁'}</span>
                    </div>
                  )}
                  
                  <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-cursive group-hover:text-yellow-300 transition-colors duration-300">
                    {giveawayItem.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed font-medium font-serif">
                    {giveawayItem.description}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
                    <span className="text-yellow-300 text-sm sm:text-base font-bold font-cursive animate-pulse">
                      {giveawayItem.status === 'coming-soon' ? 'Coming Soon' : giveawayItem.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

