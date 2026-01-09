// Episode-related calculations and utilities

export interface Arc {
  name: string;
  startEp: number;
  endEp: number;
}

export const ARCS: Arc[] = [
  { name: 'Romance Dawn', startEp: 1, endEp: 3 },
  { name: 'Orange Town', startEp: 4, endEp: 8 },
  { name: 'Syrup Village', startEp: 9, endEp: 18 },
  { name: 'Baratie', startEp: 19, endEp: 30 },
  { name: 'Arlong Park', startEp: 31, endEp: 44 },
  { name: 'Loguetown', startEp: 45, endEp: 53 },
  { name: 'Reverse Mountain', startEp: 61, endEp: 63 },
  { name: 'Whisky Peak', startEp: 64, endEp: 67 },
  { name: 'Little Garden', startEp: 68, endEp: 77 },
  { name: 'Drum Island', startEp: 78, endEp: 91 },
  { name: 'Alabasta', startEp: 92, endEp: 130 },
  { name: 'Jaya', startEp: 144, endEp: 152 },
  { name: 'Skypiea', startEp: 153, endEp: 195 },
  { name: 'Long Ring Long Land', startEp: 207, endEp: 228 },
  { name: 'Water 7', startEp: 229, endEp: 263 },
  { name: 'Enies Lobby', startEp: 264, endEp: 312 },
  { name: 'Post-Enies Lobby', startEp: 313, endEp: 325 },
  { name: 'Thriller Bark', startEp: 337, endEp: 381 },
  { name: 'Sabaody Archipelago', startEp: 385, endEp: 405 },
  { name: 'Amazon Lily', startEp: 408, endEp: 417 },
  { name: 'Impel Down', startEp: 418, endEp: 456 },
  { name: 'Marineford', startEp: 457, endEp: 489 },
  { name: 'Post-War', startEp: 490, endEp: 516 },
  { name: 'Fishman Island', startEp: 517, endEp: 574 },
  { name: 'Punk Hazard', startEp: 579, endEp: 628 },
  { name: 'Dressrosa', startEp: 629, endEp: 746 },
  { name: 'Zou', startEp: 751, endEp: 779 },
  { name: 'Whole Cake Island', startEp: 783, endEp: 877 },
  { name: 'Reverie', startEp: 878, endEp: 889 },
  { name: 'Wano Country', startEp: 892, endEp: 1085 },
  { name: 'Egghead', startEp: 1086, endEp: 1120 },
];

export const getCurrentArc = (episode: number): Arc | null => {
  return ARCS.find(arc => episode >= arc.startEp && episode <= arc.endEp) || null;
};

export const getArcForEpisode = (episode: number): Arc | null => {
  return getCurrentArc(episode);
};

export const jumpToArc = (arcName: string): number => {
  const arc = ARCS.find(a => a.name === arcName);
  return arc ? arc.startEp : 1;
};

export const getNextEpisode = (currentEpisode: number, maxEpisode: number = 1116): number => {
  return Math.min(currentEpisode + 1, maxEpisode);
};

export const getPreviousEpisode = (currentEpisode: number, minEpisode: number = 1): number => {
  return Math.max(currentEpisode - 1, minEpisode);
};

export const formatEpisode = (episode: number): string => {
  return `Ep. ${episode}`;
};

