import { GameState, Frame, FrameExplanation } from './bowling-types';

export function createNewGame(): GameState {
  return {
    frames: Array.from({ length: 10 }, () => ({
      rolls: [],
      score: null,
      isStrike: false,
      isSpare: false,
      isComplete: false,
    })),
    currentFrame: 0,
    currentRoll: 0,
    gameComplete: false,
    totalScore: 0,
  };
}

export function addRoll(gameState: GameState, pins: number): GameState {
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
  const currentFrame = newState.frames[newState.currentFrame];
  
  currentFrame.rolls.push(pins);
  
  const frameIndex = newState.currentFrame;
  const isLastFrame = frameIndex === 9;
  
  if (isLastFrame) {
    if (currentFrame.rolls.length === 3) {
      currentFrame.isComplete = true;
      newState.gameComplete = true;
    } else if (currentFrame.rolls.length === 2) {
      const [first, second] = currentFrame.rolls;
      if (first !== 10 && first + second !== 10) {
        currentFrame.isComplete = true;
        newState.gameComplete = true;
      }
    }
  } else {
    if (pins === 10) {
      currentFrame.isStrike = true;
      currentFrame.isComplete = true;
      if (frameIndex < 9) {
        newState.currentFrame++;
        newState.currentRoll = 0;
      }
    } else if (currentFrame.rolls.length === 2) {
      if (currentFrame.rolls[0] + currentFrame.rolls[1] === 10) {
        currentFrame.isSpare = true;
      }
      currentFrame.isComplete = true;
      if (frameIndex < 9) {
        newState.currentFrame++;
        newState.currentRoll = 0;
      }
    } else {
      newState.currentRoll++;
    }
  }
  
  calculateScores(newState);
  
  return newState;
}

export function addRollToFrame(gameState: GameState, frameIndex: number, pins: number): GameState {
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
  const frame = newState.frames[frameIndex];
  const isLastFrame = frameIndex === 9;
  
  frame.rolls.push(pins);
  
  if (isLastFrame) {
    if (frame.rolls.length === 3) {
      frame.isComplete = true;
      newState.gameComplete = true;
    } else if (frame.rolls.length === 2) {
      const [first, second] = frame.rolls;
      if (first !== 10 && first + second !== 10) {
        frame.isComplete = true;
        newState.gameComplete = true;
      }
    }
  } else {
    if (pins === 10) {
      frame.isStrike = true;
      frame.isComplete = true;
    } else if (frame.rolls.length === 2) {
      if (frame.rolls[0] + frame.rolls[1] === 10) {
        frame.isSpare = true;
      }
      frame.isComplete = true;
    }
  }
  
  // Re-evaluate frames from this frame onwards
  for (let i = frameIndex + 1; i < 10; i++) {
    const currentFrame = newState.frames[i];
    const isLastFrame = i === 9;
    
    // Always reset first, then re-evaluate based on rolls
    currentFrame.isStrike = false;
    currentFrame.isSpare = false;
    currentFrame.isComplete = false;
    
    // Reset state if no rolls yet
    if (currentFrame.rolls.length === 0) {
      currentFrame.score = null;
    } else {
      // Re-evaluate frame completion based on current rolls
      if (isLastFrame) {
        if (currentFrame.rolls.length === 3) {
          currentFrame.isComplete = true;
        } else if (currentFrame.rolls.length === 2) {
          const [first, second] = currentFrame.rolls;
          if (first !== 10 && first + second !== 10) {
            currentFrame.isComplete = true;
          }
        }
      } else {
        const firstRoll = currentFrame.rolls[0];
        if (firstRoll === 10) {
          currentFrame.isStrike = true;
          currentFrame.isComplete = true;
        } else if (currentFrame.rolls.length === 2) {
          if (currentFrame.rolls[0] + currentFrame.rolls[1] === 10) {
            currentFrame.isSpare = true;
          }
          currentFrame.isComplete = true;
        }
      }
    }
  }
  
  // Find the first incomplete frame starting from the next frame
  let firstIncompleteFrame = 9; // Default to frame 9 (last frame) if all complete
  for (let i = frameIndex + 1; i < 10; i++) {
    if (!newState.frames[i].isComplete) {
      firstIncompleteFrame = i;
      break;
    }
  }
  
  newState.currentFrame = firstIncompleteFrame;
  newState.currentRoll = newState.frames[newState.currentFrame].rolls.length;
  newState.gameComplete = newState.frames[9].isComplete;
  
  calculateScores(newState);
  
  return newState;
}

