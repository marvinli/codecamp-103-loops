import { atom } from 'jotai';

export type GameStatus = 'PLAYING' | 'PAUSED' | 'GAME_OVER';

// Game status atom - tracks current state of the game
export const gameStatusAtom = atom<GameStatus>('PLAYING');
