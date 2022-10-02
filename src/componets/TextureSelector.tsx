// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useInput } from '../hooks/useInput';

import { dirtImg, grassImg, glassImg, logImg, woodImg } from '../images/images';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectTexture } from '../store/gameSlice';
import { setTexture } from '../store/gameSlice';
const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

const TextureSelector = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const activeTexture = useAppSelector(selectTexture);

  const { dirt, grass, glass, wood, log } = useInput();

  useEffect(() => {
    const visibiliteTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);

    return () => {
      clearTimeout(visibiliteTimeout);
    };
  }, [activeTexture]);

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      dispatch(setTexture(pressedTexture[0]));
    }
  }, [dispatch, dirt, grass, glass, wood, log]);
  return (
    visible && (
      <div className="absolute centered texture-selector">
        {Object.entries(images).map(([k, src]) => {
          return (
            <img
              key={k}
              src={src}
              alt={k}
              className={`${k === activeTexture ? 'active' : ''}`}
            />
          );
        })}
      </div>
    )
  );
};

export default TextureSelector;
