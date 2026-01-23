import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { type Direction, directionAtom, gameStatusAtom } from "../../atoms";

const SWIPE_THRESHOLD = 30; // Minimum distance in pixels to register a swipe

export const useSwipeControls = () => {
	const [direction, setDirection] = useAtom(directionAtom);
	const [gameStatus, setGameStatus] = useAtom(gameStatusAtom);
	const touchStartRef = useRef<{ x: number; y: number } | null>(null);

	useEffect(() => {
		const handleTouchStart = (event: TouchEvent) => {
			const touch = event.touches[0];
			touchStartRef.current = { x: touch.clientX, y: touch.clientY };
		};

		const handleTouchEnd = (event: TouchEvent) => {
			if (!touchStartRef.current) return;

			const touch = event.changedTouches[0];
			const deltaX = touch.clientX - touchStartRef.current.x;
			const deltaY = touch.clientY - touchStartRef.current.y;

			// Check if swipe distance meets threshold
			if (
				Math.abs(deltaX) < SWIPE_THRESHOLD &&
				Math.abs(deltaY) < SWIPE_THRESHOLD
			) {
				touchStartRef.current = null;
				return;
			}

			let newDirection: Direction | null = null;

			// Determine swipe direction based on which axis had more movement
			if (Math.abs(deltaX) > Math.abs(deltaY)) {
				// Horizontal swipe
				if (deltaX > 0 && direction !== "LEFT") {
					newDirection = "RIGHT";
				} else if (deltaX < 0 && direction !== "RIGHT") {
					newDirection = "LEFT";
				}
			} else {
				// Vertical swipe
				if (deltaY > 0 && direction !== "UP") {
					newDirection = "DOWN";
				} else if (deltaY < 0 && direction !== "DOWN") {
					newDirection = "UP";
				}
			}

			if (newDirection) {
				setDirection(newDirection);
				if (gameStatus === "PAUSED") {
					setGameStatus("PLAYING");
				}
			}

			touchStartRef.current = null;
		};

		window.addEventListener("touchstart", handleTouchStart, { passive: true });
		window.addEventListener("touchend", handleTouchEnd, { passive: true });

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, [direction, setDirection, gameStatus, setGameStatus]);
};
