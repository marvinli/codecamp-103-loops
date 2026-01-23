import { useSetAtom } from "jotai";
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
	const setSnake = useSetAtom(snakeAtom);
	const setDirection = useSetAtom(directionAtom);
	const setGameStatus = useSetAtom(gameStatusAtom);
	const setEatenStates = useSetAtom(eatenStatesAtom);
	const setIsChomping = useSetAtom(isChompingAtom);
	const setFood = useSetAtom(foodAtom);
	const setStateQueue = useSetAtom(stateQueueAtom);
	const setCurrentState = useSetAtom(currentStateAtom);

	return useCallback(() => {
		const shuffledStates = shuffleArray([...states]);

		setSnake([
			{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) },
			{ x: Math.floor(GRID_SIZE / 2) - 1, y: Math.floor(GRID_SIZE / 2) },
		]);
		setDirection("RIGHT");
		setGameStatus("PAUSED");
		setEatenStates([]);
		setIsChomping(false);
		setStateQueue(shuffledStates.slice(1));
		setFood({
			x: Math.floor(Math.random() * GRID_SIZE),
			y: Math.floor(Math.random() * GRID_SIZE),
			state: shuffledStates[0],
		});
		setCurrentState(null);
	}, [
		setSnake,
		setDirection,
		setGameStatus,
		setEatenStates,
		setIsChomping,
		setFood,
		setStateQueue,
		setCurrentState,
	]);
};
