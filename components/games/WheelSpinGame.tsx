'use client';

import { useState, useCallback, useEffect } from 'react';

interface WheelSegment {
    id: string;
    label: string;
    value: number;
    color: string;
    probability: number;
    emoji: string;
}

interface WheelSpinGameProps {
    onGameEnd: (score: number, additionalData: Record<string, unknown>) => void;
    onBack: () => void;
}

const WHEEL_SEGMENTS: WheelSegment[] = [
    { id: 'jackpot', label: 'JACKPOT', value: 100, color: '#FFD700', probability: 5, emoji: '🎰' },
    { id: 'mega', label: 'MEGA WIN', value: 50, color: '#FF6B6B', probability: 10, emoji: '💎' },
    { id: 'big', label: 'BIG WIN', value: 25, color: '#4ECDC4', probability: 15, emoji: '💰' },
    { id: 'win', label: 'WIN', value: 15, color: '#45B7D1', probability: 20, emoji: '🎁' },
    { id: 'small', label: 'SMALL', value: 10, color: '#96CEB4', probability: 25, emoji: '🍀' },
    { id: 'tiny', label: 'TINY', value: 5, color: '#FFEAA7', probability: 25, emoji: '⭐' },
];

export default function WheelSpinGame({ onGameEnd, onBack }: WheelSpinGameProps) {
    const [gameState, setGameState] = useState<'waiting' | 'spinning' | 'ended'>('waiting');
    const [score, setScore] = useState(0);
    const [spins, setSpins] = useState(0);
    const [maxSpins] = useState(5);
    const [jackpots, setJackpots] = useState(0);
    const [wheelRotation, setWheelRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [lastResult, setLastResult] = useState<WheelSegment | null>(null);
    const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; life: number; color: string }>>([]);
    const [wheelGlow, setWheelGlow] = useState(false);
    const [scorePopups, setScorePopups] = useState<Array<{ id: number; x: number; y: number; value: number; opacity: number }>>([]);

    const getRandomSegment = (): WheelSegment => {
        const random = Math.random() * 100;
        let cumulativeProbability = 0;

        for (const segment of WHEEL_SEGMENTS) {
            cumulativeProbability += segment.probability;
            if (random <= cumulativeProbability) {
                return segment;
            }
        }

        return WHEEL_SEGMENTS[WHEEL_SEGMENTS.length - 1];
    };

    const createScorePopup = (x: number, y: number, value: number) => {
        const newPopup = {
            id: Date.now(),
            x,
            y,
            value,
            opacity: 1,
        };
        setScorePopups(prev => [...prev, newPopup]);

        // Animate score popup
        const animatePopup = () => {
            setScorePopups(prev => prev.map(popup =>
                popup.id === newPopup.id
                    ? { ...popup, y: popup.y - 1, opacity: popup.opacity - 0.02 }
                    : popup
            ).filter(popup => popup.opacity > 0));
        };

        const popupInterval = setInterval(animatePopup, 16);
        setTimeout(() => clearInterval(popupInterval), 1500);
    };

    const createSparkles = (x: number, y: number, color: string) => {
        const newSparkles = Array.from({ length: 25 }, (_, i) => ({
            id: Date.now() + i,
            x,
            y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 1,
            color,
        }));
        setSparkles(prev => [...prev, ...newSparkles]);
    };

    const updateSparkles = useCallback(() => {
        setSparkles(prev => prev.map(sparkle => ({
            ...sparkle,
            x: sparkle.x + sparkle.vx,
            y: sparkle.y + sparkle.vy,
            vy: sparkle.vy + 0.2, // gravity
            life: sparkle.life - 0.02,
        })).filter(sparkle => sparkle.life > 0));
    }, []);

    const spinWheel = () => {
        if (gameState !== 'waiting' || isSpinning) return;

        setGameState('spinning');
        setIsSpinning(true);
        setSpins(prev => prev + 1);
        setWheelGlow(true);

        // Get random result
        const result = getRandomSegment();

        // Calculate rotation (multiple full rotations + segment position)
        const segmentAngle = 360 / WHEEL_SEGMENTS.length;
        const segmentIndex = WHEEL_SEGMENTS.findIndex(s => s.id === result.id);
        const targetAngle = segmentIndex * segmentAngle;
        const fullRotations = 5 + Math.random() * 3; // 5-8 full rotations
        const finalRotation = wheelRotation + (fullRotations * 360) + (360 - targetAngle);

        // Animate wheel spin with easing
        let startTime: number;
        const duration = 3000; // 3 seconds

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentRotation = wheelRotation + (finalRotation - wheelRotation) * easeOut;

            setWheelRotation(currentRotation);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete
                setIsSpinning(false);
                setGameState('ended');
                setLastResult(result);
                setScore(prev => prev + result.value);

                if (result.id === 'jackpot') {
                    setJackpots(prev => prev + 1);
                }

                // Create effects
                createSparkles(50, 50, result.color);
                createScorePopup(50, 30, result.value);

                // Reset glow
                setTimeout(() => setWheelGlow(false), 1000);
            }
        };

        requestAnimationFrame(animate);
    };

    const startGame = () => {
        setGameState('waiting');
        setScore(0);
        setSpins(0);
        setJackpots(0);
        setWheelRotation(0);
        setLastResult(null);
        setSparkles([]);
        setWheelGlow(false);
    };

    const endGame = () => {
        onGameEnd(score, { jackpots });
    };

    // Update sparkles
    useEffect(() => {
        if (sparkles.length > 0) {
            const interval = setInterval(updateSparkles, 16);
            return () => clearInterval(interval);
        }
    }, [sparkles.length, updateSparkles]);

    // Auto-end game when max spins reached
    useEffect(() => {
        if (spins >= maxSpins && gameState === 'ended') {
            const timer = setTimeout(endGame, 2000);
            return () => clearTimeout(timer);
        }
    }, [spins, maxSpins, gameState, endGame]);

    if (gameState === 'waiting' && spins === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                                🎡 Wheel of Fortune
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-6">
                            Spin the wheel and let luck determine your fate! Each spin could land on amazing rewards.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
                        <div className="text-center">
                            <div className="text-6xl mb-6">🎡</div>
                            <h2 className="text-2xl font-bold text-white mb-4">Ready to Spin?</h2>
                            <p className="text-gray-400 mb-8">
                                You have {maxSpins} spins to win as much as possible. Good luck!
                            </p>
                            <button
                                onClick={startGame}
                                className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-4 px-8 rounded-lg hover:opacity-80 transition-opacity duration-300 text-xl"
                            >
                                Start Spinning! 🎡
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={onBack}
                        className="mt-6 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                        ← Back to Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                            🎡 Wheel of Fortune
                        </span>
                    </h1>
                    <div className="flex justify-center space-x-8 text-white">
                        <div className="text-center">
                            <div className="text-2xl font-bold">💰 {score}</div>
                            <div className="text-sm text-gray-400">Score</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">🎰 {jackpots}</div>
                            <div className="text-sm text-gray-400">Jackpots</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">🎡 {spins}/{maxSpins}</div>
                            <div className="text-sm text-gray-400">Spins</div>
                        </div>
                    </div>
                </div>

                {/* Game Area */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        {/* Wheel */}
                        <div className="relative mb-8 lg:mb-0">
                            <div className={`relative w-80 h-80 transition-all duration-1000 ${wheelGlow ? 'drop-shadow-2xl' : ''}`}>
                                {/* Wheel Glow Effect */}
                                {wheelGlow && (
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-30 animate-wheel-glow blur-xl"></div>
                                )}

                                {/* Wheel */}
                                <div
                                    className="relative w-full h-full rounded-full border-8 border-white/30 overflow-hidden transition-transform duration-100"
                                    style={{
                                        transform: `rotate(${wheelRotation}deg)`,
                                        filter: wheelGlow ? 'brightness(1.2)' : 'none',
                                    }}
                                >
                                    {WHEEL_SEGMENTS.map((segment, index) => {
                                        const angle = (360 / WHEEL_SEGMENTS.length) * index;
                                        return (
                                            <div
                                                key={segment.id}
                                                className="absolute w-full h-full"
                                                style={{
                                                    transform: `rotate(${angle}deg)`,
                                                    transformOrigin: 'center',
                                                }}
                                            >
                                                <div
                                                    className="absolute top-0 left-1/2 w-0 h-0 border-l-[160px] border-r-[160px] border-b-[160px] border-l-transparent border-r-transparent"
                                                    style={{
                                                        borderBottomColor: segment.color,
                                                        transform: 'translateX(-50%)',
                                                    }}
                                                ></div>
                                                <div
                                                    className="absolute top-20 left-1/2 transform -translate-x-1/2 -rotate-90 text-white font-bold text-sm"
                                                    style={{ color: segment.color === '#FFD700' ? '#000' : '#fff' }}
                                                >
                                                    {segment.emoji}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Center Circle */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-white flex items-center justify-center text-2xl">
                                    🎯
                                </div>

                                {/* Pointer */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
                            </div>
                        </div>

                        {/* Controls and Info */}
                        <div className="text-center lg:text-left">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-4">Wheel Segments</h3>
                                <div className="space-y-2">
                                    {WHEEL_SEGMENTS.map((segment) => (
                                        <div key={segment.id} className="flex items-center space-x-3 text-white">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: segment.color }}
                                            ></div>
                                            <span className="text-sm">{segment.emoji} {segment.label}: {segment.value} points</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {gameState === 'waiting' && (
                                <button
                                    onClick={spinWheel}
                                    disabled={spins >= maxSpins}
                                    className={`w-full py-4 px-8 rounded-lg font-bold text-xl transition-all duration-300 ${spins >= maxSpins
                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-80 hover:scale-105'
                                        }`}
                                >
                                    {spins >= maxSpins ? 'Game Complete!' : '🎡 SPIN WHEEL!'}
                                </button>
                            )}

                            {gameState === 'spinning' && (
                                <div className="text-center">
                                    <div className="text-4xl mb-4 animate-spin">🎡</div>
                                    <p className="text-white text-xl font-bold">Spinning...</p>
                                </div>
                            )}

                            {gameState === 'ended' && lastResult && (
                                <div className="text-center">
                                    <div className="text-6xl mb-4">{lastResult.emoji}</div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{lastResult.label}!</h3>
                                    <p className="text-xl text-gray-300 mb-4">+{lastResult.value} points</p>
                                    {spins < maxSpins ? (
                                        <button
                                            onClick={() => setGameState('waiting')}
                                            className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-80 transition-opacity duration-300"
                                        >
                                            Spin Again! 🎡
                                        </button>
                                    ) : (
                                        <button
                                            onClick={endGame}
                                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-80 transition-opacity duration-300"
                                        >
                                            Finish Game! 🏆
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Score Popups */}
                {scorePopups.map((popup) => (
                    <div
                        key={popup.id}
                        className="absolute text-3xl font-bold text-yellow-400 animate-score-popup pointer-events-none"
                        style={{
                            left: `${popup.x}%`,
                            top: `${popup.y}%`,
                            transform: 'translate(-50%, -50%)',
                            opacity: popup.opacity,
                            textShadow: '0 0 15px rgba(255, 215, 0, 0.9)',
                        }}
                    >
                        +{popup.value}
                    </div>
                ))}

                {/* Sparkle Effects */}
                {sparkles.map((sparkle) => (
                    <div
                        key={sparkle.id}
                        className="absolute w-2 h-2 rounded-full pointer-events-none animate-sparkle-twinkle"
                        style={{
                            left: `${sparkle.x}%`,
                            top: `${sparkle.y}%`,
                            backgroundColor: sparkle.color,
                            opacity: sparkle.life,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: `0 0 20px ${sparkle.color}, 0 0 40px ${sparkle.color}`,
                        }}
                    ></div>
                ))}

                <button
                    onClick={onBack}
                    className="mt-6 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                >
                    ← Back to Menu
                </button>
            </div>
        </div>
    );
}
