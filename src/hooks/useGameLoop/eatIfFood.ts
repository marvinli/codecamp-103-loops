import type { getDefaultStore } from "jotai";
import {
	currentStateAtom,
	eatenStatesAtom,
	foodAtom,
	isChompingAtom,
	newHeadAtom,
	scoreAtom,
	snakeAtom,
} from "../../atoms";

type Store = ReturnType<typeof getDefaultStore>;

export const eatIfFood = (store: Store) => {
	const snake = store.get(snakeAtom);
	const food = store.get(foodAtom);
	const newHead = store.get(newHeadAtom);
	const eatenStates = store.get(eatenStatesAtom);

	const ateFood = newHead.x === food.x && newHead.y === food.y;

	if (ateFood) {
		// Set chomping state
		store.set(isChompingAtom, true);

		// Set the current state to display in side panel
		store.set(currentStateAtom, food.state);

		// Add eaten state to front of list
		store.set(eatenStatesAtom, [food.state, ...eatenStates]);

		// Grow snake (keep all segments, add new head)
		store.set(snakeAtom, [{ x: newHead.x, y: newHead.y }, ...snake]);
		store.set(scoreAtom, store.get(scoreAtom) + 10);
	} else {
		// Reset chomping state
		store.set(isChompingAtom, false);

		// Move snake (remove tail)
		store.set(snakeAtom, [
			{ x: newHead.x, y: newHead.y },
			...snake.slice(0, -1),
		]);
	}

	return ateFood;
};
