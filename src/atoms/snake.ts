import { atom } from 'jotai';
import { GRID_SIZE } from './grid';

export interface Position {
  x: number;
  y: number;
}

// Snake atom - stores the positions of all snake segments
export const snakeAtom = atom<Position[]>([
  { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }
]);
