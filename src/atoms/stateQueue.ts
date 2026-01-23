import { atom } from "jotai";
import { type StateInfo, shuffleArray, states } from "../data/states";

// Initialize with shuffled states
export const stateQueueAtom = atom<StateInfo[]>(shuffleArray([...states]));

// Currently displayed state (after eating food)
export const currentStateAtom = atom<StateInfo | null>(null);
