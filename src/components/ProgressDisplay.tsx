import './ProgressDisplay.css';

interface ProgressDisplayProps {
  current: number;
  total: number;
}

export const ProgressDisplay = ({ current, total }: ProgressDisplayProps) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="progress-display">
      <div className="progress-text">
        <span className="progress-current">{current}</span>
        <span className="progress-separator">/</span>
        <span className="progress-total">{total}</span>
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
