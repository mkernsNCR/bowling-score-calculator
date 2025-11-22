import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PinSelectorProps {
  maxPins: number;
  onSelect: (pins: number) => void;
  disabled?: boolean;
}

export default function PinSelector({ maxPins, onSelect, disabled }: PinSelectorProps) {
  const pins = Array.from({ length: maxPins + 1 }, (_, i) => i);
  
  return (
    <div className="w-full">
      <div className="text-sm font-medium text-muted-foreground mb-4 text-center">
        Select pins knocked down (0-{maxPins})
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {pins.map((pin) => (
          <Button
            key={pin}
            data-testid={`pin-${pin}`}
            variant="outline"
            size="lg"
            className={cn(
              "h-16 text-2xl font-bold font-mono",
              pin === 10 && "col-span-2"
            )}
            onClick={() => onSelect(pin)}
            disabled={disabled}
          >
            {pin === 10 ? 'X (10)' : pin}
          </Button>
        ))}
      </div>
    </div>
  );
}
