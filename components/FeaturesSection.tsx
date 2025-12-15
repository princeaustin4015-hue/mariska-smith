'use client'

import { useMemo, useCallback, memo } from 'react'
import Image from 'next/image'

interface Game {
  name: string
  code: string
  url: string
  icon: string
  iconImage?: string
}

// Helper function to get icon image path based on game name/code
const getGameIconImage = (gameName: string, gameCode: string): string | undefined => {
  const iconMap: Record<string, string> = {
    'cash machine': '/gamesicon/cash machine.jpeg',
    'cash vault': '/gamesicon/cash vault.jpeg',
    'game vault': '/gamesicon/cash vault.jpeg',
    'fire kirin': '/gamesicon/firekirin.jpeg',
    'game room': '/gamesicon/gameroom.jpeg',
    'high roller': '/gamesicon/highstakes.jpeg',
    'high stakes': '/gamesicon/highstakes.jpeg',
    'juwa city': '/gamesicon/juwa city.jpeg',
    'milky way app': '/gamesicon/milkyways.jpeg',
    'milky way': '/gamesicon/milkyways.jpeg',
    'mr all in one': '/gamesicon/mrallinone.jpeg',
    'orion star': '/gamesicon/orion stars.png',
    'orion stars': '/gamesicon/orion stars.png',
    'vb link': '/gamesicon/vb link.jpeg',
    'lasvegas sweeps': '/gamesicon/vegasweeps.jpeg',
    'vegas sweeps': '/gamesicon/vegasweeps.jpeg'
  }

  const normalizedName = gameName.toLowerCase().trim()
  return iconMap[normalizedName] || undefined
}

const GAMES_DATA: Omit<Game, 'iconImage'>[] = [
  { name: 'Game Vault', code: 'gv', url: 'https://download.gamevault999.com/', icon: '🎰' },
  { name: 'Lasvegas Sweeps', code: 'vs', url: 'https://m.lasvegassweeps.com/', icon: '🎲' },
  { name: 'Juwa City', code: 'jc', url: 'https://dl.juwa777.com/', icon: '🏙️' },
  { name: 'Orion Star', code: 'os', url: 'http://web.orionstars.vip/play/orionstars/', icon: '⭐' },
  { name: 'Milky way app', code: 'mw', url: 'https://milkywayapp.xyz/', icon: '🌌' },
  { name: 'Fire Kirin', code: 'fk', url: 'https://firekirin.com/', icon: '🔥' },
  { name: 'Mr All In One', code: 'mr', url: 'https://www.mrallinone777.com/m', icon: '🎯' },
  { name: 'Cash Machine', code: 'cm', url: 'https://www.cashmachine777.com/m', icon: '💰' },
  { name: 'High Roller', code: 'hr', url: 'https://www.highrollerdownload.com/', icon: '🎪' },
  { name: 'Vb Link', code: 'vb', url: 'https://www.vblink777.club', icon: '🔗' },
  { name: 'Game Room', code: 'gr', url: 'https://www.gameroom777.com/m', icon: '🎮' }
]

function DownloadGamesSection() {
  const handleDownload = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  const GAMES = useMemo(() => 
    GAMES_DATA.map(game => ({
      ...game,
      iconImage: getGameIconImage(game.name, game.code)
    })).filter((game): game is Game & { iconImage: string } => game.iconImage !== undefined),
    []
  )

  return (
    <section
      id="download-games"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center font-cursive px-2">
            Arcade Games
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {GAMES.map((game) => (
              <div
                key={game.code}
                className="bg-gradient-to-br from-[#19110a] to-[#0f0a06] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-[rgba(255,210,74,0.35)] shadow-lg hover:shadow-[0_0_30px_rgba(255,179,0,0.25)] transition-all duration-500 transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl pointer-events-none"></div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 sm:mb-3 md:mb-4 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-black bg-gradient-to-br from-yellow-400 to-orange-300 shadow-lg overflow-hidden">
                  {game.iconImage && (
                    <Image
                      src={game.iconImage}
                      alt={game.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      quality={85}
                    />
                  )}
                </div>
                <div className="text-white text-xs sm:text-sm md:text-base font-bold mb-1 sm:mb-2 font-cursive text-center leading-tight px-1">
                  {game.code.toUpperCase()}
                </div>
                <button
                  onClick={() => handleDownload(game.url)}
                  className="mt-auto px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 gold-gradient-bg text-black text-xs sm:text-sm md:text-base font-bold rounded-lg shadow hover:shadow-[0_0_18px_rgba(255,179,0,0.35)] transform hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation w-full font-cursive min-h-[44px] flex items-center justify-center"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(DownloadGamesSection)
