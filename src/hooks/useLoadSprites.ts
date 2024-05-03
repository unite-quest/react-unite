import { CanvasMetadata } from '@/shared/utils/TilesetExtractor';
import { TilesetStaticTransposer } from '@/shared/utils/TilesetStaticTransposer';
import { BorderTileset } from '@/shared/utils/maze/BorderTileset';
import { FloorTileset } from '@/shared/utils/maze/FloorTileset';
import { HospitalTileset } from '@/shared/utils/maze/HospitalTileset';
import { WallTileset } from '@/shared/utils/maze/WallTileset';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import characterArmor from '../assets/maze/armor.png';
import borders from '../assets/maze/background/borders.png';
import floors from '../assets/maze/background/floors.png';
import hospitalElements from '../assets/maze/background/hospital.png';
import walls from '../assets/maze/background/walls.png';
import characterSpriteSheet from '../assets/maze/character-base.png';
import characterHair from '../assets/maze/hair.png';

export function useLoadSprites(
  questionId: number,
  canvasMetadata: CanvasMetadata,
): {
  tilesetLoaded: boolean;
  staticTilesets: TilesetStaticTransposer[];
  character: {
    body: MutableRefObject<HTMLImageElement>;
    clothes: MutableRefObject<HTMLImageElement>;
    hair: MutableRefObject<HTMLImageElement>;
  };
} {
  const [tilesets, setTilesets] = useState<TilesetStaticTransposer[]>([]);
  const [tilesetLoaded, setTilesetLoaded] = useState(false);
  const floorsRef = useRef(new Image());
  const bordersRef = useRef(new Image());
  const wallsRef = useRef(new Image());
  const elementsRef = useRef(new Image());
  const bodyRef = useRef(new Image());
  const clothesRef = useRef(new Image());
  const hairRef = useRef(new Image());

  useEffect(() => {
    elementsRef.current.src = hospitalElements;
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
      new Promise(resolve => (elementsRef.current.onload = resolve)),
      new Promise(resolve => (bodyRef.current.onload = resolve)),
      new Promise(resolve => (clothesRef.current.onload = resolve)),
      new Promise(resolve => (hairRef.current.onload = resolve)),
    ]);
    imagesLoaded.then(() => {
      setTilesetLoaded(true);
      // this needs to be here otherwise an infinite react hook loop happens?!
      setTilesets([
        new FloorTileset(questionId, canvasMetadata, floorsRef.current),
        new BorderTileset(questionId, canvasMetadata, bordersRef.current),
        new WallTileset(questionId, canvasMetadata, wallsRef.current),
        new HospitalTileset(questionId, canvasMetadata, elementsRef.current),
      ]);
    });
  }, [canvasMetadata, questionId]);

  return {
    tilesetLoaded,
    staticTilesets: tilesets,
    character: {
      body: bodyRef,
      clothes: clothesRef,
      hair: hairRef,
    },
  };
}
