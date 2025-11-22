import { GameState } from '@/lib/bowling-types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface GameExplanationProps {
  gameState: GameState;
}

export default function GameExplanation({ gameState }: GameExplanationProps) {
  
  let runningTotal = 0;
  const frameBreakdowns: Array<{ frameNum: number; frameScore: number | null; runningTotal: number }> = [];

  // Calculate running totals for all frames with scores
  for (let i = 0; i < 10; i++) {
    const frame = gameState.frames[i];
    if (frame.score !== null) {
      runningTotal += frame.score;
      frameBreakdowns.push({
        frameNum: i + 1,
        frameScore: frame.score,
        runningTotal: runningTotal,
      });
    }
  }

  const completedFrameCount = frameBreakdowns.length;
  
  return (
    <Collapsible defaultOpen={false}>
      <CollapsibleTrigger asChild>
        <button
          className="w-full flex items-center justify-between p-4 border rounded-md bg-card hover-elevate text-left"
          data-testid="button-game-explanation"
        >
          <div>
            <h3 className="font-semibold">Game Breakdown</h3>
            <p className="text-sm text-muted-foreground mt-1">
              See how frames add up to your score
            </p>
          </div>
          <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-2 p-4 border rounded-md bg-card">
        <div className="space-y-4">
          {completedFrameCount === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Start rolling to see how frames add up!</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm uppercase tracking-wide">Completed Frames</h4>
                <div className="space-y-1">
                  {frameBreakdowns.map(({ frameNum, frameScore, runningTotal: total }) => (
                    <div
                      key={frameNum}
                      className="flex items-center justify-between text-sm p-2 rounded bg-background"
                    >
                      <span>
                        Frame {frameNum}
                        <span className="text-muted-foreground ml-2">
                          +{frameScore}
                        </span>
                      </span>
                      <span className="font-mono font-semibold">{total}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total (so far)</span>
                  <span className="font-mono text-2xl font-bold">{runningTotal}</span>
                </div>
              </div>

              {completedFrameCount < 10 && (
                <div className="bg-background p-3 rounded text-sm text-muted-foreground">
                  <p className="font-medium mb-1">How scoring works:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• <strong>Strike:</strong> 10 + next 2 rolls</li>
                    <li>• <strong>Spare:</strong> 10 + next 1 roll</li>
                    <li>• <strong>Open:</strong> Just the 2 rolls</li>
                    <li>• <strong>10th frame:</strong> No bonus calculation, just the pins</li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
