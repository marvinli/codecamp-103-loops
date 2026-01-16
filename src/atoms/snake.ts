import { atom } from 'jotai';
import { GRID_SIZE } from './grid';
import type { StateInfo } from '../data/states';

export interface Position {
  x: number;
  y: number;
}

// Snake positions - head is first element
export const snakeAtom = atom<Position[]>([
  { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }
]);

// Eaten states in order (most recent first) - maps to body segments
export const eatenStatesAtom = atom<StateInfo[]>([]);
