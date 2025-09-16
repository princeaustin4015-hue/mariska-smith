
'use client';

import { useRouter } from 'next/navigation';

interface GameCard {
    title: string;
    description: string;
    icon: string;
    details: string;
    path: string;
}

export default function GamesSection() {
    const router = useRouter();
    
    const GAME_CARDS: GameCard[] = [
        {
            title: 'Irish Luck Slot',
            description: 'Try your luck with this enchanting Irish-themed slot machine!',
            icon: '🍀',
            details: 'Slot Machine | 1 Player | Endless Fun',
            path: '/games/irish-luck'
        }
    ];

    return (
        <section
            id="games"
            className="py-20 relative overflow-hidden"
            style={{
                backgroundImage: "url('/game%20section%20bg.jpg')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.55)]"></div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24" style={{background:'linear-gradient(180deg, #0b0604 0%, rgba(11,6,4,0.7) 40%, rgba(11,6,4,0) 100%)'}}></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24" style={{background:'linear-gradient(0deg, #000 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)'}}></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 roomy-copy">
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-cursive">
                        Game Tiles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {GAME_CARDS.map((card, idx) => (
                            <div
                                key={idx}
                                className="relative bg-gradient-to-br from-[#19110a] to-[#0f0a06] rounded-2xl p-8 border border-[rgba(255,210,74,0.25)] shadow-lg hover:shadow-[0_0_30px_rgba(255,179,0,0.25)] transition-all duration-500 transform hover:scale-105 flex flex-col items-center text-center overflow-hidden"
                            >
                                <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center text-4xl font-bold text-black bg-gradient-to-br from-yellow-400 to-orange-300 shadow-lg">
                                    <span className="select-none">{card.icon}</span>
                                </div>
                                <div className="text-white text-2xl font-semibold mb-2 font-cursive">{card.title}</div>
                                <div className="text-gray-400 text-base mb-4">{card.description}</div>
                                <div className="text-yellow-300 text-sm font-medium mb-4">{card.details}</div>
                                <button
                                    onClick={() => router.push(card.path)}
                                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-2 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/30"
                                >
                                    Play Now 🎰
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

