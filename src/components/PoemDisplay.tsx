import type { Poem } from '../types';
import './PoemDisplay.css';

interface PoemDisplayProps {
  poem: Poem | null;
  onPressStart?: () => void;
  onPressEnd?: () => void;
}

export const PoemDisplay = ({ poem, onPressStart, onPressEnd }: PoemDisplayProps) => {
  const handleMouseDown = () => {
    onPressStart?.();
  };

  const handleMouseUp = () => {
    onPressEnd?.();
  };

  const handleMouseLeave = () => {
    onPressEnd?.();
  };

  const handleTouchStart = () => {
    onPressStart?.();
  };

  const handleTouchEnd = () => {
    onPressEnd?.();
  };

  if (!poem) {
    return (
      <div 
        className="poem-display empty"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <p className="poem-placeholder">音声再生後に歌が表示されます</p>
        <p className="poem-hint">タップで現在の歌を表示</p>
      </div>
    );
  }

  return (
    <div 
      className="poem-display"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="poem-number">第{poem.id}首</div>
      <div className="poem-content">
        <p className="poem-kami">{poem.kamiNoKu}</p>
        <p className="poem-shimo">{poem.shimoNoKu}</p>
      </div>
      <div className="poem-author">{poem.author}</div>
    </div>
  );
};