function calculateScores(gameState: GameState): void {
  let runningTotal = 0;
  
  for (let i = 0; i < 10; i++) {
    const frame = gameState.frames[i];
    
    if (i === 9) {
      if (frame.isComplete) {
        frame.score = frame.rolls.reduce((sum, roll) => sum + roll, 0);
        runningTotal += frame.score;
      }
    } else {
      if (frame.isStrike) {
        const nextFrame = gameState.frames[i + 1];
        if (nextFrame.rolls.length >= 1) {
          if (nextFrame.isStrike && i < 8) {
            const nextNextFrame = gameState.frames[i + 2];
            if (nextNextFrame.rolls.length >= 1) {
              frame.score = 10 + nextFrame.rolls[0] + nextNextFrame.rolls[0];
              runningTotal += frame.score;
            }
          } else if (nextFrame.rolls.length >= 2 || (i === 8 && nextFrame.rolls.length >= 2)) {
            frame.score = 10 + nextFrame.rolls[0] + nextFrame.rolls[1];
            runningTotal += frame.score;
          }
        }
      } else if (frame.isSpare) {
        const nextFrame = gameState.frames[i + 1];
        if (nextFrame.rolls.length >= 1) {
          frame.score = 10 + nextFrame.rolls[0];
          runningTotal += frame.score;
        }
      } else if (frame.isComplete) {
        frame.score = frame.rolls.reduce((sum, roll) => sum + roll, 0);
        runningTotal += frame.score;
      }
    }
  }
  
  gameState.totalScore = runningTotal;
}

export function getAvailablePins(gameState: GameState): number {
  const currentFrame = gameState.frames[gameState.currentFrame];
  const isLastFrame = gameState.currentFrame === 9;
  
  if (isLastFrame) {
    if (currentFrame.rolls.length === 0) {
      return 10;
    } else if (currentFrame.rolls.length === 1) {
      return currentFrame.rolls[0] === 10 ? 10 : 10 - currentFrame.rolls[0];
    } else if (currentFrame.rolls.length === 2) {
      const [first, second] = currentFrame.rolls;
      if (first === 10 || first + second === 10) {
        return 10;
      }
      return 0;
    }
    return 0;
  } else {
    if (currentFrame.rolls.length === 0) {
      return 10;
    } else if (currentFrame.rolls.length === 1) {
      return 10 - currentFrame.rolls[0];
    }
    return 0;
  }
}

