import { useStore } from "jotai";
import { useCallback } from "react";
import {
	currentStateAtom,
	directionAtom,
	eatenStatesAtom,
	foodAtom,
	GRID_SIZE,
	gameStatusAtom,
	isChompingAtom,
	snakeAtom,
	stateQueueAtom,
} from "../../atoms";
import { shuffleArray, states } from "../../data/states";

export const useResetGame = () => {
	const store = useStore();

	return useCallback(() => {
		const shuffledStates = shuffleArray([...states]);

		store.set(snakeAtom, [
			{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) },
			{ x: Math.floor(GRID_SIZE / 2) - 1, y: Math.floor(GRID_SIZE / 2) },
		]);
		store.set(directionAtom, "RIGHT");
		store.set(gameStatusAtom, "PAUSED");
		store.set(eatenStatesAtom, []);
		store.set(isChompingAtom, false);
		store.set(stateQueueAtom, shuffledStates.slice(1));
		store.set(foodAtom, {
			x: Math.floor(Math.random() * GRID_SIZE),
			y: Math.floor(Math.random() * GRID_SIZE),
			state: shuffledStates[0],
		});
		store.set(currentStateAtom, null);
	}, [store]);
};
