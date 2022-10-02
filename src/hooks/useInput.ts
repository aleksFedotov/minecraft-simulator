import { useCallback, useEffect, useState } from 'react';

type keyAction = { [k: string]: string };

function actionByKey(key: string): string {
  const keyActionMap: keyAction = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
    Digit1: 'dirt',
    Digit2: 'grass',
    Digit3: 'glass',
    Digit4: 'wood',
    Digit5: 'log',
    Digit6: 'anvil',
  };

  return keyActionMap[key];
}

export const useInput = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
    anvil: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prevState) => {
        return { ...prevState, [action]: true };
      });
    }
  }, []);
  const handleKeyup = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prevState) => {
        return { ...prevState, [action]: false };
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeyDown, handleKeyup]);

  return actions;
};
