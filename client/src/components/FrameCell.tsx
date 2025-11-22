import { Frame } from '@/lib/bowling-types';
import { cn } from '@/lib/utils';

interface FrameCellProps {
  frame: Frame;
  frameNumber: number;
  isActive: boolean;
  runningTotal: number | null;
  onClick?: () => void;
}

export default function FrameCell({ frame, frameNumber, isActive, runningTotal, onClick }: FrameCellProps) {
  const isLastFrame = frameNumber === 10;
  
  const renderRolls = () => {
    if (frame.rolls.length === 0) {
      return (
        <div className="flex gap-1 justify-center">
          <div className="w-6 h-6 flex items-center justify-center text-muted-foreground text-xs">-</div>
          <div className="w-6 h-6 flex items-center justify-center text-muted-foreground text-xs">-</div>
        </div>
      );
    }
    
    if (isLastFrame) {
      return (
        <div className="flex gap-0.5 justify-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-6 h-6 flex items-center justify-center font-mono text-sm font-semibold">
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
      <div className="flex gap-0.5 justify-center">
        <div className="w-6 h-6 flex items-center justify-center font-mono text-sm font-semibold">
          {firstRoll === 10 ? 'X' : firstRoll}
        </div>
        <div className="w-6 h-6 flex items-center justify-center font-mono text-sm font-semibold">
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
        "border rounded-md p-3 transition-colors hover-elevate active-elevate-2 w-20 flex flex-col",
        isLastFrame && "w-32",
        isActive && "ring-2 ring-primary"
      )}
    >
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-center flex-shrink-0">
        {frameNumber}
      </div>
      
      <div className="flex-1 flex items-center justify-center my-1">
        {renderRolls()}
      </div>
      
      <div className="border-t pt-2">
        <div className="font-mono text-lg font-bold text-center" data-testid={`score-${frameNumber}`}>
          {runningTotal !== null ? runningTotal : '-'}
        </div>
      </div>
    </button>
  );
}
