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

  const currentPoem = getCurrentPoem();
  const currentPoemId = currentPoem?.id || null;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">百人一首 読み上げ機</h1>
      </header>

      <main className="app-main">
        {gameState.status !== 'idle' && (
          <ProgressDisplay
            current={gameState.currentIndex + (gameState.status === 'finished' ? 1 : 0)}
            total={gameState.playOrder.length}
          />
        )}

        <PoemDisplay poem={gameState.lastPlayedPoem} />

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

