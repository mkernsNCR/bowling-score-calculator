import { GameState } from '@/lib/bowling-types';
import FrameCell from './FrameCell';

interface ScoreboardProps {
  gameState: GameState;
  onFrameClick?: (frameIndex: number) => void;
  selectedFrameIndex?: number | null;
}

export default function Scoreboard({ gameState, onFrameClick, selectedFrameIndex }: ScoreboardProps) {
  // Calculate running totals for each frame
  const calculateRunningTotals = () => {
    const runningTotals: (number | null)[] = [];
    let cumulativeScore = 0;
    
    for (let i = 0; i < gameState.frames.length; i++) {
      const frame = gameState.frames[i];
      if (frame.score !== null) {
        cumulativeScore += frame.score;
        runningTotals.push(cumulativeScore);
      } else {
        runningTotals.push(null);
      }
    }
    
    return runningTotals;
  };
  
  const runningTotals = calculateRunningTotals();
  
  return (
    <div className="w-full">
      <div className="flex gap-1 overflow-x-auto pb-2">
        {gameState.frames.slice(0, 9).map((frame, index) => (
          <FrameCell
            key={index}
            frame={frame}
            frameNumber={index + 1}
            isActive={selectedFrameIndex === index}
            runningTotal={runningTotals[index]}
            onClick={() => onFrameClick?.(index)}
          />
        ))}
      </div>
      
      <div className="flex gap-1">
        <FrameCell
          frame={gameState.frames[9]}
          frameNumber={10}
          isActive={selectedFrameIndex === 9}
          runningTotal={runningTotals[9]}
          onClick={() => onFrameClick?.(9)}
        />
      </div>
    </div>
  );
}
