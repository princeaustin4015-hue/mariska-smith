'use client';

export default function Hero() {

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: "url('/cover%20page.jpg')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Dark vignette + warm gold overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_55%,rgba(0,0,0,0.85)_100%)]"></div>
            <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(255,179,0,0.06) 0%, rgba(0,0,0,0.4) 60%)'}}></div>
            {/* Edge fades to blend with surrounding background */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24" style={{background:'linear-gradient(0deg, #0b0604 0%, rgba(11,6,4,0.6) 50%, rgba(11,6,4,0) 100%)'}}></div>
            

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="/games"
                        className="group relative px-8 py-4 gold-gradient-bg text-black font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(255,179,0,0.45)] inline-block"
                    >
                        <span className="relative z-10">Start Playing Now</span>
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{boxShadow:'0 0 30px rgba(255,179,0,0.45)'}}></div>
                    </a>
                    <button className="px-8 py-4 border-2 border-[rgba(255,210,74,0.5)] text-white font-bold rounded-full text-lg hover:bg-[rgba(0,0,0,0.4)] hover:border-[rgba(255,210,74,0.8)] transition-all duration-300 backdrop-blur-sm">
                        Watch Demo
                    </button>
                </div>
            </div>

            
        </section>
    );
}
