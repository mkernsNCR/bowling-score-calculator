import PinSelector from '../PinSelector';

export default function PinSelectorExample() {
  return (
    <div className="p-8 bg-background max-w-md mx-auto">
      <PinSelector
        maxPins={10}
        onSelect={(pins) => console.log('Selected:', pins)}
      />
    </div>
  );
}
