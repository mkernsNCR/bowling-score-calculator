import GameHeader from '../GameHeader';

export default function GameHeaderExample() {
  return (
    <div className="bg-background">
      <GameHeader onNewGame={() => console.log('New game clicked')} />
    </div>
  );
}
