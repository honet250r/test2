import React from 'react';
import { Trophy, Clock } from 'lucide-react';

interface LevelIndicatorProps {
  level: number;
  correctAnswers: number;
  answersToNextLevel: number;
  points: number;
  pointsToNextLevel: number;
  currentPointsProgress: number;
  earnedPoints: number | null;
}

const LevelIndicator: React.FC<LevelIndicatorProps> = ({ 
  level, 
  correctAnswers, 
  answersToNextLevel,
  points,
  pointsToNextLevel,
  currentPointsProgress,
  earnedPoints
}) => {
  // Calculate progress percentage
  const progress = Math.min(
    100,
    Math.floor((points / pointsToNextLevel) * 100)
  );

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex items-center space-x-2 mb-2">
        <Trophy className="text-yellow-500 w-6 h-6" />
        <h2 className="text-2xl font-bold text-white">Level {level}</h2>
      </div>
      
      <div className="w-full max-w-xs bg-blue-800 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-yellow-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex flex-col items-center text-sm text-blue-200 mt-1">
        <div className="flex items-center mb-1">
          <Clock className="w-4 h-4 mr-1" />
          <span>
            {points} / {pointsToNextLevel} points
          </span>
        </div>
        
        {earnedPoints === null ? (
          <div className="flex items-center text-yellow-300">
            <span>Available points: {currentPointsProgress}</span>
          </div>
        ) : (
          <div className="flex items-center text-green-300 animate-bounce">
            <span>+{earnedPoints} points!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelIndicator;