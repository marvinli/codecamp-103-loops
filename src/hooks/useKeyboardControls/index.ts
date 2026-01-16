import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { directionAtom, type Direction } from '../../atoms';

export const useKeyboardControls = () => {
  const [direction, setDirection] = useAtom(directionAtom);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      let newDirection: Direction | null = null;

      switch (event.key) {
        case 'ArrowUp':
          // Prevent moving backwards into yourself
          if (direction !== 'DOWN') {
            newDirection = 'UP';
          }
          break;
        case 'ArrowDown':
          if (direction !== 'UP') {
            newDirection = 'DOWN';
          }
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') {
            newDirection = 'LEFT';
          }
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') {
            newDirection = 'RIGHT';
          }
          break;
      }

      if (newDirection) {
        event.preventDefault(); // Prevent scrolling
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, setDirection]);
};
