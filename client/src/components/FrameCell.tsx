import { Frame } from '@/lib/bowling-types';
import { cn } from '@/lib/utils';

interface FrameCellProps {
  frame: Frame;
  frameNumber: number;
  isActive: boolean;
  onClick?: () => void;
}

export default function FrameCell({ frame, frameNumber, isActive, onClick }: FrameCellProps) {
  const isLastFrame = frameNumber === 10;
  
  const renderRolls = () => {
    if (frame.rolls.length === 0) {
      return (
        <div className="flex gap-1 justify-center">
          <div className="w-8 h-8 flex items-center justify-center text-muted-foreground text-sm">-</div>
          <div className="w-8 h-8 flex items-center justify-center text-muted-foreground text-sm">-</div>
        </div>
      );
    }
    
    if (isLastFrame) {
      return (
        <div className="flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-8 h-8 flex items-center justify-center font-mono text-lg font-semibold">
              {frame.rolls[i] !== undefined ? (
                frame.rolls[i] === 10 ? 'X' :
                i > 0 && frame.rolls[i - 1] !== 10 && frame.rolls[i - 1] + frame.rolls[i] === 10 ? '/' :
                frame.rolls[i]
              ) : '-'}
            </div>
          ))}
        </div>
      );
    }
    
    const firstRoll = frame.rolls[0];
    const secondRoll = frame.rolls[1];
    
    return (
      <div className="flex gap-1 justify-center">
        <div className="w-8 h-8 flex items-center justify-center font-mono text-lg font-semibold">
          {firstRoll === 10 ? 'X' : firstRoll}
        </div>
        <div className="w-8 h-8 flex items-center justify-center font-mono text-lg font-semibold">
          {secondRoll !== undefined ? (
            firstRoll + secondRoll === 10 ? '/' : secondRoll
          ) : '-'}
        </div>
      </div>
    );
  };
  
  return (
    <button
      onClick={onClick}
      data-testid={`frame-${frameNumber}`}
      className={cn(
        "border rounded-md p-2 transition-colors hover-elevate active-elevate-2",
        isLastFrame && "col-span-2",
        isActive && "ring-2 ring-primary"
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground text-center">
          Frame {frameNumber}
        </div>
        
        {renderRolls()}
        
        <div className="border-t pt-2 mt-1">
          <div className="font-mono text-2xl font-bold text-center" data-testid={`score-${frameNumber}`}>
            {frame.score !== null ? frame.score : '-'}
          </div>
        </div>
      </div>
    </button>
  );
}
