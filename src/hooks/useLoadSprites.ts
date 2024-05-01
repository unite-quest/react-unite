import { MutableRefObject, useEffect, useRef, useState } from 'react';
import characterArmor from '../assets/maze/armor.png';
import characterSpriteSheet from '../assets/maze/character-base.png';
import characterHair from '../assets/maze/hair.png';
import tilemap from '../assets/tilemap.png';

export function useLoadSprites(): {
  tilesetLoaded: boolean;
  tileset: MutableRefObject<HTMLImageElement>;
  character: {
    body: MutableRefObject<HTMLImageElement>;
    clothes: MutableRefObject<HTMLImageElement>;
    hair: MutableRefObject<HTMLImageElement>;
  };
} {
  const [tilesetLoaded, setTilesetLoaded] = useState(false);
  const tilesetRef = useRef(new Image());
  const bodyRef = useRef(new Image());
  const clothesRef = useRef(new Image());
  const hairRef = useRef(new Image());

  useEffect(() => {
    tilesetRef.current.src = tilemap;
    bodyRef.current.src = characterSpriteSheet;
    clothesRef.current.src = characterArmor;
    hairRef.current.src = characterHair;

    const imagesLoaded = Promise.all([
      new Promise(resolve => (tilesetRef.current.onload = resolve)),
      new Promise(resolve => (bodyRef.current.onload = resolve)),
      new Promise(resolve => (clothesRef.current.onload = resolve)),
      new Promise(resolve => (hairRef.current.onload = resolve)),
    ]);
    imagesLoaded.then(() => {
      setTilesetLoaded(true);
    });
  }, []);

  return {
    tilesetLoaded,
    tileset: tilesetRef,
    character: {
      body: bodyRef,
      clothes: clothesRef,
      hair: hairRef,
    },
  };
}
