import { CanvasMetadata, MappedTileMetadata } from '@/shared/utils/maze/TilesetExtractor';
import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { EntrywayBorderTileset } from 'src/screens/challenges/5/level1/EntrywayBorderTileset';
import { EntrywayFloorTileset } from 'src/screens/challenges/5/level1/EntrywayFloorTileset';
import { EntrywayHospitalTileset } from 'src/screens/challenges/5/level1/EntrywayHospitalTileset';
import { EntrywayWallTileset } from 'src/screens/challenges/5/level1/EntrywayWallTileset';
import { CorridorsBorderTileset } from 'src/screens/challenges/5/level2/CorridorsBorderTileset';
import { CorridorsFloorTileset } from 'src/screens/challenges/5/level2/CorridorsFloorTileset';
import { CorridorsHospitalTileset } from 'src/screens/challenges/5/level2/CorridorsHospitalTileset';
import { CorridorsWallTileset } from 'src/screens/challenges/5/level2/CorridorsWallTileset';
import characterArmor from '../../assets/maze/armor.png';
import borders from '../../assets/maze/background/borders.png';
import floors from '../../assets/maze/background/floors.png';
import hospitalElements from '../../assets/maze/background/hospital.png';
import walls from '../../assets/maze/background/walls.png';
import characterSpriteSheet from '../../assets/maze/character-base.png';
import characterHair from '../../assets/maze/hair.png';

function getMappedTileMetadata(questionId: number): MappedTileMetadata {
  if (questionId === 0) {
    return {
      columnLength: 12,
      tileSize: 16,
    };
  }
  if (questionId === 1) {
    return {
      columnLength: 12,
      tileSize: 16,
    };
  }
  return {
    columnLength: 12,
    tileSize: 16,
  };
}

export function useLoadSprites(
  questionId: number,
  canvasMetadata: CanvasMetadata,
): {
  tilesetLoaded: boolean;
  tileMetadata: {
    columnLength: number;
    tileSize: number;
  };
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
      if (questionId === 0) {
        setTilesets([
          new EntrywayFloorTileset(canvasMetadata, floorsRef.current),
          new EntrywayBorderTileset(canvasMetadata, bordersRef.current),
          new EntrywayWallTileset(canvasMetadata, wallsRef.current),
          new EntrywayHospitalTileset(canvasMetadata, elementsRef.current),
        ]);
      } else if (questionId === 1) {
        setTilesets([
          new CorridorsFloorTileset(canvasMetadata, floorsRef.current),
          new CorridorsBorderTileset(canvasMetadata, bordersRef.current),
          new CorridorsWallTileset(canvasMetadata, wallsRef.current),
          new CorridorsHospitalTileset(canvasMetadata, elementsRef.current),
        ]);
      }
    });
  }, [canvasMetadata, questionId]);

  useEffect(() => {
    console.log('Rendering tiles at a scale of ', tilesets?.[0]?.scale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tilesetLoaded]);

  return {
    tilesetLoaded,
    staticTilesets: tilesets,
    character: {
      body: bodyRef,
      clothes: clothesRef,
      hair: hairRef,
    },
    tileMetadata: getMappedTileMetadata(questionId),
  };
}
