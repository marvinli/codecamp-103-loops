import { useStore } from "jotai";
import { useCallback } from "react";
import { directionAtom, newHeadAtom, snakeAtom } from "../../atoms";

export const useGetNewHeadPosition = () => {
	const store = useStore();

	return useCallback(() => {
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
	}, [store]);
};
