import React from 'react';
import { usePlane } from '@react-three/cannon';

import { ThreeEvent } from '@react-three/fiber';
import { useAppDispatch } from '../store/hooks';
import { addCube } from '../store/gameSlice';

import textures from '../images/textures';

const Ground: React.FC = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI * 0.5, 0, 0],
    position: [0, -0.5, 0],
  }));

  const dispatch = useAppDispatch();

  textures.groundTexture.repeat.set(100, 100);

  const GroundClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val));
    dispatch(addCube({ x, y, z }));
  };

  return (
    // @ts-ignore
    <mesh ref={ref} onClick={GroundClick}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={textures.groundTexture} />
    </mesh>
  );
};

export default Ground;
