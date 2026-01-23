import type { getDefaultStore } from "jotai";
import { gameStatusAtom, newHeadAtom, snakeAtom } from "../../atoms";

type Store = ReturnType<typeof getDefaultStore>;

export const checkSelfCollision = (store: Store) => {
	const snake = store.get(snakeAtom);
	const newHead = store.get(newHeadAtom);

	const hitSelf = snake.some(
		(segment) => segment.x === newHead.x && segment.y === newHead.y,
	);

	if (hitSelf) {
		store.set(gameStatusAtom, "GAME_OVER");
		return true;
	}
	return false;
};
