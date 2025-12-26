import { useState, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { AudioPlayer } from './components/AudioPlayer';
import { GameControls } from './components/GameControls';
import { ProgressDisplay } from './components/ProgressDisplay';
import { PoemDisplay } from './components/PoemDisplay';
import './App.css';

function App() {
  const {
    gameState,
    isWaiting,
    startGame,
    endGame,
    pauseGame,
    resumeGame,
    skipToNext,
    onAudioEnded,
    togglePlayMode,
    getCurrentPoem,
  } = useGameState();

  const [showCurrentPoem, setShowCurrentPoem] = useState(false);

  const currentPoem = getCurrentPoem();
  const currentPoemId = currentPoem?.id || null;

  // トグル表示中は現在の歌を表示、それ以外は最後に再生された歌を表示
  const displayPoem = showCurrentPoem ? currentPoem : gameState.lastPlayedPoem;

  const handleTogglePoem = () => {
    setShowCurrentPoem(prev => !prev);
  };

  // 音声再生が終わったら(lastPlayedPoemが更新されたら)、現在の歌の表示を非表示にする
  useEffect(() => {
    if (gameState.lastPlayedPoem) {
      setShowCurrentPoem(false);
    }
  }, [gameState.lastPlayedPoem]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">かるた読み</h1>
      </header>

      <main className="app-main">
        {gameState.status !== 'idle' && (
          <ProgressDisplay
            current={gameState.currentIndex + (gameState.status === 'finished' ? 1 : 0)}
            total={gameState.playOrder.length}
          />
        )}

        <PoemDisplay 
          poem={displayPoem}
          onToggle={handleTogglePoem}
          isShowingCurrent={showCurrentPoem}
        />

        <GameControls
          status={gameState.status}
          playMode={gameState.playMode}
          isWaiting={isWaiting}
          onStart={startGame}
          onEnd={endGame}
          onPause={pauseGame}
          onResume={resumeGame}
          onSkip={skipToNext}
          onToggleMode={togglePlayMode}
        />

        {gameState.status === 'finished' && (
          <div className="game-finished">
            <h2>お疲れ様でした!</h2>
            <p>100首すべての読み上げが完了しました。</p>
          </div>
        )}
      </main>

      <AudioPlayer
        poemId={currentPoemId}
        voiceType={gameState.voiceType}
        isPlaying={gameState.status === 'playing'}
        onEnded={onAudioEnded}
      />
    </div>
  );
}

export default App;




