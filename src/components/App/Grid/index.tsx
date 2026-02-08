import { useAtomValue } from "jotai";
import icon from "../../../assets/icon.png";
import { head, headChomp, headKo } from "../../../assets/snake";
import {
	directionAtom,
	eatenStatesAtom,
	foodAtom,
	gameStatusAtom,
	gridSizeAtom,
	isChompingAtom,
	snakeAtom,
} from "../../../atoms";
import { useResetGame } from "../../../hooks/useResetGame";
import "./Grid.css";

// CSS transforms for each direction (base image faces RIGHT)
const headTransforms = {
	RIGHT: "",
	LEFT: "scaleX(-1)",
	UP: "rotate(-90deg)",
	DOWN: "rotate(90deg)",
};

function GameGrid() {
	const snake = useAtomValue(snakeAtom);
	const eatenStates = useAtomValue(eatenStatesAtom);
	const gridSize = useAtomValue(gridSizeAtom);
	const food = useAtomValue(foodAtom);
	const direction = useAtomValue(directionAtom);
	const isChomping = useAtomValue(isChompingAtom);
	const gameStatus = useAtomValue(gameStatusAtom);
	const resetGame = useResetGame();

	const isGameOver = gameStatus === "GAME_OVER";
	const isPaused = gameStatus === "PAUSED";
	const score = eatenStates.length;
	const headImage = isGameOver ? headKo : isChomping ? headChomp : head;
	const headTransform = headTransforms[direction];

	const renderGrid = () => {
		const cells = [];

		for (let row = 0; row < gridSize; row++) {
			for (let col = 0; col < gridSize; col++) {
				// Check if this cell contains the snake head
				const isSnakeHead = snake[0].x === col && snake[0].y === row;

				// Find body segment index at this position (if any)
				// Body segments are at indices 1+ in snake array
				const bodyIndex = snake
					.slice(1)
					.findIndex((segment) => segment.x === col && segment.y === row);
				const isSnakeBody = bodyIndex !== -1;

				// Get the state for this body segment (eatenStates[bodyIndex])
				const bodyState = isSnakeBody ? eatenStates[bodyIndex] : null;

				// Check if this cell contains food
				const isFood = food.x === col && food.y === row;

				let cellClass = "cell";
				if (isSnakeHead) cellClass += " snake-head";
				if (isSnakeBody) cellClass += " snake-body";
				if (isFood) cellClass += " food";

				cells.push(
					<div key={`${row}-${col}`} className={cellClass}>
						{isSnakeHead && (
							<img
								src={headImage}
								alt="snake head"
								className="head-image"
								style={{ transform: headTransform }}
							/>
						)}
						{isFood && (
							<img
								src={food.state.flag}
								alt="state flag"
								className="food-flag"
							/>
						)}
						{isSnakeBody && bodyState && (
							<img
								src={bodyState.flag}
								alt="state flag"
								className="body-flag"
							/>
						)}
						{isSnakeBody && !bodyState && <div className="snake-tail" />}
					</div>,
				);
			}
		}

		return cells;
	};

	return (
		<div className="grid-wrapper">
			<div
				className="grid"
				style={{
					gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
					gridTemplateRows: `repeat(${gridSize}, 1fr)`,
				}}
			>
				{renderGrid()}
			</div>
			{isPaused && (
				<div className="paused-overlay">
					<div className="paused-content">
						<img src={icon} alt="State Snake" className="paused-icon" />
						<p className="paused-cta">Press any key to start</p>
					</div>
				</div>
			)}
			{isGameOver && (
				<div className="gameover-overlay">
					<div className="gameover-content">
						<h2>Game Over</h2>
						<p>
							You chomped {score} state{score !== 1 ? "s" : ""}!
						</p>
						<p className="restart-cta">Press any key to play again</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default GameGrid;
