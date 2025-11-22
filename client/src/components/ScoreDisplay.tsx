import { Card, CardContent } from '@/components/ui/card';

interface ScoreDisplayProps {
  score: number;
  currentFrame: number;
  gameComplete: boolean;
  potentialScore?: number;
}

export default function ScoreDisplay({ score, currentFrame, gameComplete, potentialScore }: ScoreDisplayProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-2">
              {gameComplete ? 'Final Score' : 'Current Score'}
            </div>
            <div className="font-mono text-4xl font-bold" data-testid="current-score">
              {score}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-2">
              Frame
            </div>
            <div className="font-mono text-4xl font-bold">
              {currentFrame + 1}
            </div>
          </div>
        </div>
        
        {potentialScore !== undefined && !gameComplete && (
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-2">
              Potential Final Score
            </div>
            <div className="font-mono text-2xl font-bold text-primary">
              {potentialScore}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              if you strike out from here
            </p>
          </div>
        )}
        
        {gameComplete && (
          <div className="mt-4 pt-4 border-t text-center">
            <div className="text-lg font-semibold text-primary">
              Game Complete!
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
