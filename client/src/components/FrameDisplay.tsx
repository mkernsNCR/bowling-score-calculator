import { Frame } from '@/lib/bowling-types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Trash2 } from 'lucide-react';

interface FrameDisplayProps {
  frame: Frame;
  frameNumber: number;
  onPrevFrame?: () => void;
  onNextFrame?: () => void;
  canGoPrev?: boolean;
  canGoNext?: boolean;
  onRemoveRoll?: (rollIndex: number) => void;
  onClearFrame?: () => void;
}

export default function FrameDisplay({ 
  frame, 
  frameNumber, 
  onPrevFrame, 
  onNextFrame,
  canGoPrev,
  canGoNext,
  onRemoveRoll,
  onClearFrame
}: FrameDisplayProps) {
  const isLastFrame = frameNumber === 10;
  
  const renderRolls = () => {
    if (frame.rolls.length === 0) {
      return (
        <div className="flex gap-4 justify-center">
          <div className="w-20 h-20 flex items-center justify-center text-muted-foreground text-4xl border rounded-md">-</div>
          <div className="w-20 h-20 flex items-center justify-center text-muted-foreground text-4xl border rounded-md">-</div>
        </div>
      );
    }
    
    if (isLastFrame) {
      return (
        <div className="flex gap-4 justify-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative group">
              <div className="w-20 h-20 flex items-center justify-center font-mono text-5xl font-bold border rounded-md bg-card hover-elevate cursor-pointer transition-colors"
                onClick={() => onRemoveRoll?.(i)}
                data-testid={`button-remove-roll-${i}`}
              >
                {frame.rolls[i] !== undefined ? (
                  frame.rolls[i] === 10 ? 'X' :
                  i > 0 && frame.rolls[i - 1] !== 10 && frame.rolls[i - 1] + frame.rolls[i] === 10 ? '/' :
                  frame.rolls[i]
                ) : '-'}
              </div>
              {frame.rolls[i] !== undefined && (
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3 text-destructive" />
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
    
    const firstRoll = frame.rolls[0];
    const secondRoll = frame.rolls[1];
    
    return (
      <div className="flex gap-4 justify-center">
        <div className="relative group">
          <div className="w-20 h-20 flex items-center justify-center font-mono text-5xl font-bold border rounded-md bg-card hover-elevate cursor-pointer"
            onClick={() => onRemoveRoll?.(0)}
            data-testid="button-remove-roll-0"
          >
            {firstRoll === 10 ? 'X' : firstRoll}
          </div>
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <X className="w-3 h-3 text-destructive" />
          </div>
        </div>
        <div className="relative group">
          <div className="w-20 h-20 flex items-center justify-center font-mono text-5xl font-bold border rounded-md bg-card hover-elevate cursor-pointer"
            onClick={() => onRemoveRoll?.(1)}
            data-testid="button-remove-roll-1"
          >
            {secondRoll !== undefined ? (
              firstRoll + secondRoll === 10 ? '/' : secondRoll
            ) : '-'}
          </div>
          {secondRoll !== undefined && (
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <X className="w-3 h-3 text-destructive" />
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="border rounded-md p-8 bg-card">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevFrame}
          disabled={!canGoPrev}
          data-testid="button-frame-prev"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="text-center">
          <h2 className="text-lg font-medium uppercase tracking-wide text-muted-foreground mb-2">
            Frame {frameNumber}
          </h2>
          <p className="text-sm text-muted-foreground">Roll {frame.rolls.length + 1}</p>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onNextFrame}
          disabled={!canGoNext}
          data-testid="button-frame-next"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="mb-8">
        {renderRolls()}
      </div>
      
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-2">
              Frame Score
            </div>
            <div className="font-mono text-5xl font-bold">
              {frame.score !== null ? frame.score : '-'}
            </div>
          </div>
          
          {frame.rolls.length > 0 && (
            <Button
              variant="outline"
              size="icon"
              onClick={onClearFrame}
              data-testid="button-clear-frame"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