export function getFrameExplanation(gameState: GameState, frameIndex: number): FrameExplanation | null {
  if (frameIndex >= gameState.frames.length) return null;
  
  const frame = gameState.frames[frameIndex];
  const isLastFrame = frameIndex === 9;
  
  if (frame.rolls.length === 0) {
    return {
      frameNumber: frameIndex + 1,
      summary: 'No rolls yet',
      details: ['This frame has not been played yet.'],
      calculation: '',
      type: 'incomplete',
    };
  }
  
  if (isLastFrame) {
    if (frame.isComplete) {
      const total = frame.rolls.reduce((sum, roll) => sum + roll, 0);
      const rollsStr = frame.rolls.map((r, i) => {
        if (r === 10) return 'X';
        if (i > 0 && frame.rolls[i - 1] + r === 10) return '/';
        return r.toString();
      }).join(', ');
      
      return {
        frameNumber: 10,
        summary: `10th Frame: ${total} points`,
        details: [
          'The 10th frame is special: you can bowl up to 3 times!',
          `Rolls: ${rollsStr}`,
          frame.rolls[0] === 10 ? 'Strike! You earned 2 bonus rolls.' : 
            frame.rolls.length >= 2 && frame.rolls[0] + frame.rolls[1] === 10 ? 'Spare! You earned 1 bonus roll.' :
            'No strike or spare, frame ends after 2 rolls.',
        ],
        calculation: `Total: ${frame.rolls.join(' + ')} = ${total}`,
        type: frame.rolls[0] === 10 ? 'strike' : frame.rolls.length >= 2 && frame.rolls[0] + frame.rolls[1] === 10 ? 'spare' : 'open',
      };
    }
  }
  
  if (frame.isStrike) {
    const nextFrame = gameState.frames[frameIndex + 1];
    if (frame.score !== null) {
      const bonusRolls = frameIndex < 8 && nextFrame.isStrike 
        ? [nextFrame.rolls[0], gameState.frames[frameIndex + 2].rolls[0]]
        : [nextFrame.rolls[0], nextFrame.rolls[1]];
      
      return {
        frameNumber: frameIndex + 1,
        summary: `Strike! ${frame.score} points`,
        details: [
          'A strike means you knocked down all 10 pins on your first roll!',
          `Base score: 10 pins`,
          `Bonus: Your next 2 rolls (${bonusRolls[0]} + ${bonusRolls[1]}) are added to this frame`,
        ],
        calculation: `10 + ${bonusRolls[0]} + ${bonusRolls[1]} = ${frame.score}`,
        type: 'strike',
      };
    } else {
      return {
        frameNumber: frameIndex + 1,
        summary: 'Strike! (waiting for bonus)',
        details: [
          'Strike! All 10 pins knocked down on first roll.',
          'Your next 2 rolls will be added as a bonus to this frame.',
          'Score pending...',
        ],
        calculation: '10 + next 2 rolls = ?',
        type: 'strike',
      };
    }
  }
  
  if (frame.isSpare) {
    const nextFrame = gameState.frames[frameIndex + 1];
    if (frame.score !== null) {
      const bonusRoll = nextFrame.rolls[0];
      
      return {
        frameNumber: frameIndex + 1,
        summary: `Spare! ${frame.score} points`,
        details: [
          'A spare means you knocked down all 10 pins using both rolls!',
          `Rolls: ${frame.rolls[0]} + ${frame.rolls[1]} = 10 pins`,
          `Bonus: Your next roll (${bonusRoll}) is added to this frame`,
        ],
        calculation: `10 + ${bonusRoll} = ${frame.score}`,
        type: 'spare',
      };
    } else {
      return {
        frameNumber: frameIndex + 1,
        summary: 'Spare! (waiting for bonus)',
        details: [
          `Spare! Both rolls knocked down all 10 pins.`,
          `Rolls: ${frame.rolls[0]} + ${frame.rolls[1]} = 10`,
          'Your next roll will be added as a bonus to this frame.',
          'Score pending...',
        ],
        calculation: '10 + next roll = ?',
        type: 'spare',
      };
    }
  }
  
  if (frame.isComplete) {
    const total = frame.rolls[0] + frame.rolls[1];
    return {
      frameNumber: frameIndex + 1,
      summary: `Open frame: ${frame.score} points`,
      details: [
        'An open frame means you didn\'t knock down all 10 pins.',
        `First roll: ${frame.rolls[0]} pins`,
        `Second roll: ${frame.rolls[1]} pins`,
        'No bonus rolls for open frames.',
      ],
      calculation: `${frame.rolls[0]} + ${frame.rolls[1]} = ${total}`,
      type: 'open',
    };
  }
  
  return {
    frameNumber: frameIndex + 1,
    summary: `In progress: ${frame.rolls[0]} pins`,
    details: [
      `First roll: ${frame.rolls[0]} pins`,
      `Remaining pins: ${10 - frame.rolls[0]}`,
      'Complete the second roll to finish this frame.',
    ],
    calculation: '',
    type: 'incomplete',
  };
}

export function getPotentialFinalScore(gameState: GameState): number {
  // Create a copy of the game state and assume all remaining frames are strikes
  const simulatedState = JSON.parse(JSON.stringify(gameState)) as GameState;
  
  // Fill in all remaining incomplete frames with strikes
  for (let i = simulatedState.currentFrame; i < 10; i++) {
    const frame = simulatedState.frames[i];
    
    // Only simulate if the frame hasn't been completed
    if (!frame.isComplete) {
      if (i === 9) {
        // 10th frame: if it's empty, add 3 strikes; if it has 1 roll, add 2 more
        if (frame.rolls.length === 0) {
          frame.rolls = [10, 10, 10];
        } else if (frame.rolls.length === 1) {
          frame.rolls.push(10, 10);
        } else if (frame.rolls.length === 2) {
          frame.rolls.push(10);
        }
        frame.isComplete = true;
      } else {
        // Regular frames: just add a strike
        frame.rolls = [10];
        frame.isStrike = true;
        frame.isComplete = true;
      }
    }
  }
  
  // Calculate scores for the simulated state
  calculateScores(simulatedState);
  
  return simulatedState.totalScore;
}

