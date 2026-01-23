import { atom } from "jotai";
import type { Position } from "./snake";

export const newHeadAtom = atom<Position>({ x: 0, y: 0 });
