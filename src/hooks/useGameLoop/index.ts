import { useStore } from "jotai";
import { useEffect } from "react";
import { gameStatusAtom } from "../../atoms";
import { checkSelfCollision } from "./checkSelfCollision";
import { checkWallCollision } from "./checkWallCollision";
import { eatIfFood } from "./eatIfFood";
import { getNewHeadPosition } from "./getNewHeadPosition";
import { spawnNewFood } from "./spawnNewFood";

const GAME_SPEED = 150;

export const useGameLoop = () => {
	const store = useStore();

	useEffect(() => {
		const gameLoop = setInterval(() => {
			if (store.get(gameStatusAtom) !== "PLAYING") return;

			getNewHeadPosition(store);
			if (checkWallCollision(store)) return;
			if (checkSelfCollision(store)) return;
			if (eatIfFood(store)) spawnNewFood(store);
		}, GAME_SPEED);

		return () => clearInterval(gameLoop);
	}, [store]);
};
