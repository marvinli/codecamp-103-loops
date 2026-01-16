import { useAtomValue } from 'jotai';
import { snakeAtom, gridSizeAtom, foodAtom } from '../../../atoms';
import './Grid.css';

function Grid() {
  const snake = useAtomValue(snakeAtom);
  const gridSize = useAtomValue(gridSizeAtom);
  const food = useAtomValue(foodAtom);

  const renderGrid = () => {
    const cells = [];

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // Check if this cell contains the snake head
        const isSnakeHead = snake[0].x === col && snake[0].y === row;

        // Check if this cell contains snake body
        const isSnakeBody = snake.slice(1).some(
          (segment) => segment.x === col && segment.y === row
        );

        // Check if this cell contains food
        const isFood = food.x === col && food.y === row;

        let cellClass = 'cell';
        if (isSnakeHead) cellClass += ' snake-head';
        if (isSnakeBody) cellClass += ' snake-body';
        if (isFood) cellClass += ' food';

        cells.push(
          <div
            key={`${row}-${col}`}
            className={cellClass}
          >
            {isFood && (
              <img src={food.state.flag} alt="state flag" className="food-flag" />
            )}
          </div>
        );
      }
    }

    return cells;
  };

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`
      }}
    >
      {renderGrid()}
    </div>
  );
}

export default Grid;
