import { useStore } from "jotai";
import { useEffect } from "react";
import { type Direction, directionAtom, gameStatusAtom } from "../../atoms";

export const useKeyboardControls = () => {
	const store = useStore();

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
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
				if (store.get(gameStatusAtom) === "PAUSED") {
					store.set(gameStatusAtom, "PLAYING");
				}
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [store]);
};
