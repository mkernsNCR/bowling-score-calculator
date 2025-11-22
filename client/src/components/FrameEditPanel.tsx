import { Frame } from '@/lib/bowling-types';
import { Button } from '@/components/ui/button';
import { X, Trash2 } from 'lucide-react';

interface FrameEditPanelProps {
  frame: Frame;
  frameNumber: number;
  onRemoveRoll?: (rollIndex: number) => void;
  onClearFrame?: () => void;
}

export default function FrameEditPanel({ 
  frame, 
  frameNumber, 
  onRemoveRoll,
  onClearFrame
}: FrameEditPanelProps) {
  const isLastFrame = frameNumber === 10;
  
  const renderRolls = () => {
    if (frame.rolls.length === 0) {
      return (
        <div className="flex gap-2 justify-center">
          <div className="w-16 h-16 flex items-center justify-center text-muted-foreground text-3xl border rounded-md">-</div>
          <div className="w-16 h-16 flex items-center justify-center text-muted-foreground text-3xl border rounded-md">-</div>
        </div>
      );
    }
    
    if (isLastFrame) {
      return (
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative group">
              <div className="w-16 h-16 flex items-center justify-center font-mono text-3xl font-bold border rounded-md bg-card hover-elevate cursor-pointer transition-colors"
                onClick={() => onRemoveRoll?.(i)}
                data-testid={`button-remove-roll-scoreboard-${i}`}
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
      <div className="flex gap-2 justify-center">
        <div className="relative group">
          <div className="w-16 h-16 flex items-center justify-center font-mono text-3xl font-bold border rounded-md bg-card hover-elevate cursor-pointer"
            onClick={() => onRemoveRoll?.(0)}
            data-testid="button-remove-roll-scoreboard-0"
          >
            {firstRoll === 10 ? 'X' : firstRoll}
          </div>
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <X className="w-3 h-3 text-destructive" />
          </div>
        </div>
        <div className="relative group">
          <div className="w-16 h-16 flex items-center justify-center font-mono text-3xl font-bold border rounded-md bg-card hover-elevate cursor-pointer"
            onClick={() => onRemoveRoll?.(1)}
            data-testid="button-remove-roll-scoreboard-1"
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
    <div className="border rounded-md p-6 bg-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Edit Frame {frameNumber}</h3>
        {frame.rolls.length > 0 && (
          <Button
            variant="outline"
            size="icon"
            onClick={onClearFrame}
            data-testid="button-clear-frame-scoreboard"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      <div className="flex flex-col items-center gap-4">
        {renderRolls()}
        <div className="text-sm text-muted-foreground">
          Click on a roll to remove it
        </div>
      </div>
    </div>
  );
}
