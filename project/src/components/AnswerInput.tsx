import React, { useState } from 'react';

interface AnswerInputProps {
  onSubmit: (answer: number) => void;
  isCorrect: boolean | null;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ onSubmit, isCorrect }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onSubmit(parseInt(inputValue, 10));
      setInputValue('');
    }
  };

  const getBorderColor = () => {
    if (isCorrect === null) return 'border-gray-300';
    return isCorrect ? 'border-green-500' : 'border-red-500';
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center">
      <div className="relative">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`w-32 h-16 text-center text-3xl font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderColor()} transition-colors duration-300 ${isCorrect !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
          placeholder="?"
          autoFocus
          disabled={isCorrect !== null}
        />
      </div>
      <button
        type="submit"
        disabled={isCorrect !== null}
        className={`mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isCorrect !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Check Answer
      </button>
    </form>
  );
};

export default AnswerInput;