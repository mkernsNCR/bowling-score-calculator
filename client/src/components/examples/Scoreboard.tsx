import Scoreboard from '../Scoreboard';
import { createNewGame, addRoll } from '@/lib/bowling-engine';

export default function ScoreboardExample() {
  let game = createNewGame();
  game = addRoll(game, 10);
  game = addRoll(game, 7);
  game = addRoll(game, 3);
  game = addRoll(game, 9);
  game = addRoll(game, 0);
  
  return (
    <div className="p-8 bg-background">
      <Scoreboard 
        gameState={game} 
        onFrameClick={(index) => console.log('Frame clicked:', index + 1)}
      />
    </div>
  );
}
