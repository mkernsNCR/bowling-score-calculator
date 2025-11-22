import { GameState } from '@/lib/bowling-types';
import FrameCell from './FrameCell';

interface ScoreboardProps {
  gameState: GameState;
  onFrameClick?: (frameIndex: number) => void;
}

export default function Scoreboard({ gameState, onFrameClick }: ScoreboardProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-10 gap-2 lg:gap-4">
        {gameState.frames.slice(0, 9).map((frame, index) => (
          <FrameCell
            key={index}
            frame={frame}
            frameNumber={index + 1}
            isActive={gameState.currentFrame === index}
            onClick={() => onFrameClick?.(index)}
          />
        ))}
      </div>
      
      <div className="mt-2 lg:mt-4">
        <FrameCell
          frame={gameState.frames[9]}
          frameNumber={10}
          isActive={gameState.currentFrame === 9}
          onClick={() => onFrameClick?.(9)}
        />
      </div>
    </div>
  );
}
