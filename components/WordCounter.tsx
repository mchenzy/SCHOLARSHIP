import React from 'react';
import { countWords } from '../utils';

interface WordCounterProps {
  text: string;
  limit: number;
}

export const WordCounter: React.FC<WordCounterProps> = ({ text, limit }) => {
  const count = countWords(text);
  const isOver = count > limit;
  
  return (
    <div className={`text-sm mt-2 font-medium flex justify-end ${isOver ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
      <span>
        {count} / {limit} words
      </span>
    </div>
  );
};