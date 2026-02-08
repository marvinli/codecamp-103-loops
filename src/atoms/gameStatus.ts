import { atom } from "jotai";

export type GameStatus = "PLAYING" | "PAUSED" | "GAME_OVER";

// Game status atom - tracks current state of the game
export const gameStatusAtom = atom<GameStatus>("PAUSED");

// Tracks whether a game session has started (distinguishes initial screen from mid-game pause)
export const hasStartedAtom = atom(false);
