import { useState } from 'react';
import { createNewGame, addRoll, addRollToFrame, getAvailablePins, getFrameExplanation, getPotentialFinalScore, removeRollFromFrame, clearFrame } from '@/lib/bowling-engine';
import { GameState } from '@/lib/bowling-types';
import GameHeader from '@/components/GameHeader';
import ScoreDisplay from '@/components/ScoreDisplay';
import Scoreboard from '@/components/Scoreboard';
import FrameDisplay from '@/components/FrameDisplay';
import FrameEditPanel from '@/components/FrameEditPanel';
import PinSelector from '@/components/PinSelector';
import ExplanationPanel from '@/components/ExplanationPanel';
import GameExplanation from '@/components/GameExplanation';
import { Button } from '@/components/ui/button';
import { Grid3X3, Focus } from 'lucide-react';

type ViewMode = 'full' | 'frame';

export default function BowlingGame() {
  const [gameState, setGameState] = useState<GameState>(createNewGame());
  const [viewMode, setViewMode] = useState<ViewMode>('full');
  const [viewedFrameIndex, setViewedFrameIndex] = useState<number>(0);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState<number | null>(null);
  
  const handlePinSelect = (pins: number) => {
    const newState = addRoll(gameState, pins);
    setGameState(newState);
  };
  
  const handleNewGame = () => {
    setGameState(createNewGame());
    setViewedFrameIndex(0);
  };
  
  const handlePrevFrame = () => {
    setViewedFrameIndex(Math.max(0, viewedFrameIndex - 1));
  };
  
  const handleNextFrame = () => {
    setViewedFrameIndex(Math.min(9, viewedFrameIndex + 1));
  };

  const handleRemoveRoll = (rollIndex: number, frameIndex?: number) => {
    const targetFrame = frameIndex !== undefined ? frameIndex : viewedFrameIndex;
    const newState = removeRollFromFrame(gameState, targetFrame, rollIndex);
    setGameState(newState);
    setViewedFrameIndex(newState.currentFrame);
    // Close edit panel if editing from scoreboard
    if (frameIndex !== undefined) {
      setSelectedFrameIndex(null);
    }
  };

  const handleClearFrame = (frameIndex?: number) => {
    const targetFrame = frameIndex !== undefined ? frameIndex : viewedFrameIndex;
    const newState = clearFrame(gameState, targetFrame);
    setGameState(newState);
    setViewedFrameIndex(newState.currentFrame);
    // Close edit panel if editing from scoreboard
    if (frameIndex !== undefined) {
      setSelectedFrameIndex(null);
    }
  };

  const handleFrameClick = (frameIndex: number) => {
    // If clicking on an incomplete frame, allow editing/playing
    // If clicking on a complete frame, just toggle the edit panel
    const frame = gameState.frames[frameIndex];
    if (selectedFrameIndex === frameIndex) {
      setSelectedFrameIndex(null);
    } else {
      setSelectedFrameIndex(frameIndex);
    }
  };
  
  const availablePins = getAvailablePins(gameState);
  
  const completedFrames = gameState.frames
    .map((frame, index) => ({ frame, index }))
    .filter(({ frame }) => frame.rolls.length > 0)
    .reverse();
  
  const currentFrameExplanation = getFrameExplanation(gameState, gameState.currentFrame);
  const viewedFrameExplanation = getFrameExplanation(gameState, viewedFrameIndex);
  const potentialFinalScore = !gameState.gameComplete ? getPotentialFinalScore(gameState) : undefined;
  
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
              potentialScore={potentialFinalScore}
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
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">Scoreboard</h2>
                <Scoreboard gameState={gameState} onFrameClick={handleFrameClick} />
              </div>

              {selectedFrameIndex !== null && (
                <FrameEditPanel
                  frame={gameState.frames[selectedFrameIndex]}
                  frameNumber={selectedFrameIndex + 1}
                  onRemoveRoll={(rollIndex) => handleRemoveRoll(rollIndex, selectedFrameIndex)}
                  onClearFrame={() => handleClearFrame(selectedFrameIndex)}
                />
              )}

              <GameExplanation gameState={gameState} />
            </div>
          )}
          
          {viewMode === 'frame' && (
            <div>
              <FrameDisplay 
                frame={gameState.frames[viewedFrameIndex]}
                frameNumber={viewedFrameIndex + 1}
                onPrevFrame={handlePrevFrame}
                onNextFrame={handleNextFrame}
                canGoPrev={viewedFrameIndex > 0}
                canGoNext={viewedFrameIndex < 9}
                onRemoveRoll={handleRemoveRoll}
                onClearFrame={handleClearFrame}
              />
            </div>
          )}
          
          {!gameState.gameComplete && (
            <div className="border rounded-md p-6 bg-card">
              {(() => {
                // Determine which frame to show in the pin selector
                let displayFrameIndex = gameState.currentFrame;
                
                // In full view, if a frame is selected and incomplete, show that frame
                if (viewMode === 'full' && selectedFrameIndex !== null) {
                  const selectedFrame = gameState.frames[selectedFrameIndex];
                  if (!selectedFrame.isComplete) {
                    displayFrameIndex = selectedFrameIndex;
                  }
                }
                
                const displayFrame = gameState.frames[displayFrameIndex];
                const isLastFrame = displayFrameIndex === 9;
                
                // Calculate available pins for the display frame
                let displayMaxPins = 10;
                if (isLastFrame) {
                  if (displayFrame.rolls.length === 0) {
                    displayMaxPins = 10;
                  } else if (displayFrame.rolls.length === 1) {
                    displayMaxPins = displayFrame.rolls[0] === 10 ? 10 : 10 - displayFrame.rolls[0];
                  } else if (displayFrame.rolls.length === 2) {
                    const [first, second] = displayFrame.rolls;
                    displayMaxPins = (first === 10 || first + second === 10) ? 10 : 0;
                  }
                } else {
                  if (displayFrame.rolls.length === 0) {
                    displayMaxPins = 10;
                  } else if (displayFrame.rolls.length === 1) {
                    displayMaxPins = 10 - displayFrame.rolls[0];
                  } else {
                    displayMaxPins = 0;
                  }
                }
                
                return (
                  <>
                    <h2 className="text-xl font-semibold mb-4 text-center">
                      Frame {displayFrameIndex + 1} - Roll {displayFrame.rolls.length + 1}
                    </h2>
                    <PinSelector 
                      maxPins={displayMaxPins}
                      onSelect={(pins) => {
                        // If a different frame is selected, add roll to that frame
                        if (viewMode === 'full' && selectedFrameIndex !== null && displayFrameIndex === selectedFrameIndex) {
                          const newState = addRollToFrame(gameState, selectedFrameIndex, pins);
                          setGameState(newState);
                          // Close edit panel if frame becomes complete
                          if (newState.frames[selectedFrameIndex].isComplete) {
                            setSelectedFrameIndex(null);
                          }
                        } else {
                          handlePinSelect(pins);
                        }
                      }}
                    />
                  </>
                );
              })()}
            </div>
          )}
          
          {(viewMode === 'frame' || completedFrames.length > 0) && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                {viewMode === 'frame' ? 'Current Frame Explanation' : 'Frame Explanations'}
              </h2>
              <div className="space-y-3">
                {viewMode === 'frame' ? (
                  viewedFrameExplanation && (
                    <ExplanationPanel
                      explanation={viewedFrameExplanation}
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
