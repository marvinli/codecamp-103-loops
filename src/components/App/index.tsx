import { useGameLoop } from "../../hooks/useGameLoop";
import { useKeyboardControls } from "../../hooks/useKeyboardControls";
import { useSwipeControls } from "../../hooks/useSwipeControls";
import GameGrid from "./Grid";
import StatePanel from "./StatePanel";
import "./App.css";

function App() {
	// Initialize game loop
	useGameLoop();

	// Initialize keyboard controls
	useKeyboardControls();

	// Initialize swipe controls for mobile
	useSwipeControls();

	return (
		<div className="game-container">
			<StatePanel />
			<GameGrid />
		</div>
	);
}

export default App;
