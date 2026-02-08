import { useStore } from "jotai";
import { useEffect } from "react";
import { type Direction, directionAtom, gameStatusAtom } from "../../atoms";
import { useResetGame } from "../useResetGame";

export const useKeyboardControls = () => {
	const store = useStore();
	const resetGame = useResetGame();

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			const status = store.get(gameStatusAtom);

			if (status === "PAUSED") {
				event.preventDefault();
				store.set(gameStatusAtom, "PLAYING");
				return;
			}

			if (status === "GAME_OVER") {
				event.preventDefault();
				resetGame();
				return;
			}

			const direction = store.get(directionAtom);
			let newDirection: Direction | null = null;

			switch (event.key) {
				case "ArrowUp":
					if (direction !== "DOWN") {
						newDirection = "UP";
					}
					break;
				case "ArrowDown":
					if (direction !== "UP") {
						newDirection = "DOWN";
					}
					break;
				case "ArrowLeft":
					if (direction !== "RIGHT") {
						newDirection = "LEFT";
					}
					break;
				case "ArrowRight":
					if (direction !== "LEFT") {
						newDirection = "RIGHT";
					}
					break;
			}

			if (newDirection) {
				event.preventDefault();
				store.set(directionAtom, newDirection);
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [store, resetGame]);
};
