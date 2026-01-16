import { atom } from 'jotai';
import type { Position } from './snake';
import { GRID_SIZE } from './grid';

// Helper function to generate random food position
const generateRandomFood = (): Position => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
};

// Food atom - position of the food
export const foodAtom = atom<Position>(generateRandomFood());
