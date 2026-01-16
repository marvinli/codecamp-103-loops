import { useCallback } from 'react';
import { useStore } from 'jotai';
import {
  snakeAtom,
  foodAtom,
  newHeadAtom,
  scoreAtom,
  GRID_SIZE,
  type Position,
} from '../../atoms';

export const useHandleFood = () => {
  const store = useStore();

  return useCallback(() => {
    const snake = store.get(snakeAtom);
    const food = store.get(foodAtom);
    const newHead = store.get(newHeadAtom);

    const ateFood = newHead.x === food.x && newHead.y === food.y;

    if (ateFood) {
      // Grow snake and update score
      const newSnake = [newHead, ...snake];
      store.set(snakeAtom, newSnake);
      store.set(scoreAtom, store.get(scoreAtom) + 10);

      // Generate new food position
      let newFood: Position;
      do {
        newFood = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        };
      } while (
        newSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
      );
      store.set(foodAtom, newFood);
    } else {
      // Move snake (remove tail)
      store.set(snakeAtom, [newHead, ...snake.slice(0, -1)]);
    }
  }, [store]);
};
