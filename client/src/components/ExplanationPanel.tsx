import { FrameExplanation } from '@/lib/bowling-types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Target, Zap, Circle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExplanationPanelProps {
  explanation: FrameExplanation;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ExplanationPanel({ explanation, defaultOpen, isOpen, onOpenChange }: ExplanationPanelProps) {
  const getIcon = () => {
    switch (explanation.type) {
      case 'strike':
        return <Zap className="w-5 h-5 text-primary" />;
      case 'spare':
        return <Target className="w-5 h-5 text-chart-2" />;
      case 'open':
        return <Circle className="w-5 h-5 text-muted-foreground" />;
      default:
        return <HelpCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };
  
  const getTypeColor = () => {
    switch (explanation.type) {
      case 'strike':
        return 'text-primary';
      case 'spare':
        return 'text-chart-2';
      default:
        return 'text-foreground';
    }
  };
  
  const accordionValue = isOpen !== undefined ? (isOpen ? 'item-1' : '') : (defaultOpen ? 'item-1' : undefined);
  
  return (
    <Accordion 
      type="single" 
      collapsible 
      value={isOpen !== undefined ? accordionValue : undefined}
      onValueChange={onOpenChange ? (value) => onOpenChange(value === 'item-1') : undefined}
      defaultValue={isOpen === undefined ? accordionValue : undefined}
      data-testid={`explanation-frame-${explanation.frameNumber}`}
    >
      <AccordionItem value="item-1" className="border rounded-md px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-3">
            {getIcon()}
            <div className="text-left">
              <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Frame {explanation.frameNumber}
              </div>
              <div className={cn("text-base font-semibold", getTypeColor())}>
                {explanation.summary}
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-4 space-y-4">
            <div className="space-y-2">
              {explanation.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
            
            {explanation.calculation && (
              <div className="p-4 bg-muted rounded-md">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
                  Calculation
                </div>
                <div className="font-mono text-base font-semibold">
                  {explanation.calculation}
                </div>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
