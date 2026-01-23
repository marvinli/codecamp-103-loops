import type { getDefaultStore } from "jotai";
import { foodAtom, GRID_SIZE, snakeAtom, stateQueueAtom } from "../../atoms";
import type { Food } from "../../atoms/food";
import { shuffleArray, states } from "../../data/states";

type Store = ReturnType<typeof getDefaultStore>;

export const spawnNewFood = (store: Store) => {
	const snake = store.get(snakeAtom);

	// Get next state from queue
	let queue = store.get(stateQueueAtom);
	if (queue.length === 0) {
		queue = shuffleArray([...states]);
	}
	const [nextState, ...remainingQueue] = queue;
	store.set(stateQueueAtom, remainingQueue);

	// Generate new food position with next state
	let newFood: Food;
	do {
		newFood = {
			x: Math.floor(Math.random() * GRID_SIZE),
			y: Math.floor(Math.random() * GRID_SIZE),
			state: nextState,
		};
	} while (
		snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
	);
	store.set(foodAtom, newFood);
};
