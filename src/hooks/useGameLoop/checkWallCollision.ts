import type { getDefaultStore } from "jotai";
import { GRID_SIZE, gameStatusAtom, newHeadAtom } from "../../atoms";

type Store = ReturnType<typeof getDefaultStore>;

export const checkWallCollision = (store: Store) => {
	const newHead = store.get(newHeadAtom);

	const hitWall =
		newHead.x < 0 ||
		newHead.x >= GRID_SIZE ||
		newHead.y < 0 ||
		newHead.y >= GRID_SIZE;

	if (hitWall) {
		store.set(gameStatusAtom, "GAME_OVER");
		return true;
	}
	return false;
};
