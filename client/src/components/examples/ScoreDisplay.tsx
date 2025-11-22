import ScoreDisplay from '../ScoreDisplay';

export default function ScoreDisplayExample() {
  return (
    <div className="p-8 bg-background space-y-4 max-w-md">
      <ScoreDisplay score={87} currentFrame={5} gameComplete={false} />
      <ScoreDisplay score={234} currentFrame={9} gameComplete={true} />
    </div>
  );
}
