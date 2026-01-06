// Globe coordinate calculations and utilities

export interface GlobeCoordinates {
  lat: number;
  lon: number;
}

export const latLonToVector3 = (
  lat: number,
  lon: number,
  radius: number = 5.1
): { x: number; y: number; z: number } => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
};

export const getGlobeRotation = (lat: number, lon: number): { x: number; y: number } => {
  return {
    y: -(lon + 180) * (Math.PI / 180) + Math.PI / 2,
    x: lat * (Math.PI / 180),
  };
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 5.1; // Globe radius
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

