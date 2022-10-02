import Cube from '../classes/Cube';

export interface IGame {
  texture: string;
  cubes: Cube[];
}

export interface IPosition {
  x: number;
  y: number;
  z: number;
}
