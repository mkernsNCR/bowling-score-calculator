import { useState } from 'react';
import { createNewGame, addRoll, getAvailablePins, getFrameExplanation } from '@/lib/bowling-engine';
import { GameState } from '@/lib/bowling-types';
import GameHeader from '@/components/GameHeader';
import ScoreDisplay from '@/components/ScoreDisplay';
import Scoreboard from '@/components/Scoreboard';
import FrameDisplay from '@/components/FrameDisplay';
import PinSelector from '@/components/PinSelector';
import ExplanationPanel from '@/components/ExplanationPanel';
import { Button } from '@/components/ui/button';
import { Grid3X3, Focus } from 'lucide-react';

type ViewMode = 'full' | 'frame';

export default function BowlingGame() {
  const [gameState, setGameState] = useState<GameState>(createNewGame());
  const [viewMode, setViewMode] = useState<ViewMode>('full');
  
  const handlePinSelect = (pins: number) => {
    const newState = addRoll(gameState, pins);
    setGameState(newState);
  };
  
  const handleNewGame = () => {
    setGameState(createNewGame());
  };
  
  const availablePins = getAvailablePins(gameState);
  
  const completedFrames = gameState.frames
    .map((frame, index) => ({ frame, index }))
    .filter(({ frame }) => frame.rolls.length > 0)
    .reverse();
  
  const currentFrameExplanation = getFrameExplanation(gameState, gameState.currentFrame);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GameHeader onNewGame={handleNewGame} />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <div className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <ScoreDisplay 
              score={gameState.totalScore}
              currentFrame={gameState.currentFrame}
              gameComplete={gameState.gameComplete}
            />
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'full' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('full')}
                data-testid="button-view-full"
                className="flex items-center gap-2"
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="hidden sm:inline">Full</span>
              </Button>
              <Button
                variant={viewMode === 'frame' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('frame')}
                data-testid="button-view-frame"
                className="flex items-center gap-2"
              >
                <Focus className="w-4 h-4" />
                <span className="hidden sm:inline">Frame</span>
              </Button>
            </div>
          </div>
          
          {viewMode === 'full' && (
            <div className="space-y-4 overflow-x-auto">
              <div>
                <h2 className="text-xl font-semibold mb-4">Scoreboard</h2>
                <Scoreboard gameState={gameState} />
              </div>
            </div>
          )}
          
          {viewMode === 'frame' && (
            <div>
              <FrameDisplay 
                frame={gameState.frames[gameState.currentFrame]}
                frameNumber={gameState.currentFrame + 1}
              />
            </div>
          )}
          
          {!gameState.gameComplete && (
            <div className="border rounded-md p-6 bg-card">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Frame {gameState.currentFrame + 1} - Roll {gameState.frames[gameState.currentFrame].rolls.length + 1}
              </h2>
              <PinSelector 
                maxPins={availablePins}
                onSelect={handlePinSelect}
              />
            </div>
          )}
          
          {(viewMode === 'frame' || completedFrames.length > 0) && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                {viewMode === 'frame' ? 'Current Frame Explanation' : 'Frame Explanations'}
              </h2>
              <div className="space-y-3">
                {viewMode === 'frame' ? (
                  currentFrameExplanation && (
                    <ExplanationPanel
                      explanation={currentFrameExplanation}
                      defaultOpen={true}
                    />
                  )
                ) : (
                  completedFrames.map(({ frame, index }) => {
                    const explanation = getFrameExplanation(gameState, index);
                    if (!explanation) return null;
                    
                    return (
                      <ExplanationPanel
                        key={index}
                        explanation={explanation}
                        defaultOpen={index === gameState.currentFrame - 1 || (index === 9 && gameState.gameComplete)}
                      />
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
