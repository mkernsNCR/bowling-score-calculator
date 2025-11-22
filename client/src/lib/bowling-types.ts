export type Roll = number;

export interface Frame {
  rolls: Roll[];
  score: number | null;
  isStrike: boolean;
  isSpare: boolean;
  isComplete: boolean;
}

export interface GameState {
  frames: Frame[];
  currentFrame: number;
  currentRoll: number;
  gameComplete: boolean;
  totalScore: number;
}

export interface FrameExplanation {
  frameNumber: number;
  summary: string;
  details: string[];
  calculation: string;
  type: 'strike' | 'spare' | 'open' | 'incomplete';
}
