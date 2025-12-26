import type { Poem } from '../types';
import './PoemDisplay.css';

interface PoemDisplayProps {
  poem: Poem | null;
  onToggle?: () => void;
  isShowingCurrent?: boolean;
}

export const PoemDisplay = ({ poem, onToggle, isShowingCurrent }: PoemDisplayProps) => {
  const handleClick = () => {
    onToggle?.();
  };

  if (!poem) {
    return (
      <div 
        className="poem-display empty"
        onClick={handleClick}
      >
        <p className="poem-placeholder">音声再生後に歌が表示されます</p>
        <p className="poem-hint">タップで現在の歌を{isShowingCurrent ? '非表示' : '表示'}</p>
      </div>
    );
  }

  return (
    <div 
      className={`poem-display ${isShowingCurrent ? 'showing-current' : ''}`}
      onClick={handleClick}
    >
      <div className="poem-number">第{poem.id}首</div>
      <div className="poem-content">
        <p className="poem-kami">{poem.kamiNoKu}</p>
        <p className="poem-shimo">{poem.shimoNoKu}</p>
      </div>
      <div className="poem-author">{poem.author}</div>
      {isShowingCurrent && (
        <div className="current-indicator">現在再生中</div>
      )}
    </div>
  );
};
