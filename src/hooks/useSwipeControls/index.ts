import { useStore } from "jotai";
import { useEffect, useRef } from "react";
import { type Direction, directionAtom, gameStatusAtom } from "../../atoms";
import { useResetGame } from "../useResetGame";

const SWIPE_THRESHOLD = 30;

export const useSwipeControls = () => {
	const store = useStore();
	const resetGame = useResetGame();
	const touchStartRef = useRef<{ x: number; y: number } | null>(null);

	useEffect(() => {
		const handleTouchStart = (event: TouchEvent) => {
			const touch = event.touches[0];
			touchStartRef.current = { x: touch.clientX, y: touch.clientY };
		};

		const handleTouchEnd = (event: TouchEvent) => {
			if (!touchStartRef.current) return;

			const status = store.get(gameStatusAtom);

			if (status === "PAUSED") {
				store.set(gameStatusAtom, "PLAYING");
				touchStartRef.current = null;
				return;
			}

			if (status === "GAME_OVER") {
				resetGame();
				touchStartRef.current = null;
				return;
			}

			const touch = event.changedTouches[0];
			const deltaX = touch.clientX - touchStartRef.current.x;
			const deltaY = touch.clientY - touchStartRef.current.y;

			if (
				Math.abs(deltaX) < SWIPE_THRESHOLD &&
				Math.abs(deltaY) < SWIPE_THRESHOLD
			) {
				touchStartRef.current = null;
				return;
			}

			const direction = store.get(directionAtom);
			let newDirection: Direction | null = null;

			if (Math.abs(deltaX) > Math.abs(deltaY)) {
				if (deltaX > 0 && direction !== "LEFT") {
					newDirection = "RIGHT";
				} else if (deltaX < 0 && direction !== "RIGHT") {
					newDirection = "LEFT";
				}
			} else {
				if (deltaY > 0 && direction !== "UP") {
					newDirection = "DOWN";
				} else if (deltaY < 0 && direction !== "DOWN") {
					newDirection = "UP";
				}
			}

			if (newDirection) {
				store.set(directionAtom, newDirection);
			}

			touchStartRef.current = null;
		};

		window.addEventListener("touchstart", handleTouchStart, { passive: true });
		window.addEventListener("touchend", handleTouchEnd, { passive: true });

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, [store, resetGame]);
};
