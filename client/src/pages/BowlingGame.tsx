import { useState } from 'react';
import { createNewGame, addRoll, getAvailablePins, getFrameExplanation } from '@/lib/bowling-engine';
import { GameState } from '@/lib/bowling-types';
import GameHeader from '@/components/GameHeader';
import ScoreDisplay from '@/components/ScoreDisplay';
import Scoreboard from '@/components/Scoreboard';
import PinSelector from '@/components/PinSelector';
import ExplanationPanel from '@/components/ExplanationPanel';

export default function BowlingGame() {
  const [gameState, setGameState] = useState<GameState>(createNewGame());
  
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
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GameHeader onNewGame={handleNewGame} />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <div className="space-y-6">
          <ScoreDisplay 
            score={gameState.totalScore}
            currentFrame={gameState.currentFrame}
            gameComplete={gameState.gameComplete}
          />
          
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">Scoreboard</h2>
              <Scoreboard gameState={gameState} />
            </div>
          </div>
          
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
          
          {completedFrames.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Frame Explanations</h2>
              <div className="space-y-3">
                {completedFrames.map(({ frame, index }) => {
                  const explanation = getFrameExplanation(gameState, index);
                  if (!explanation) return null;
                  
                  return (
                    <ExplanationPanel
                      key={index}
                      explanation={explanation}
                      defaultOpen={index === gameState.currentFrame - 1 || (index === 9 && gameState.gameComplete)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
