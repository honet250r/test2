import React from 'react';
import { Plus } from 'lucide-react';

interface MathProblemProps {
  firstNumber: number;
  secondNumber: number;
  level: number;
}

const MathProblem: React.FC<MathProblemProps> = ({ firstNumber, secondNumber, level }) => {
  return (
    <div className="flex items-center justify-center space-x-4 md:space-x-8 text-4xl md:text-6xl font-bold">
      <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-xl shadow-md flex items-center justify-center text-blue-600">
        {firstNumber}
      </div>
      <Plus className="text-yellow-500 w-8 h-8 md:w-12 md:h-12" />
      <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-xl shadow-md flex items-center justify-center text-blue-600">
        {secondNumber}
      </div>
      <div className="text-white">=</div>
      <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-400">
        ?
      </div>
    </div>
  );
};

export default MathProblem;