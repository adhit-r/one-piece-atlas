import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';
import type { CrewMember } from '../utils/islandData';

interface CrewTrackerProps {
  crew: CrewMember[];
  currentEpisode: number;
}

const CREW_EMOJI: Record<string, string> = {
  Luffy: '👒',
  Zoro: '⚔️',
  Nami: '🗺️',
  Usopp: '🎯',
  Sanji: '🍳',
  Chopper: '🩺',
  Robin: '📚',
  Franky: '🔧',
  Brook: '🎻',
  Jimbei: '🦈',
  Vivi: '👑',
};

export const CrewTracker: React.FC<CrewTrackerProps> = ({
  crew,
  currentEpisode,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const activeCrew = useMemo(
    () =>
      crew.filter(
        m =>
          m.joinEp <= currentEpisode &&
          (!m.leaveEp || m.leaveEp >= currentEpisode)
      ),
    [crew, currentEpisode]
  );

  const totalCrew = crew.filter(
    m => !m.leaveEp || m.leaveEp >= currentEpisode
  ).length;

  return (
    <div className="absolute top-20 left-6 z-40 pointer-events-auto">
      <motion.div
        layout
        className="bg-stone-900/90 backdrop-blur-xl border border-amber-900/30 rounded-2xl shadow-2xl overflow-hidden"
        style={{ width: isExpanded ? 200 : 'auto' }}
      >
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-3 py-2 w-full hover:bg-amber-900/20 transition-colors"
        >
          <Users size={14} className="text-amber-500" />
          <span className="text-xs font-bold text-amber-200 tracking-wide uppercase">
            Crew
          </span>
          <span className="ml-auto text-[11px] text-amber-500/60 font-mono">
            {activeCrew.length}/{totalCrew}
          </span>
        </button>

        {/* Compact: avatar row */}
        {!isExpanded && (
          <div className="flex items-center gap-0.5 px-2 pb-2 flex-wrap">
            <AnimatePresence>
              {activeCrew.map(member => (
                <motion.div
                  key={member.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="w-7 h-7 rounded-full bg-stone-800 border border-stone-600 flex items-center justify-center text-sm"
                  title={`${member.name} (Ep ${member.joinEp})`}
                >
                  {CREW_EMOJI[member.name] || '⭐'}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Expanded: full list */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-stone-800/50"
            >
              {crew.map(member => {
                const isActive =
                  member.joinEp <= currentEpisode &&
                  (!member.leaveEp || member.leaveEp >= currentEpisode);
                const hasJoined = member.joinEp <= currentEpisode;
                return (
                  <div
                    key={member.name}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs transition-all ${
                      isActive
                        ? 'text-amber-100'
                        : hasJoined
                          ? 'text-stone-600 line-through'
                          : 'text-stone-700'
                    }`}
                  >
                    <span
                      className={`text-base ${!isActive ? 'grayscale opacity-40' : ''}`}
                    >
                      {CREW_EMOJI[member.name] || '⭐'}
                    </span>
                    <span className="font-medium flex-1">{member.name}</span>
                    <span className="text-[10px] text-stone-500 font-mono">
                      Ep {member.joinEp}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
