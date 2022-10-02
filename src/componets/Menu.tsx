// @ts-nocheck
import React from 'react';

import { useAppDispatch } from '../store/hooks';
import { resetWorld } from '../store/gameSlice';

const Menu = () => {
  const dispatch = useAppDispatch();
  const resetHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(resetWorld());
  };

  return (
    <div className="menu absolute">
      <button onClick={resetHandler}>Reset</button>
    </div>
  );
};

export default Menu;
