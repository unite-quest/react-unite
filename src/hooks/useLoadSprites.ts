import { MutableRefObject, useEffect, useRef, useState } from 'react';
import characterArmor from '../assets/maze/armor.png';
import borders from '../assets/maze/background/borders.png';
import floors from '../assets/maze/background/floors.png';
import walls from '../assets/maze/background/walls.png';
import characterSpriteSheet from '../assets/maze/character-base.png';
import characterHair from '../assets/maze/hair.png';
import tilemap from '../assets/maze/hospital.png';

export function useLoadSprites(): {
  tilesetLoaded: boolean;
  tileset: MutableRefObject<HTMLImageElement>;
  borders: MutableRefObject<HTMLImageElement>;
  floors: MutableRefObject<HTMLImageElement>;
  walls: MutableRefObject<HTMLImageElement>;
  character: {
    body: MutableRefObject<HTMLImageElement>;
    clothes: MutableRefObject<HTMLImageElement>;
    hair: MutableRefObject<HTMLImageElement>;
  };
} {
  const [tilesetLoaded, setTilesetLoaded] = useState(false);
  const floorsRef = useRef(new Image());
  const bordersRef = useRef(new Image());
  const wallsRef = useRef(new Image());
  const tilesetRef = useRef(new Image());
  const bodyRef = useRef(new Image());
  const clothesRef = useRef(new Image());
  const hairRef = useRef(new Image());

  useEffect(() => {
    tilesetRef.current.src = tilemap;
    bordersRef.current.src = borders;
    wallsRef.current.src = walls;
    floorsRef.current.src = floors;
    bodyRef.current.src = characterSpriteSheet;
    clothesRef.current.src = characterArmor;
    hairRef.current.src = characterHair;

    const imagesLoaded = Promise.all([
      new Promise(resolve => (bordersRef.current.onload = resolve)),
      new Promise(resolve => (wallsRef.current.onload = resolve)),
      new Promise(resolve => (floorsRef.current.onload = resolve)),
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
    borders: bordersRef,
    walls: wallsRef,
    floors: floorsRef,
    tileset: tilesetRef,
    character: {
      body: bodyRef,
      clothes: clothesRef,
      hair: hairRef,
    },
  };
}
