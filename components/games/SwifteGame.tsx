'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePerformance } from '@/hooks/usePerformance';

interface SwifteGameProps {
    onGameEnd: (score: number, time: number) => void;
    onBack: () => void;
}

export default function SwifteGame({ onGameEnd, onBack }: SwifteGameProps) {
    const [gameState, setGameState] = useState<'waiting' | 'playing' | 'ended'>('waiting');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; size: number; color: string; active: boolean }>>([]);
    const [gameStartTime, setGameStartTime] = useState<number>(0);
    const [reactionTime, setReactionTime] = useState<number>(0);
    const [targetSpawnTime, setTargetSpawnTime] = useState<number>(0);
    const { isMobile } = usePerformance();

    const colors = useMemo(() => ['#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'], []);

    const spawnTarget = useCallback(() => {
        const newTarget = {
            id: Date.now(),
            x: Math.random() * (isMobile ? 80 : 85),
            y: Math.random() * (isMobile ? 70 : 75),
            size: Math.random() * 30 + 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            active: true
        };

        setTargets(prev => [...prev, newTarget]);
        setTargetSpawnTime(Date.now());
    }, [colors, isMobile]);

    const handleTargetClick = useCallback((targetId: number) => {
        const target = targets.find(t => t.id === targetId);
        if (!target || !target.active) return;

        const reaction = Date.now() - targetSpawnTime;
        setReactionTime(reaction);

        setTargets(prev => prev.map(t =>
            t.id === targetId ? { ...t, active: false } : t
        ));

        setScore(prev => {
            const points = Math.max(1, Math.floor(1000 / reaction));
            return prev + points;
        });

        // Spawn new target after a short delay
        setTimeout(() => {
            if (gameState === 'playing') {
                spawnTarget();
            }
        }, 200);
    }, [targets, targetSpawnTime, gameState, spawnTarget]);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(30);
        setGameStartTime(Date.now());
        spawnTarget();
    };

    const endGame = useCallback(() => {
        setGameState('ended');
        const totalTime = Date.now() - gameStartTime;
        onGameEnd(score, totalTime);
    }, [score, gameStartTime, onGameEnd]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (gameState === 'playing' && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        endGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [gameState, timeLeft, endGame]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Game Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={onBack}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            ← Back
                        </button>
                        <h1 className="text-4xl font-bold text-white flex items-center">
                            ⚡ Swifte
                        </h1>
                        <div className="w-20"></div>
                    </div>

                    {gameState === 'waiting' && (
                        <div className="text-center">
                            <p className="text-xl text-gray-300 mb-6">
                                Click the targets as fast as you can! You have 30 seconds.
                            </p>
                            <button
                                onClick={startGame}
                                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full text-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
                            >
                                Start Game
                            </button>
                        </div>
                    )}

                    {gameState === 'playing' && (
                        <div className="flex justify-center items-center space-x-8 text-white">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{score}</div>
                                <div className="text-sm text-gray-300">Score</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">{timeLeft}</div>
                                <div className="text-sm text-gray-300">Time</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">{reactionTime}ms</div>
                                <div className="text-sm text-gray-300">Reaction</div>
                            </div>
                        </div>
                    )}

                    {gameState === 'ended' && (
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                                <div className="text-4xl font-bold text-yellow-400 mb-2">{score}</div>
                                <div className="text-xl text-gray-300 mb-4">Final Score</div>
                                <div className="text-lg text-gray-400 mb-6">
                                    Average Reaction Time: {reactionTime}ms
                                </div>
                                <button
                                    onClick={startGame}
                                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 mr-4"
                                >
                                    Play Again
                                </button>
                                <button
                                    onClick={onBack}
                                    className="px-6 py-3 bg-gray-600 text-white font-bold rounded-full hover:bg-gray-700 transition-all duration-300"
                                >
                                    Back to Games
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Game Area */}
                {gameState === 'playing' && (
                    <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden" style={{ height: '60vh', minHeight: '400px' }}>
                        {targets.map(target => (
                            <button
                                key={target.id}
                                onClick={() => handleTargetClick(target.id)}
                                className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${target.active
                                    ? 'hover:scale-110 cursor-pointer'
                                    : 'opacity-0 scale-0'
                                    }`}
                                style={{
                                    left: `${target.x}%`,
                                    top: `${target.y}%`,
                                    width: `${target.size}px`,
                                    height: `${target.size}px`,
                                    backgroundColor: target.color,
                                    boxShadow: target.active ? `0 0 20px ${target.color}` : 'none'
                                }}
                                disabled={!target.active}
                            >
                                <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">⚡</span>
                                </div>
                            </button>
                        ))}

                        {/* Instructions */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white/70 text-sm">
                            Click the lightning targets as fast as you can!
                        </div>
                    </div>
                )}

                {/* Game Instructions */}
                {gameState === 'waiting' && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">How to Play</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
                            <div className="text-center">
                                <div className="text-4xl mb-2">⚡</div>
                                <h4 className="font-semibold text-white mb-2">Fast Reflexes</h4>
                                <p>Click the lightning targets as quickly as possible</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-2">🎯</div>
                                <h4 className="font-semibold text-white mb-2">Precision</h4>
                                <p>Faster clicks earn more points</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-2">⏱️</div>
                                <h4 className="font-semibold text-white mb-2">Time Limit</h4>
                                <p>You have 30 seconds to score as much as possible</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
