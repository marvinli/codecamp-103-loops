import { atom } from "jotai";

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

// Direction atom - current direction the snake is moving
export const directionAtom = atom<Direction>("RIGHT");
