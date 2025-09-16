'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import styles from './IrishLuckGame.module.css';

export default function IrishLuckGame() {
    // Sound refs
    const spinSoundRef = useRef<HTMLAudioElement | null>(null);
    const winSoundRef = useRef<HTMLAudioElement | null>(null);
    const [balance, setBalance] = useState(100.00);
    const [currentBet, setCurrentBet] = useState(0.20);
    const [isSpinning, setIsSpinning] = useState(false);
    const [freeSpins, setFreeSpins] = useState(0);
    const [currentMultiplier, setCurrentMultiplier] = useState(1);
    const [reels, setReels] = useState<string[]>(Array(15).fill('🍀'));
    const [winAmount, setWinAmount] = useState(0);
    const [winningPositions, setWinningPositions] = useState<number[]>([]);
    const [notification, setNotification] = useState<string | null>(null);

    const symbols = ['🍀', '🎩', '🌈', '🍯', '💎', '🔥', '💰', '⭐', '🎵', '💖'];

    const createReels = useCallback(() => {
        const newReels = Array(15).fill(null).map(() => 
            symbols[Math.floor(Math.random() * symbols.length)]
        );
        setReels(newReels);
    }, [symbols]);

    useEffect(() => {
        createReels();
    }, [createReels]);

    const increaseBet = () => {
        if (currentBet < 10.00) {
            setCurrentBet(prev => +(prev + 0.20).toFixed(2));
        }
    };

    const decreaseBet = () => {
        if (currentBet > 0.20) {
            setCurrentBet(prev => +(prev - 0.20).toFixed(2));
        }
    };

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 2000);
    };

    const checkWins = (symbols: string[]) => {
        let totalWin = 0;
        let positions: number[] = [];
        // Check horizontal lines
        for (let row = 0; row < 3; row++) {
            const start = row * 5;
            if (symbols[start] === symbols[start + 1] && symbols[start + 1] === symbols[start + 2]) {
                totalWin += currentBet * 2;
                positions.push(start, start + 1, start + 2);
                if (symbols[start + 2] === symbols[start + 3]) {
                    totalWin += currentBet;
                    positions.push(start + 3);
                }
                if (symbols[start + 3] === symbols[start + 4]) {
                    totalWin += currentBet;
                    positions.push(start + 4);
                }
            }
        }
        // Check diagonal wins
        if (symbols[0] === symbols[6] && symbols[6] === symbols[12]) {
            totalWin += currentBet * 3;
            positions.push(0, 6, 12);
        }
        if (symbols[2] === symbols[6] && symbols[6] === symbols[10]) {
            totalWin += currentBet * 3;
            positions.push(2, 6, 10);
        }
        return { totalWin, positions: [...new Set(positions)] };
    };

    const spin = async () => {
        if (isSpinning) return;
        if (balance < currentBet && freeSpins === 0) {
            showNotification('Insufficient balance!');
            return;
        }
        setIsSpinning(true);
        setWinAmount(0);
        setWinningPositions([]);
        // Play spin sound
        if (spinSoundRef.current) {
            spinSoundRef.current.currentTime = 0;
            spinSoundRef.current.play();
        }
        // Deduct bet if not free spin
        if (freeSpins === 0) {
            setBalance(prev => +(prev - currentBet).toFixed(2));
        } else {
            setFreeSpins(prev => prev - 1);
        }
        // Simulate spinning animation
        const spinDuration = 2000;
        const intervalTime = 100;
        const intervals = spinDuration / intervalTime;
        for (let i = 0; i < intervals; i++) {
            await new Promise(resolve => setTimeout(resolve, intervalTime));
            createReels();
        }
        // Generate final result
        const newReels = Array(15).fill(null).map(() => 
            symbols[Math.floor(Math.random() * symbols.length)]
        );
        const { totalWin, positions } = checkWins(newReels);
        setReels(newReels);
        setWinningPositions(positions);
        if (totalWin > 0) {
            const finalWin = totalWin * currentMultiplier;
            setWinAmount(finalWin);
            setBalance(prev => +(prev + finalWin).toFixed(2));
            showNotification(`You won $${finalWin.toFixed(2)}!`);
            // Play win sound
            if (winSoundRef.current) {
                winSoundRef.current.currentTime = 0;
                winSoundRef.current.play();
            }
        }
        setIsSpinning(false);
    };

    return (
        <div className={styles['slot-machine']}>
            {/* Sound elements */}
            <audio ref={spinSoundRef} src="/spin.mp3" preload="auto" />
            <audio ref={winSoundRef} src="/win.mp3" preload="auto" />
            <div className={styles.header}>
                <div className={styles.logo}>
                    <div className={styles['home-icon']}>🍀</div>
                    <span>IRISH LUCK</span>
                </div>
                <div className={styles.jackpots}>
                    <div className={styles.jackpot + ' ' + styles.mini}>MINI: 25836.38</div>
                    <div className={styles.jackpot + ' ' + styles.mega}>MEGA: 244435.09</div>
                    <div className={styles.jackpot + ' ' + styles.midi}>MIDI: 244435.09</div>
                </div>
                <div className={styles.balance}>💰 {balance.toFixed(2)}</div>
            </div>
            <div className={styles['game-area']}>
                <div className={styles.character}>
                    <div className={styles.leprechaun}>🧙‍♂️</div>
                    <div className={styles.pot}>🍯</div>
                    <div className={styles['multiplier-x']}>x{currentMultiplier}</div>
                </div>
                <div className={styles['reels-container']}>
                    <div className={styles.reels}>
                        {reels.map((symbol, index) => (
                            <div
                                key={index}
                                className={
                                    styles.reel +
                                    (isSpinning ? ' ' + styles.spinning : '') +
                                    (winningPositions.includes(index) ? ' ' + styles.winning : '')
                                }
                            >
                                {symbol}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.controls}>
                <div className={styles['bet-controls']}>
                    <span className={styles['bet-label']}>Bet</span>
                    <button className={styles['bet-button']} onClick={decreaseBet} disabled={isSpinning}>-</button>
                    <div className={styles['bet-amount']}>{currentBet.toFixed(2)}</div>
                    <button className={styles['bet-button']} onClick={increaseBet} disabled={isSpinning}>+</button>
                </div>
                <div className={styles['win-display']}>
                    <span className={styles['win-label']}>WIN</span>
                    <div className={styles['win-amount']}>{winAmount.toFixed(2)}</div>
                </div>
                <button 
                    className={styles['spin-button']} 
                    onClick={spin}
                    disabled={isSpinning || (balance < currentBet && freeSpins === 0)}
                >
                    🔄
                </button>
            </div>
            {notification && (
                <div className={styles.notification}>{notification}</div>
            )}
        </div>
    );
}
