export default function DownloadGamesSection() {
    return (
        <section
            id="download-games"
            className="py-20 relative overflow-hidden"
            style={{
                backgroundImage: "url('/feature%20section%20photo.jpg')",
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
                        Download Games
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {[...Array(15)].map((_, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-br from-[#19110a] to-[#0f0a06] rounded-2xl p-8 border border-[rgba(255,210,74,0.35)] shadow-lg hover:shadow-[0_0_30px_rgba(255,179,0,0.25)] transition-all duration-500 transform hover:scale-105 flex flex-col items-center justify-center min-h-[180px] relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                                <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center text-3xl font-bold text-black bg-gradient-to-br from-yellow-400 to-orange-300 shadow-lg">
                                    <span className="select-none">🎮</span>
                                </div>
                                <div className="text-white text-xl font-semibold mb-2 font-cursive">Game {idx + 1}</div>
                                <div className="text-gray-400 text-sm mb-4 text-center">Coming soon</div>
                                <button
                                    className="mt-auto px-6 py-2 gold-gradient-bg text-black font-bold rounded-lg shadow hover:shadow-[0_0_18px_rgba(255,179,0,0.35)] transform hover:scale-105 transition-all duration-300"
                                    disabled
                                >
                                    Download
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
