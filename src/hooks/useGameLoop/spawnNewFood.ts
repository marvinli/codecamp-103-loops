import { useCallback } from 'react';
import { useStore } from 'jotai';
import {
  snakeAtom,
  foodAtom,
  GRID_SIZE,
  stateQueueAtom,
} from '../../atoms';
import { type Food } from '../../atoms/food';
import { states, shuffleArray } from '../../data/states';

export const useSpawnNewFood = () => {
  const store = useStore();

  return useCallback(() => {
    const snake = store.get(snakeAtom);

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
      snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
    );
    store.set(foodAtom, newFood);
  }, [store]);
};
