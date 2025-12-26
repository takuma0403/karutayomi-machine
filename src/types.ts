export type VoiceType = 'a' | 'b'; // 大人の声 | 子供の声
export type PlayMode = 'auto' | 'manual'; // 自動進行 | マニュアル進行
export type GameStatus = 'idle' | 'playing' | 'paused' | 'waiting' | 'finished';

export interface Poem {
  id: number;
  kamiNoKu: string;
  shimoNoKu: string;
  author: string;
}

export interface GameState {
  status: GameStatus;
  currentIndex: number;
  playOrder: number[];
  playMode: PlayMode;
  voiceType: VoiceType;
  waitTime: number; // 秒単位
  lastPlayedPoem: Poem | null;
}

export interface GameConfig {
  waitTime: number;
  voiceType: VoiceType;
  playMode: PlayMode;
}
