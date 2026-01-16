import { useEffect } from 'react';
import { useStore } from 'jotai';
import { gameStatusAtom } from '../../atoms';
import { useCalculateNewHead } from './calculateNewHead';
import { useCheckWallCollision } from './checkWallCollision';
import { useCheckSelfCollision } from './checkSelfCollision';
import { useHandleFood } from './handleFood';

const GAME_SPEED = 150;

export const useGameLoop = () => {
  const store = useStore();

  const calculateNewHead = useCalculateNewHead();
  const checkWallCollision = useCheckWallCollision();
  const checkSelfCollision = useCheckSelfCollision();
  const handleFood = useHandleFood();

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (store.get(gameStatusAtom) !== 'PLAYING') return;

      calculateNewHead();
      if (checkWallCollision()) return;
      if (checkSelfCollision()) return;
      handleFood();
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [store, calculateNewHead, checkWallCollision, checkSelfCollision, handleFood]);
};