export function undoLastRoll(gameState: GameState): GameState {
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
  
  // Find the last frame with rolls and remove the last roll
  for (let i = newState.currentFrame; i >= 0; i--) {
    const frame = newState.frames[i];
    if (frame.rolls.length > 0) {
      frame.rolls.pop();
      
      // Reset frame state when removing a roll
      frame.isStrike = false;
      frame.isSpare = false;
      frame.isComplete = false;
      frame.score = null;
      
      // If this wasn't the current frame, we need to go back to it
      if (i < newState.currentFrame) {
        newState.currentFrame = i;
        newState.currentRoll = frame.rolls.length;
        newState.gameComplete = false;
      } else if (i === newState.currentFrame) {
        newState.currentRoll = frame.rolls.length;
        newState.gameComplete = false;
      }
      
      break;
    }
  }
  
  calculateScores(newState);
  return newState;
}

export function removeRollFromFrame(gameState: GameState, frameIndex: number, rollIndex: number): GameState {
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
  const frame = newState.frames[frameIndex];
  
  if (rollIndex >= 0 && rollIndex < frame.rolls.length) {
    frame.rolls.splice(rollIndex, 1);
    
    // Re-evaluate frames from the edited frame onwards
    for (let i = frameIndex; i < 10; i++) {
      const currentFrame = newState.frames[i];
      const isLastFrame = i === 9;
      
      // Reset state
      currentFrame.isStrike = false;
      currentFrame.isSpare = false;
      currentFrame.isComplete = false;
      currentFrame.score = null;
      
      // Re-evaluate frame completion based on current rolls
      if (currentFrame.rolls.length === 0) {
        // No rolls yet
      } else if (isLastFrame) {
        // 10th frame rules
        if (currentFrame.rolls.length === 3) {
          currentFrame.isComplete = true;
        } else if (currentFrame.rolls.length === 2) {
          const [first, second] = currentFrame.rolls;
          if (first !== 10 && first + second !== 10) {
            currentFrame.isComplete = true;
          }
        }
      } else {
        // Regular frame rules
        const firstRoll = currentFrame.rolls[0];
        if (firstRoll === 10) {
          currentFrame.isStrike = true;
          currentFrame.isComplete = true;
        } else if (currentFrame.rolls.length === 2) {
          if (currentFrame.rolls[0] + currentFrame.rolls[1] === 10) {
            currentFrame.isSpare = true;
          }
          currentFrame.isComplete = true;
        }
      }
    }
    
    // Set currentFrame to the first incomplete frame
    let firstIncompleteFrame = frameIndex;
    for (let i = frameIndex; i < 10; i++) {
      if (!newState.frames[i].isComplete) {
        firstIncompleteFrame = i;
        break;
      }
      firstIncompleteFrame = i + 1; // Move past the last frame
    }
    
    newState.currentFrame = Math.min(firstIncompleteFrame, 9);
    newState.currentRoll = newState.frames[newState.currentFrame].rolls.length;
    newState.gameComplete = newState.frames[9].isComplete;
  }
  
  calculateScores(newState);
  return newState;
}

export function clearFrame(gameState: GameState, frameIndex: number): GameState {
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
  const frame = newState.frames[frameIndex];
  
  frame.rolls = [];
  frame.isStrike = false;
  frame.isSpare = false;
  frame.isComplete = false;
  frame.score = null;
  
  // Re-evaluate frames from the cleared frame onwards
  for (let i = frameIndex; i < 10; i++) {
    const currentFrame = newState.frames[i];
    const isLastFrame = i === 9;
    
    // Reset state
    currentFrame.isStrike = false;
    currentFrame.isSpare = false;
    currentFrame.isComplete = false;
    currentFrame.score = null;
    
    // Re-evaluate frame completion based on current rolls
    if (currentFrame.rolls.length === 0) {
      // No rolls yet
    } else if (isLastFrame) {
      // 10th frame rules
      if (currentFrame.rolls.length === 3) {
        currentFrame.isComplete = true;
      } else if (currentFrame.rolls.length === 2) {
        const [first, second] = currentFrame.rolls;
        if (first !== 10 && first + second !== 10) {
          currentFrame.isComplete = true;
        }
      }
    } else {
      // Regular frame rules
      const firstRoll = currentFrame.rolls[0];
      if (firstRoll === 10) {
        currentFrame.isStrike = true;
        currentFrame.isComplete = true;
      } else if (currentFrame.rolls.length === 2) {
        if (currentFrame.rolls[0] + currentFrame.rolls[1] === 10) {
          currentFrame.isSpare = true;
        }
        currentFrame.isComplete = true;
      }
    }
  }
  
  // Set currentFrame to the cleared frame
  newState.currentFrame = frameIndex;
  newState.currentRoll = 0;
  newState.gameComplete = newState.frames[9].isComplete;
  
  calculateScores(newState);
  return newState;
}
