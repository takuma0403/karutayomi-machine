import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState, VoiceType, Poem } from '../types';
import { generateRandomOrder } from '../utils/audioUtils';
import { saveGameState, loadGameState, clearGameState } from '../utils/storageUtils';
import poemsData from '../data/hyakunin-isshu.json';

const poems = poemsData as Poem[];

const initialGameState: GameState = {
    status: 'idle',
    currentIndex: 0,
    playOrder: [],
    playMode: 'auto',
    voiceType: 'a',
    waitTime: 3,
    lastPlayedPoem: null,
};

export const useGameState = () => {
    const [gameState, setGameState] = useState<GameState>(initialGameState);
    const [isWaiting, setIsWaiting] = useState(false);
    const waitTimerRef = useRef<number | null>(null);

    // 初回マウント時にLocalStorageから状態を復元
    useEffect(() => {
        const savedState = loadGameState();
        if (savedState) {
            setGameState(savedState);
        }
    }, []);

    // ゲーム状態が変更されたらLocalStorageに保存
    useEffect(() => {
        if (gameState.status !== 'idle' || gameState.playOrder.length > 0) {
            saveGameState(gameState);
        }
    }, [gameState]);

    // ゲーム開始
    const startGame = useCallback(() => {
        const playOrder = generateRandomOrder();
        setGameState({
            ...gameState,
            status: 'playing',
            currentIndex: 0,
            playOrder,
            lastPlayedPoem: null,
        });
    }, [gameState]);

    // ゲーム終了
    const endGame = useCallback(() => {
        if (waitTimerRef.current) {
            clearTimeout(waitTimerRef.current);
            waitTimerRef.current = null;
        }
        setIsWaiting(false);
        setGameState(initialGameState);
        clearGameState();
    }, []);

    // 一時停止
    const pauseGame = useCallback(() => {
        if (waitTimerRef.current) {
            clearTimeout(waitTimerRef.current);
            waitTimerRef.current = null;
        }
        setIsWaiting(false);
        setGameState(prev => ({ ...prev, status: 'paused' }));
    }, []);

    // 再開
    const resumeGame = useCallback(() => {
        setGameState(prev => ({ ...prev, status: 'playing' }));
    }, []);

    // 次の歌へスキップ
    const skipToNext = useCallback(() => {
        if (waitTimerRef.current) {
            clearTimeout(waitTimerRef.current);
            waitTimerRef.current = null;
        }
        setIsWaiting(false);

        setGameState(prev => {
            const nextIndex = prev.currentIndex + 1;
            if (nextIndex >= prev.playOrder.length) {
                return { ...prev, status: 'finished' };
            }
            return {
                ...prev,
                currentIndex: nextIndex,
                status: 'playing',
                lastPlayedPoem: null,
            };
        });
    }, []);

    // 音声再生完了時の処理
    const onAudioEnded = useCallback(() => {
        setGameState(prev => {
            const currentPoemId = prev.playOrder[prev.currentIndex];
            const currentPoem = poems.find(p => p.id === currentPoemId) || null;

            return {
                ...prev,
                status: 'waiting',
                lastPlayedPoem: currentPoem,
            };
        });

        setIsWaiting(true);

        // 待機時間後の処理
        waitTimerRef.current = window.setTimeout(() => {
            setIsWaiting(false);

            setGameState(prev => {
                // マニュアルモードの場合は待機状態を維持
                if (prev.playMode === 'manual') {
                    return prev;
                }

                // 自動モードの場合は次の歌へ進む
                const nextIndex = prev.currentIndex + 1;
                if (nextIndex >= prev.playOrder.length) {
                    return { ...prev, status: 'finished' };
                }
                return {
                    ...prev,
                    currentIndex: nextIndex,
                    status: 'playing',
                    lastPlayedPoem: null,
                };
            });
        }, gameState.waitTime * 1000);
    }, [gameState.waitTime]);

    // 再生モード切り替え
    const togglePlayMode = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            playMode: prev.playMode === 'auto' ? 'manual' : 'auto',
        }));
    }, []);

    // 音声タイプ切り替え
    const setVoiceType = useCallback((voiceType: VoiceType) => {
        setGameState(prev => ({ ...prev, voiceType }));
    }, []);

    // 待機時間設定
    const setWaitTime = useCallback((waitTime: number) => {
        setGameState(prev => ({ ...prev, waitTime }));
    }, []);

    // 現在の歌を取得
    const getCurrentPoem = useCallback((): Poem | null => {
        if (gameState.playOrder.length === 0 || gameState.currentIndex >= gameState.playOrder.length) {
            return null;
        }
        const poemId = gameState.playOrder[gameState.currentIndex];
        return poems.find(p => p.id === poemId) || null;
    }, [gameState.playOrder, gameState.currentIndex]);

    // クリーンアップ
    useEffect(() => {
        return () => {
            if (waitTimerRef.current) {
                clearTimeout(waitTimerRef.current);
            }
        };
    }, []);

    return {
        gameState,
        isWaiting,
        startGame,
        endGame,
        pauseGame,
        resumeGame,
        skipToNext,
        onAudioEnded,
        togglePlayMode,
        setVoiceType,
        setWaitTime,
        getCurrentPoem,
    };
};
