import Grid from './Grid'
import { useGameLoop } from '../../hooks/useGameLoop'
import { useKeyboardControls } from '../../hooks/useKeyboardControls'
import './App.css'

function App() {
  // Initialize game loop
  useGameLoop();

  // Initialize keyboard controls
  useKeyboardControls();

  return (
    <div className="game-container">
      <Grid />
    </div>
  );
}

export default App
