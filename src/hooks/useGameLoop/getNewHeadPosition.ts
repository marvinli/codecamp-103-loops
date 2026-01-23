import type { getDefaultStore } from "jotai";
import { directionAtom, newHeadAtom, snakeAtom } from "../../atoms";

type Store = ReturnType<typeof getDefaultStore>;

export const getNewHeadPosition = (store: Store) => {
	const snake = store.get(snakeAtom);
	const direction = store.get(directionAtom);
	const head = snake[0];

	switch (direction) {
		case "UP":
			store.set(newHeadAtom, { x: head.x, y: head.y - 1 });
			break;
		case "DOWN":
			store.set(newHeadAtom, { x: head.x, y: head.y + 1 });
			break;
		case "LEFT":
			store.set(newHeadAtom, { x: head.x - 1, y: head.y });
			break;
		case "RIGHT":
			store.set(newHeadAtom, { x: head.x + 1, y: head.y });
			break;
	}
};
