import { useEffect, useRef, useState } from 'react';
import { getAudioPath } from '../utils/audioUtils';
import type { VoiceType } from '../types';

interface AudioPlayerProps {
  poemId: number | null;
  voiceType: VoiceType;
  isPlaying: boolean;
  onEnded: () => void;
}

export const AudioPlayer = ({ poemId, voiceType, isPlaying, onEnded }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentPoemId, setCurrentPoemId] = useState<number | null>(null);

  // 音声ファイルの読み込みと再生
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || poemId === null) return;

    // 新しい歌の場合のみ音声ファイルを読み込む
    if (poemId !== currentPoemId) {
      const audioPath = getAudioPath(poemId, voiceType);
      audio.src = audioPath;
      setCurrentPoemId(poemId);
      
      // 音声ファイルが読み込まれたら再生
      if (isPlaying) {
        audio.load();
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Audio playback failed:', error);
            // 自動再生がブロックされた場合、ユーザーに通知
            alert('音声の自動再生がブロックされました。ブラウザの設定で自動再生を許可してください。');
          });
        }
      }
    }
  }, [poemId, voiceType, isPlaying, currentPoemId]);

  // 再生状態の制御
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // poemIdがnullの場合は音声を停止してリセット
    if (poemId === null) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
      setCurrentPoemId(null);
      return;
    }

    if (isPlaying && currentPoemId === poemId) {
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Audio playback failed:', error);
        });
      }
    } else if (!isPlaying) {
      audio.pause();
    }
  }, [isPlaying, poemId, currentPoemId]);

  return (
    <audio
      ref={audioRef}
      onEnded={onEnded}
      style={{ display: 'none' }}
    />
  );
};

