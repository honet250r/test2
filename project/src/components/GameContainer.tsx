import React from 'react';
import MathProblem from './MathProblem';
import AnswerInput from './AnswerInput';
import LevelIndicator from './LevelIndicator';
import ScoreCounter from './ScoreCounter';
import Celebration from './Celebration';
import FeedbackMessage from './FeedbackMessage';
import { useMathGame } from '../hooks/useMathGame';

const GameContainer: React.FC = () => {
  const {
    level,
    correctAnswers,
    totalAttempts,
    currentProblem,
    isCorrect,
    showCelebration,
    checkAnswer,
    answersToNextLevel,
    points,
    pointsToNextLevel,
    earnedPoints,
    currentPointsProgress
  } = useMathGame();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        たしざんゲーム
      </h1>
      
      <div className="w-full max-w-lg bg-blue-600 rounded-2xl shadow-lg p-6 md:p-8 relative overflow-hidden">
        <Celebration isVisible={showCelebration} />
        
        <LevelIndicator
          level={level}
          correctAnswers={correctAnswers}
          answersToNextLevel={answersToNextLevel}
          points={points}
          pointsToNextLevel={pointsToNextLevel}
          currentPointsProgress={currentPointsProgress}
          earnedPoints={earnedPoints}
        />
        
        <MathProblem
          firstNumber={currentProblem.firstNumber}
          secondNumber={currentProblem.secondNumber}
          level={level}
        />
        
        <AnswerInput 
          onSubmit={checkAnswer}
          isCorrect={isCorrect}
        />
        
        <FeedbackMessage 
          isCorrect={isCorrect} 
          correctAnswer={currentProblem.correctAnswer}
        />
        
        <div className="mt-8">
          <ScoreCounter 
            correctAnswers={correctAnswers} 
            totalAttempts={totalAttempts} 
          />
        </div>
      </div>
    </div>
  );
};

export default GameContainer