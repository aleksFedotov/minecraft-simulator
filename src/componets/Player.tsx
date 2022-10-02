import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { useInput } from '../hooks/useInput';

const JUMP_FORCE = 5;
const SPEED = 4;

const Player: React.FC = () => {
  // Input hook
  const { moveBackward, moveForward, moveLeft, moveRight, jump } = useInput();

  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 1, 0],
  }));

  // Player velocity
  const vel = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => {
      vel.current = v;
    });
  }, [api.velocity]);

  // Player position
  const pos = useRef([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p;
    });
  }, [api.position]);

  useFrame(() => {
    // connect camera to current position of player
    const [px, py, pz] = pos.current;
    camera.position.copy(new Vector3(px, py, pz));

    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, vel.current[1], direction.z);
    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  return (
    // @ts-ignore
    <mesh ref={ref}></mesh>
  );
};

export default Player;
