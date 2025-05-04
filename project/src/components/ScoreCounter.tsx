import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ScoreCounterProps {
  correctAnswers: number;
  totalAttempts: number;
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({ correctAnswers, totalAttempts }) => {
  const accuracy = totalAttempts > 0 
    ? Math.round((correctAnswers / totalAttempts) * 100) 
    : 0;

  return (
    <div className="flex justify-center space-x-6 text-white">
      <div className="flex items-center">
        <CheckCircle className="text-green-500 mr-2 w-5 h-5" />
        <span className="font-bold">{correctAnswers}</span>
      </div>
      
      <div className="flex items-center">
        <XCircle className="text-red-500 mr-2 w-5 h-5" />
        <span className="font-bold">{totalAttempts - correctAnswers}</span>
      </div>
      
      <div className="flex items-center">
        <span className="mr-2">Accuracy:</span>
        <span className="font-bold">{accuracy}%</span>
      </div>
    </div>
  );
};

export default ScoreCounter;