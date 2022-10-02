// @ts-nocheck
import React from 'react';
import Cube from './Cube';
import { useAppSelector } from '../store/hooks';
import { selectCubes } from '../store/gameSlice';

const Cubes: React.FC = () => {
  const cubes = useAppSelector(selectCubes);

  return cubes.map(({ key, pos, texture }) => {
    return <Cube key={key} position={pos} texture={texture} />;
  });
};

export default Cubes;
