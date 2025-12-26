import type { GameStatus, PlayMode } from '../types';
import './GameControls.css';

interface GameControlsProps {
  status: GameStatus;
  playMode: PlayMode;
  isWaiting: boolean;
  onStart: () => void;
  onEnd: () => void;
  onPause: () => void;
  onResume: () => void;
  onSkip: () => void;
  onToggleMode: () => void;
}

export const GameControls = ({
  status,
  playMode,
  isWaiting,
  onStart,
  onEnd,
  onPause,
  onResume,
  onSkip,
  onToggleMode,
}: GameControlsProps) => {
  const isIdle = status === 'idle';
  const isPlaying = status === 'playing';
  const isPaused = status === 'paused';
  const isFinished = status === 'finished';
  const isActive = isPlaying || isPaused || (status === 'waiting');

  return (
    <div className="game-controls">
      <div className="control-buttons">
        {isIdle && (
          <button className="btn btn-primary" onClick={onStart}>
            ゲーム開始
          </button>
        )}

        {isFinished && (
          <button className="btn btn-primary" onClick={onStart}>
            もう一度
          </button>
        )}

        {isActive && (
          <>
            {isPlaying && (
              <button className="btn btn-secondary" onClick={onPause}>
                一時停止
              </button>
            )}

            {(isPaused || (status === 'waiting' && playMode === 'manual')) && (
              <button className="btn btn-primary" onClick={onResume}>
                再開
              </button>
            )}

            <button className="btn btn-secondary" onClick={onSkip}>
              スキップ
            </button>

            <button className="btn btn-danger" onClick={onEnd}>
              終了
            </button>
          </>
        )}
      </div>

      {isActive && (
        <div className="mode-controls">
          <button 
            className={`btn btn-mode ${playMode === 'auto' ? 'active' : ''}`}
            onClick={onToggleMode}
          >
            {playMode === 'auto' ? '自動進行モード' : 'マニュアル進行モード'}
          </button>
          {isWaiting && playMode === 'manual' && (
            <p className="mode-hint">再開ボタンを押して次の歌へ</p>
          )}
        </div>
      )}
    </div>
  );
};
