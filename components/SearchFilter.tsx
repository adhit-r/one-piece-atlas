import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, Filter, MapPin, BookOpen, Gem } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Island } from '../utils/islandData';

interface SearchFilterProps {
  islands: Island[];
  onIslandSelect: (island: Island) => void;
  currentEpisode: number;
}

const SEAS = ['East Blue', 'Grand Line', 'New World'];

export const SearchFilter: React.FC<SearchFilterProps> = ({
  islands,
  onIslandSelect,
  currentEpisode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [seaFilter, setSeaFilter] = useState<string | null>(null);
  const [poneglyphOnly, setPoneglyphOnly] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === '/' || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const filtered = useMemo(() => {
    let result = islands.filter(i => i.episodes[0] <= currentEpisode);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        i =>
          i.name.toLowerCase().includes(q) ||
          i.arc.toLowerCase().includes(q) ||
          i.sea.toLowerCase().includes(q) ||
          i.characters.some(c => c.toLowerCase().includes(q))
      );
    }
    if (seaFilter) result = result.filter(i => i.sea === seaFilter);
    if (poneglyphOnly) result = result.filter(i => i.hasPoneglyph);
    return result;
  }, [islands, query, seaFilter, poneglyphOnly, currentEpisode]);

  const activeFilters = (seaFilter ? 1 : 0) + (poneglyphOnly ? 1 : 0);

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="flex items-center gap-2 px-4 py-2 bg-stone-900/80 backdrop-blur-md border border-amber-900/30 rounded-full text-amber-400/60 hover:text-amber-300 hover:border-amber-700/50 transition-all text-xs"
      >
        <Search size={14} />
        <span>Search islands...</span>
        <kbd className="ml-2 px-1.5 py-0.5 bg-stone-800 rounded text-[10px] text-amber-500/50 font-mono">
          /
        </kbd>
        {activeFilters > 0 && (
          <span className="ml-1 w-4 h-4 bg-amber-600 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
            {activeFilters}
          </span>
        )}
      </button>

      {/* Search modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ y: -20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -20, scale: 0.95 }}
              className="relative w-[90%] max-w-lg bg-stone-900/95 border border-amber-900/40 rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-700/50">
                <Search size={18} className="text-amber-500/70 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search islands, arcs, characters..."
                  className="flex-1 bg-transparent text-amber-100 placeholder:text-stone-500 outline-none text-sm"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-stone-500 hover:text-amber-300"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Filter chips */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-stone-800/50 overflow-x-auto no-scrollbar">
                <Filter size={12} className="text-stone-500 flex-shrink-0" />
                {SEAS.map(sea => (
                  <button
                    key={sea}
                    onClick={() => setSeaFilter(seaFilter === sea ? null : sea)}
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
                      seaFilter === sea
                        ? 'bg-amber-700/30 border-amber-600/50 text-amber-200'
                        : 'border-stone-700 text-stone-400 hover:border-stone-500'
                    }`}
                  >
                    {sea}
                  </button>
                ))}
                <button
                  onClick={() => setPoneglyphOnly(!poneglyphOnly)}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-medium border transition-all flex items-center gap-1 ${
                    poneglyphOnly
                      ? 'bg-amber-700/30 border-amber-600/50 text-amber-200'
                      : 'border-stone-700 text-stone-400 hover:border-stone-500'
                  }`}
                >
                  <Gem size={10} /> Poneglyph
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[40vh] overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="px-5 py-8 text-center text-stone-500 text-sm">
                    No islands found at episode {currentEpisode}
                  </div>
                ) : (
                  filtered.map(island => (
                    <button
                      key={island.id}
                      onClick={() => {
                        onIslandSelect(island);
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className="w-full px-5 py-3 flex items-center gap-3 hover:bg-amber-900/20 transition-colors text-left group"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          island.hasPoneglyph
                            ? 'bg-amber-700/30 text-amber-300'
                            : island.importance === 'Legendary'
                              ? 'bg-red-900/30 text-red-300'
                              : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        <MapPin size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-amber-100 group-hover:text-amber-50">
                          {island.name}
                        </div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-2">
                          <span>{island.sea}</span>
                          <span>·</span>
                          <BookOpen size={10} className="inline" />
                          <span>{island.arc}</span>
                          <span>·</span>
                          <span>
                            Ep {island.episodes[0]}-{island.episodes[1]}
                          </span>
                        </div>
                      </div>
                      {island.hasPoneglyph && (
                        <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="px-5 py-2 border-t border-stone-800/50 flex items-center gap-4 text-[10px] text-stone-600">
                <span>
                  <kbd className="px-1 py-0.5 bg-stone-800 rounded font-mono">
                    ↵
                  </kbd>{' '}
                  select
                </span>
                <span>
                  <kbd className="px-1 py-0.5 bg-stone-800 rounded font-mono">
                    esc
                  </kbd>{' '}
                  close
                </span>
                <span className="ml-auto">{filtered.length} islands</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
