import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './gameSlice';
import { Middleware } from 'redux';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

//MIDDLEWARE
// @ts-ignore
const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem('minecraftSimulator', JSON.stringify(getState()));
    return result;
  };
};

// Rehydration function

const reHydrateStore = () => {
  if (localStorage.getItem('minecraftSimulator') !== null) {
    // @ts-ignore

    return JSON.parse(localStorage.getItem('minecraftSimulator')); // re-hydrate the store
  }
};

export const store = configureStore({
  reducer: { game: gameReducer },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(localStorageMiddleware),
});
