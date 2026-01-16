import { useCallback } from 'react';
import { useStore } from 'jotai';
import { snakeAtom, newHeadAtom, gameStatusAtom } from '../../atoms';

export const useCheckSelfCollision = () => {
  const store = useStore();

  return useCallback(() => {
    const snake = store.get(snakeAtom);
    const newHead = store.get(newHeadAtom);

    const hitSelf = snake.some(
      (segment) => segment.x === newHead.x && segment.y === newHead.y
    );

    if (hitSelf) {
      store.set(gameStatusAtom, 'GAME_OVER');
      return true;
    }
    return false;
  }, [store]);
};
