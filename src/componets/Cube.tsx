// @ts-nocheck
import { useState } from 'react';
import { useBox } from '@react-three/cannon';
import textures from '../images/textures';

import { ThreeEvent } from '@react-three/fiber';
import { useAppDispatch } from '../store/hooks';
import { addCube, removeCube } from '../store/gameSlice';
const Cube: React.FC<{
  position: [x: number, y: number, z: number];
  texture: string;
}> = ({ position, texture }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }));

  const currentTexture = textures[texture + 'Texture'];
  const [hovered, setHovered] = useState(false);

  const dispatch = useAppDispatch();

  const cubeClickHandler = (e: ThreeEvent<MouseEvent> | MouseEvent) => {
    e.stopPropagation();

    const clickedFace = Math.floor(e.faceIndex ? e.faceIndex * 0.5 : 0);
    const { x, y, z } = ref.current?.position;

    if (e.altKey) {
      dispatch(removeCube({ x, y, z }));
      return;
    }
    switch (clickedFace) {
      case 0:
        dispatch(addCube({ x: x + 1, y, z }));
        break;
      case 1:
        dispatch(addCube({ x: x - 1, y, z }));

        break;
      case 2:
        dispatch(addCube({ x, y: y + 1, z }));

        break;
      case 3:
        dispatch(addCube({ x, y: y - 1, z }));

        break;
      case 4:
        dispatch(addCube({ x, y, z: z + 1 }));

        break;

      default:
        dispatch(addCube({ x, y, z: z - 1 }));
    }
  };

  const pointerMoveHandler = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();

    setHovered(true);
  };
  const pointerOutHandler = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
  };

  return (
    <mesh
      ref={ref}
      onClick={cubeClickHandler}
      onPointerMove={pointerMoveHandler}
      onPointerOut={pointerOutHandler}
    >
      <boxGeometry attach="geometry" />

      <meshStandardMaterial
        attach="material"
        map={currentTexture}
        transparent={true}
        opacity={texture === 'glass' ? 0.7 : 1}
        color={hovered ? 'grey' : 'white'}
      />
    </mesh>
  );
};

export default Cube;
