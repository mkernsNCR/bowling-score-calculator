import ExplanationPanel from '../ExplanationPanel';

export default function ExplanationPanelExample() {
  const strikeExplanation = {
    frameNumber: 1,
    summary: 'Strike! 20 points',
    details: [
      'A strike means you knocked down all 10 pins on your first roll!',
      'Base score: 10 pins',
      'Bonus: Your next 2 rolls (7 + 3) are added to this frame',
    ],
    calculation: '10 + 7 + 3 = 20',
    type: 'strike' as const,
  };
  
  const spareExplanation = {
    frameNumber: 2,
    summary: 'Spare! 15 points',
    details: [
      'A spare means you knocked down all 10 pins using both rolls!',
      'Rolls: 7 + 3 = 10 pins',
      'Bonus: Your next roll (5) is added to this frame',
    ],
    calculation: '10 + 5 = 15',
    type: 'spare' as const,
  };
  
  const openExplanation = {
    frameNumber: 3,
    summary: 'Open frame: 8 points',
    details: [
      "An open frame means you didn't knock down all 10 pins.",
      'First roll: 6 pins',
      'Second roll: 2 pins',
      'No bonus rolls for open frames.',
    ],
    calculation: '6 + 2 = 8',
    type: 'open' as const,
  };
  
  return (
    <div className="p-8 bg-background space-y-4 max-w-2xl">
      <ExplanationPanel explanation={strikeExplanation} defaultOpen={true} />
      <ExplanationPanel explanation={spareExplanation} />
      <ExplanationPanel explanation={openExplanation} />
    </div>
  );
}
