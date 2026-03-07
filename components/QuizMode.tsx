import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Island } from '../utils/islandData';

interface QuizModeProps {
  islands: Island[];
  onClose: () => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({ islands, onClose }) => {
  const [question, setQuestion] = useState<Island | null>(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [asked, setAsked] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRef = useRef<HTMLInputElement>(null);

  const pickQuestion = React.useCallback(() => {
    const candidate = islands[Math.floor(Math.random() * islands.length)];
    setQuestion(candidate);
    setAnswer('');
    setFeedback(null);
    setTimeLeft(30);
    setAsked(prev => prev + 1);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [islands]);

  // initial question (deferred to avoid synchronous state update in effect)
  useEffect(() => {
    const id = setTimeout(pickQuestion, 0);
    return () => clearTimeout(id);
  }, [pickQuestion]);

  // countdown timer and auto-feedback
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setFeedback(`Time's up! It was ${question?.name}`);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [question]);

  const submit = () => {
    if (!question) return;
    if (answer.trim().toLowerCase() === question.name.toLowerCase()) {
      setFeedback('Correct!');
      setScore(s => s + 1);
    } else {
      setFeedback(`Nope – it was ${question.name}`);
    }
  };

  const hints = useMemo(() => {
    if (!question) return [];
    const h: string[] = [];
    h.push(`Episode ${question.episodes[0]}-${question.episodes[1]}`);
    if (question.characters.length) {
      h.push(`Characters: ${question.characters.join(', ')}`);
    }
    return h;
  }, [question]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70"
      >
        <motion.div
          initial={{ y: -20, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: -20, scale: 0.95 }}
          className="relative w-[90%] max-w-md bg-stone-900/95 border border-amber-900/40 rounded-2xl shadow-2xl overflow-hidden p-6"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-stone-500 hover:text-amber-300"
          >
            <X size={18} />
          </button>
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-amber-100">Quiz Mode</h2>
            <p className="text-[10px] text-stone-500">Guess the island</p>
          </div>
          {question && (
            <div className="space-y-4">
              <div className="text-sm text-amber-200">Hints:</div>
              <ul className="list-disc list-inside text-stone-400 text-xs">
                {hints.map(h => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="mt-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Island name..."
                  className="w-full bg-stone-800/60 text-amber-100 placeholder-stone-500 rounded px-3 py-2 text-sm outline-none"
                  onKeyDown={e => {
                    if (e.key === 'Enter') submit();
                  }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-stone-500">
                <span>Time: {timeLeft}s</span>
                <span>
                  Score: {score}/{asked - (feedback ? 0 : 1)}
                </span>
              </div>
              {feedback && (
                <div className="mt-2 text-center text-sm text-amber-300">
                  {feedback}
                </div>
              )}
              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    if (!feedback) submit();
                    setTimeout(pickQuestion, 500);
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded text-sm"
                >
                  {feedback ? 'Next' : 'Submit'}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
