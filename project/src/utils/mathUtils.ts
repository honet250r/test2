// Maximum number for math problems based on level
const getLevelMaxNumber = (level: number): number => {
  // Level 1: 1-5
  // Level 2: 1-10
  // Level 3: 1-20
  // Level 4+: Add 10 per level
  if (level === 1) return 5;
  if (level === 2) return 10;
  if (level === 3) return 20;
  return 20 + (level - 3) * 10;
};

export interface MathProblem {
  firstNumber: number;
  secondNumber: number;
  correctAnswer: number;
}

export const generateMathProblem = (level: number): MathProblem => {
  const maxNumber = getLevelMaxNumber(level);
  
  // Generate random numbers appropriate for the level
  let firstNumber = Math.floor(Math.random() * maxNumber) + 1;
  let secondNumber = Math.floor(Math.random() * maxNumber) + 1;
  
  // For higher levels, ensure we have at least one larger number
  if (level >= 3 && firstNumber < maxNumber / 2 && secondNumber < maxNumber / 2) {
    if (Math.random() > 0.5) {
      firstNumber = Math.floor(Math.random() * (maxNumber - maxNumber / 2)) + maxNumber / 2;
    } else {
      secondNumber = Math.floor(Math.random() * (maxNumber - maxNumber / 2)) + maxNumber / 2;
    }
  }
  
  // Calculate correct answer
  const correctAnswer = firstNumber + secondNumber;
  
  return {
    firstNumber,
    secondNumber,
    correctAnswer
  };
};