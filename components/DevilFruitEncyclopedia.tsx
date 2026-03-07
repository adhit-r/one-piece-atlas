import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BookOpen, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DevilFruit, Island } from '../utils/islandData';

interface EncyclopediaProps {
  fruits: DevilFruit[];
  islands: Island[];
  onClose: () => void;
}

export const DevilFruitEncyclopedia: React.FC<EncyclopediaProps> = ({
  fruits,
  islands,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const filtered = useMemo(() => {
    if (!query) return fruits;
    const q = query.toLowerCase();
    return fruits.filter(
      f =>
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.type.toLowerCase().includes(q)
    );
  }, [fruits, query]);

  const findIslandName = (id: string) => {
    const isl = islands.find(i => i.id === id);
    return isl ? isl.name : id;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -20, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: -20, scale: 0.95 }}
          className="relative w-[90%] max-w-2xl bg-stone-900/95 border border-amber-900/40 rounded-2xl shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-700/50">
            <BookOpen size={20} className="text-amber-500" />
            <h2 className="text-lg font-bold text-amber-100">
              Devil Fruit Encyclopedia
            </h2>
            <button
              onClick={onClose}
              className="ml-auto text-stone-500 hover:text-amber-300"
            >
              <X size={18} />
            </button>
          </div>
          {/* search */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-700/50">
            <Search size={18} className="text-amber-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search fruits..."
              className="flex-1 bg-transparent text-amber-100 placeholder:text-stone-500 outline-none text-sm"
            />
          </div>
          {/* list */}
          <div className="max-h-[60vh] overflow-y-auto">
            {filtered.map(fruit => (
              <div
                key={fruit.name}
                className="px-6 py-4 border-b border-stone-800/50 last:border-b-0"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-semibold text-amber-100">
                      {fruit.name}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {fruit.type} • Ep {fruit.firstAppearance} •{' '}
                      {findIslandName(fruit.location)}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-stone-400">
                  {fruit.description}
                </p>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-6 py-8 text-center text-stone-500 text-sm">
                No fruits match your search.
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
