import FrameCell from '../FrameCell';

export default function FrameCellExample() {
  const strikeFrame = {
    rolls: [10],
    score: 20,
    isStrike: true,
    isSpare: false,
    isComplete: true,
  };
  
  const spareFrame = {
    rolls: [7, 3],
    score: 15,
    isStrike: false,
    isSpare: true,
    isComplete: true,
  };
  
  const openFrame = {
    rolls: [6, 2],
    score: 8,
    isStrike: false,
    isSpare: false,
    isComplete: true,
  };
  
  const tenthFrame = {
    rolls: [10, 10, 9],
    score: 29,
    isStrike: true,
    isSpare: false,
    isComplete: true,
  };
  
  return (
    <div className="p-8 space-y-4 bg-background">
      <div className="flex gap-1">
        <FrameCell frame={strikeFrame} frameNumber={1} isActive={false} runningTotal={20} />
        <FrameCell frame={spareFrame} frameNumber={2} isActive={false} runningTotal={35} />
        <FrameCell frame={openFrame} frameNumber={3} isActive={true} runningTotal={43} />
        <FrameCell frame={tenthFrame} frameNumber={10} isActive={false} runningTotal={72} />
      </div>
    </div>
  );
}
