import { useCallback } from 'react';
import { useStore } from 'jotai';
import {
  snakeAtom,
  eatenStatesAtom,
  foodAtom,
  newHeadAtom,
  scoreAtom,
  GRID_SIZE,
  stateQueueAtom,
  currentStateAtom,
} from '../../atoms';
import { type Food } from '../../atoms/food';
import { states, shuffleArray } from '../../data/states';

export const useHandleFood = () => {
  const store = useStore();

  return useCallback(() => {
    const snake = store.get(snakeAtom);
    const food = store.get(foodAtom);
    const newHead = store.get(newHeadAtom);
    const eatenStates = store.get(eatenStatesAtom);

    const ateFood = newHead.x === food.x && newHead.y === food.y;

    if (ateFood) {
      // Set the current state to display in side panel
      store.set(currentStateAtom, food.state);

      // Add eaten state to front of list
      store.set(eatenStatesAtom, [food.state, ...eatenStates]);

      // Grow snake (keep all segments, add new head)
      const newSnake = [{ x: newHead.x, y: newHead.y }, ...snake];
      store.set(snakeAtom, newSnake);
      store.set(scoreAtom, store.get(scoreAtom) + 10);

      // Get next state from queue
      let queue = store.get(stateQueueAtom);
      if (queue.length === 0) {
        queue = shuffleArray([...states]);
      }
      const [nextState, ...remainingQueue] = queue;
      store.set(stateQueueAtom, remainingQueue);

      // Generate new food position with next state
      let newFood: Food;
      do {
        newFood = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
          state: nextState,
        };
      } while (
        newSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
      );
      store.set(foodAtom, newFood);
    } else {
      // Move snake (remove tail)
      store.set(snakeAtom, [{ x: newHead.x, y: newHead.y }, ...snake.slice(0, -1)]);
    }
  }, [store]);
};
