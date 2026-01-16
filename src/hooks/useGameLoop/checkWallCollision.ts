import { useCallback } from 'react';
import { useStore } from 'jotai';
import { newHeadAtom, gameStatusAtom, GRID_SIZE } from '../../atoms';

export const useCheckWallCollision = () => {
  const store = useStore();

  return useCallback(() => {
    const newHead = store.get(newHeadAtom);

    const hitWall =
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE;

    if (hitWall) {
      store.set(gameStatusAtom, 'GAME_OVER');
      return true;
    }
    return false;
  }, [store]);
};
