// Island data processing utilities

export interface Island {
  id: string;
  name: string;
  sea: string;
  lat: number;
  lon: number;
  arc: string;
  episodes: number[];
  characters: string[];
  importance: 'Major' | 'Minor' | 'Legendary';
  visual: string;
  weather?: string;
  hasPoneglyph?: boolean;
}

export interface CrewMember {
  name: string;
  joinEp: number;
  leaveEp?: number;
}

export interface Bounty {
  ep: number;
  amount: number;
}

export const CATEGORY_COLORS = {
  Major: 0xf59e0b,
  Minor: 0x6b7280,
  Legendary: 0xef4444,
} as const;

export const getIslandById = (islands: Island[], id: string | null): Island | null => {
  if (!id) return null;
  return islands.find(i => i.id === id) || null;
};

export const getIslandsBySea = (islands: Island[], sea: string): Island[] => {
  return islands.filter(i => i.sea === sea);
};

export const getIslandsByArc = (islands: Island[], arc: string): Island[] => {
  return islands.filter(i => i.arc === arc);
};

export const getIslandsWithPoneglyph = (islands: Island[]): Island[] => {
  return islands.filter(i => i.hasPoneglyph);
};

export const filterIslands = (
  islands: Island[],
  filters: {
    sea?: string;
    arc?: string;
    importance?: string;
    hasPoneglyph?: boolean;
    searchTerm?: string;
  }
): Island[] => {
  let filtered = [...islands];

  if (filters.sea) {
    filtered = filtered.filter(i => i.sea === filters.sea);
  }

  if (filters.arc) {
    filtered = filtered.filter(i => i.arc === filters.arc);
  }

  if (filters.importance) {
    filtered = filtered.filter(i => i.importance === filters.importance);
  }

  if (filters.hasPoneglyph !== undefined) {
    filtered = filtered.filter(i => i.hasPoneglyph === filters.hasPoneglyph);
  }

  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      i =>
        i.name.toLowerCase().includes(term) ||
        i.arc.toLowerCase().includes(term) ||
        i.sea.toLowerCase().includes(term) ||
        i.characters.some(c => c.toLowerCase().includes(term))
    );
  }

  return filtered;
};

