'use client';




export default function GameLauncher() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl text-center">
                <h1 className="text-5xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Mariska Games
                    </span>
                </h1>
                <p className="text-2xl text-gray-300 mb-8">
                    No games are currently available.<br />
                    Please check back soon!
                </p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-3 bg-gray-600 text-white font-bold rounded-full hover:bg-gray-700 transition-all duration-300"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}
