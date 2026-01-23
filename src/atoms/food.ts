import { atom } from "jotai";
import type { StateInfo } from "../data/states";
import { shuffleArray, states } from "../data/states";
import { GRID_SIZE } from "./grid";
import type { Position } from "./snake";

export type Food = Position & {
	state: StateInfo;
};

// Get the first state from a shuffled list for initial food
const initialState = shuffleArray([...states])[0];

// Helper function to generate random food position with a state
const generateInitialFood = (): Food => {
	return {
		x: Math.floor(Math.random() * GRID_SIZE),
		y: Math.floor(Math.random() * GRID_SIZE),
		state: initialState,
	};
};

// Food atom - position of the food with its state info
export const foodAtom = atom<Food>(generateInitialFood());
