import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { RootState } from './store';

import { IGame, IPosition } from '../@types/types';
import Cube from '../classes/Cube';

const initialState: IGame = {
  texture: 'dirt',
  cubes: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addCube(state, action: PayloadAction<IPosition>) {
      const { x, y, z } = action.payload;
      const key = nanoid();
      state.cubes = [...state.cubes, new Cube(key, [x, y, z], state.texture)];
    },

    removeCube(state, action: PayloadAction<IPosition>) {
      state.cubes = state.cubes.filter((cube) => {
        const { x: X, y: Y, z: Z } = action.payload;
        const [x, y, z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      });
    },
    setTexture(state, action: PayloadAction<string>) {
      state.texture = action.payload;
    },
    resetWorld(state) {
      state.cubes = [];
    },
  },
});

export const { addCube, removeCube, setTexture, resetWorld } =
  gameSlice.actions;
export const selectCubes = (state: RootState) => state.game.cubes;
export const selectTexture = (state: RootState) => state.game.texture;
export const gameReducer = gameSlice.reducer;
