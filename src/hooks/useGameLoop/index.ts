import { useStore } from "jotai";
import { useEffect } from "react";
import { gameStatusAtom } from "../../atoms";
import { useCheckSelfCollision } from "./checkSelfCollision";
import { useCheckWallCollision } from "./checkWallCollision";
import { useEatIfFood } from "./eatIfFood";
import { useGetNewHeadPosition } from "./getNewHeadPosition";
import { useSpawnNewFood } from "./spawnNewFood";

const GAME_SPEED = 150;

export const useGameLoop = () => {
	const store = useStore();

	const getNewHeadPosition = useGetNewHeadPosition();
	const checkWallCollision = useCheckWallCollision();
	const checkSelfCollision = useCheckSelfCollision();
	const eatIfFood = useEatIfFood();
	const spawnNewFood = useSpawnNewFood();

	useEffect(() => {
		const gameLoop = setInterval(() => {
			if (store.get(gameStatusAtom) !== "PLAYING") return;

			getNewHeadPosition();
			if (checkWallCollision()) return;
			if (checkSelfCollision()) return;
			if (eatIfFood()) spawnNewFood();
		}, GAME_SPEED);

		return () => clearInterval(gameLoop);
	}, [
		store,
		getNewHeadPosition,
		checkWallCollision,
		checkSelfCollision,
		eatIfFood,
		spawnNewFood,
	]);
};
