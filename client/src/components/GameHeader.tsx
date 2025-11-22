import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface GameHeaderProps {
  onNewGame: () => void;
}

export default function GameHeader({ onNewGame }: GameHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Bowling Score Tutor</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Learn bowling scoring in real-time
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={onNewGame}
            data-testid="button-new-game"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">New Game</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
