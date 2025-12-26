import type { Poem } from '../types';
import './PoemDisplay.css';

interface PoemDisplayProps {
  poem: Poem | null;
}

export const PoemDisplay = ({ poem }: PoemDisplayProps) => {
  if (!poem) {
    return (
      <div className="poem-display empty">
        <p className="poem-placeholder">音声再生後に歌が表示されます</p>
      </div>
    );
  }

  return (
    <div className="poem-display">
      <div className="poem-number">第{poem.id}首</div>
      <div className="poem-content">
        <p className="poem-kami">{poem.kamiNoKu}</p>
        <p className="poem-shimo">{poem.shimoNoKu}</p>
      </div>
      <div className="poem-author">{poem.author}</div>
    </div>
  );
};
