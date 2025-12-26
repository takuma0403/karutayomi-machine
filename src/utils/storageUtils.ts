import type { GameState } from '../types';

const STORAGE_KEY = 'karutayomi-game-state';

/**
 * ゲーム状態をLocalStorageに保存
 * @param state 保存するゲーム状態
 */
export const saveGameState = (state: GameState): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Failed to save game state:', error);
    }
};

/**
 * LocalStorageからゲーム状態を読み込み
 * @returns 保存されたゲーム状態、または null
 */
export const loadGameState = (): GameState | null => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (error) {
        console.error('Failed to load game state:', error);
        return null;
    }
};

/**
 * LocalStorageからゲーム状態を削除
 */
export const clearGameState = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear game state:', error);
    }
};
