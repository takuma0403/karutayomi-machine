import type { VoiceType } from '../types';

/**
 * 音声ファイルのパスを生成
 * @param id 歌番号 (1-100)
 * @param voiceType 音声タイプ ('a' = 大人, 'b' = 子供)
 * @returns 音声ファイルのパス
 */
export const getAudioPath = (id: number, voiceType: VoiceType): string => {
    const paddedId = id.toString().padStart(3, '0');
    // publicフォルダ内のファイルは / から始まる絶対パスでアクセス
    return `/audio/${voiceType}${paddedId}.mp3`;
};

/**
 * 1-100のランダムな順序を生成 (Fisher-Yates shuffle)
 * @returns ランダムな順序の配列
 */
export const generateRandomOrder = (): number[] => {
    const order = Array.from({ length: 100 }, (_, i) => i + 1);

    // Fisher-Yates shuffle
    for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }

    return order;
};
