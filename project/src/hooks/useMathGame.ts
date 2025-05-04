import { useState, useEffect, useCallback } from 'react';
import { generateMathProblem } from '../utils/mathUtils';

export interface MathProblem {
  firstNumber: number;
  secondNumber: number;
  correctAnswer: number;
}

const ANSWERS_PER_LEVEL = 5;
const MAX_POINTS_PER_QUESTION = 100;
const TIME_PENALTY_START = 5; // Seconds before points start decreasing

export const useMathGame = () => {
  const [level, setLevel] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<MathProblem>(() => 
    generateMathProblem(level)
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [points, setPoints] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null);
  const [currentPointsProgress, setCurrentPointsProgress] = useState(MAX_POINTS_PER_QUESTION);

  // Reset timer when new problem is shown
  useEffect(() => {
    setStartTime(Date.now());
    setEarnedPoints(null);
  }, [currentProblem]);

  // Update points progress based on time
  useEffect(() => {
    const timer = setInterval(() => {
      const timeElapsed = Date.now() - startTime;
      const currentPoints = calculatePoints(timeElapsed);
      setCurrentPointsProgress(currentPoints);
    }, 100);

    return () => clearInterval(timer);
  }, [startTime]);

  const calculatePoints = (timeElapsed: number): number => {
    const timeInSeconds = timeElapsed / 1000;
    if (timeInSeconds <= TIME_PENALTY_START) {
      return MAX_POINTS_PER_QUESTION;
    }
    const pointsDeducted = Math.floor((timeInSeconds - TIME_PENALTY_START) * 10);
    return Math.max(10, MAX_POINTS_PER_QUESTION - pointsDeducted);
  };

  const checkAnswer = useCallback((userAnswer: number) => {
    const timeElapsed = Date.now() - startTime;
    const correct = userAnswer === currentProblem.correctAnswer;
    setIsCorrect(correct);
    setTotalAttempts(prev => prev + 1);
    
    if (correct) {
      const points = calculatePoints(timeElapsed);
      setEarnedPoints(points);
      setPoints(prev => prev + points);
      setCorrectAnswers(prev => prev + 1);
      setShowCelebration(true);
      
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-complete-or-approved-mission-205.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {
        console.log('Audio play prevented by browser policy');
      });
      
      setTimeout(() => {
        setShowCelebration(false);
        setIsCorrect(null);
        setCurrentProblem(generateMathProblem(level));
      }, 1500);
    } else {
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {
        console.log('Audio play prevented by browser policy');
      });
      
      setTimeout(() => {
        setIsCorrect(null);
      }, 2000);
    }
  }, [currentProblem, level, startTime]);

  // Check for level up
  useEffect(() => {
    if (correctAnswers > 0 && correctAnswers % ANSWERS_PER_LEVEL === 0) {
      const newLevel = Math.floor(correctAnswers / ANSWERS_PER_LEVEL) + 1;
      
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
      audio.play().catch(() => {
        console.log('Audio play prevented by browser policy');
      });
      
      setLevel(newLevel);
      setPoints(0); // Reset points on level up
      setCurrentProblem(generateMathProblem(newLevel));
    }
  }, [correctAnswers]);

  return {
    level,
    correctAnswers,
    totalAttempts,
    currentProblem,
    isCorrect,
    showCelebration,
    checkAnswer,
    answersToNextLevel: ANSWERS_PER_LEVEL,
    points,
    pointsToNextLevel: ANSWERS_PER_LEVEL * MAX_POINTS_PER_QUESTION,
    earnedPoints,
    currentPointsProgress
  };
};