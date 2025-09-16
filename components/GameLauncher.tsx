'use client';

import { useState, useEffect } from 'react';
import RockTossGame from './games/RockTossGame';
import WaterDropGame from './games/WaterDropGame';
import WheelSpinGame from './games/WheelSpinGame';
import { GAMES } from '@/lib/constants';

type GameType = 'rock-toss' | 'water-drop' | 'wheel-spin' | null;

interface GameResult {
    game: string;
    score: number;
    additionalData: Record<string, unknown>;
    timestamp: number;
}

export default function GameLauncher() {
    const [currentGame, setCurrentGame] = useState<GameType>(null);
    const [gameResults, setGameResults] = useState<GameResult[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [userPoints, setUserPoints] = useState(100);
    const [gameCost] = useState(10); // Cost to play each game

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleGameStart = (gameId: string) => {
        if (userPoints >= gameCost) {
            setUserPoints(prev => prev - gameCost);
            setCurrentGame(gameId as GameType);
        } else {
            alert('Not enough points! You need 10 points to play.');
        }
    };

    const handleGameEnd = (gameId: string, score: number, additionalData: Record<string, unknown>) => {
        const result: GameResult = {
            game: gameId,
            score,
            additionalData,
            timestamp: Date.now()
        };

        setGameResults(prev => [...prev, result]);
        setUserPoints(prev => prev + score); // Add score as points
        setCurrentGame(null);
    };

    const handleBackToMenu = () => {
        setCurrentGame(null);
    };

    const getGameStats = (gameId: string) => {
        const filteredResults = gameResults.filter(r => r.game === gameId);
        if (filteredResults.length === 0) return null;

        const bestScore = Math.max(...filteredResults.map(r => r.score));
        const totalGames = filteredResults.length;
        const averageScore = filteredResults.reduce((sum, r) => sum + r.score, 0) / totalGames;

        return { bestScore, totalGames, averageScore };
    };

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (currentGame === 'rock-toss') {
        return (
            <RockTossGame
                onGameEnd={(score, jackpots) => handleGameEnd('rock-toss', score, { jackpots })}
                onBack={handleBackToMenu}
            />
        );
    }

    if (currentGame === 'water-drop') {
        return (
            <WaterDropGame
                onGameEnd={(score, treasures) => handleGameEnd('water-drop', score, { treasures })}
                onBack={handleBackToMenu}
            />
        );
    }

    if (currentGame === 'wheel-spin') {
        return (
            <WheelSpinGame
                onGameEnd={(score, jackpots) => handleGameEnd('wheel-spin', score, { jackpots })}
                onBack={handleBackToMenu}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Mariska Games
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-4">
                        Choose your game and start playing!
                    </p>

                    {/* Points Display */}
                    <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">💰</span>
                            <span className="text-white font-bold text-xl">{userPoints}</span>
                            <span className="text-gray-300">Points</span>
                        </div>
                        <div className="w-px h-6 bg-white/20"></div>
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">🎮</span>
                            <span className="text-white font-semibold">{gameCost}</span>
                            <span className="text-gray-300 text-sm">per game</span>
                        </div>
                    </div>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {GAMES.map((game) => {
                        const stats = getGameStats(game.id);

                        return (
                            <div
                                key={game.id}
                                className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                            >

                                {/* Badges */}
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    {game.isNew && (
                                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                            NEW
                                        </span>
                                    )}
                                    {game.isFeatured && (
                                        <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                                            FEATURED
                                        </span>
                                    )}
                                </div>

                                {/* Game Icon */}
                                <div className="text-center mb-6">
                                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${game.gradient} text-4xl mb-4`}>
                                        {game.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{game.name}</h3>
                                    <p className="text-gray-400">{game.shortDescription}</p>
                                </div>

                                {/* Game Stats */}
                                {stats && (
                                    <div className="mb-6 bg-gray-800/50 rounded-lg p-4">
                                        <h4 className="text-white font-semibold mb-3">Your Stats:</h4>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-yellow-400">{stats.bestScore}</div>
                                                <div className="text-gray-400">Best Score</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-blue-400">{stats.totalGames}</div>
                                                <div className="text-gray-400">Games Played</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Play Button */}
                                <button
                                    onClick={() => handleGameStart(game.id)}
                                    disabled={userPoints < gameCost}
                                    className={`w-full py-3 bg-gradient-to-r ${game.gradient} text-white font-bold rounded-lg transition-all duration-300 ${userPoints >= gameCost
                                        ? 'hover:opacity-80 hover:scale-105'
                                        : 'opacity-50 cursor-not-allowed'
                                        }`}
                                    style={{ zIndex: 10, position: 'relative' }}
                                >
                                    {userPoints >= gameCost ? (
                                        <>Play {game.name} (-{gameCost} pts)</>
                                    ) : (
                                        <>Need {gameCost - userPoints} more points</>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Games */}
                {gameResults.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Recent Games</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {gameResults.slice(-6).reverse().map((result, index) => {
                                const game = GAMES.find(g => g.id === result.game);
                                return (
                                    <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="text-2xl">{game?.icon}</span>
                                            <div>
                                                <div className="text-white font-semibold">{game?.name}</div>
                                                <div className="text-gray-400 text-sm">
                                                    {new Date(result.timestamp).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-yellow-400 font-bold text-lg">
                                            Score: {result.score}
                                        </div>
                                        {result.additionalData && (
                                            <div className="text-gray-400 text-sm mt-1">
                                                {result.game === 'rock-toss' && `Jackpots: ${result.additionalData.jackpots as number}`}
                                                {result.game === 'water-drop' && `Treasures: ${result.additionalData.treasures as number}`}
                                                {result.game === 'wheel-spin' && `Jackpots: ${result.additionalData.jackpots as number}`}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-3 bg-gray-600 text-white font-bold rounded-full hover:bg-gray-700 transition-all duration-300"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
