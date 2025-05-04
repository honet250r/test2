import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface FeedbackMessageProps {
  isCorrect: boolean | null;
  correctAnswer?: number;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ isCorrect, correctAnswer }) => {
  if (isCorrect === null) return null;

  return (
    <div 
      className={`mt-4 flex items-center justify-center text-xl font-bold
        ${isCorrect 
          ? 'text-green-500 animate-bounce' 
          : 'text-red-500'
        }`}
    >
      {isCorrect ? (
        <>
          <CheckCircle className="mr-2" />
          <span>すごい！正解です！</span> {/* Great! Correct! */}
        </>
      ) : (
        <>
          <XCircle className="mr-2" />
          <span>もう一度！正解は {correctAnswer} です</span> {/* Try again! The correct answer is {correctAnswer} */}
        </>
      )}
    </div>
  );
};

export default FeedbackMessage;