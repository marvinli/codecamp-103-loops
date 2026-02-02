import { useStore } from "jotai";
import { useEffect } from "react";
import { gameLoop } from "./gameLoop";

const GAME_SPEED = 150;

export const useGameLoop = () => {
	const store = useStore();

	useEffect(() => {
		const intervalId = setInterval(() => gameLoop(store), GAME_SPEED);

		return () => clearInterval(intervalId);
	}, [store]);
};
