import type { getDefaultStore } from "jotai";
import { gameStatusAtom } from "../../atoms";
import { checkSelfCollision } from "./checkSelfCollision";
import { checkWallCollision } from "./checkWallCollision";
import { eatIfFood } from "./eatIfFood";
import { getNewHeadPosition } from "./getNewHeadPosition";
import { spawnNewFood } from "./spawnNewFood";

type Store = ReturnType<typeof getDefaultStore>;

export const gameLoop = (store: Store) => {
	const gameStatus = store.get(gameStatusAtom);
	if (gameStatus !== "PLAYING") return;

	getNewHeadPosition(store);
	if (checkWallCollision(store)) return;
	if (checkSelfCollision(store)) return;
	if (eatIfFood(store)) spawnNewFood(store);
};
