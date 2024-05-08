import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';
import { useEffect, useRef, useState } from 'react';
import { EntrywayBorderTileset } from 'src/screens/challenges/5/level1/EntrywayBorderTileset';
import { EntrywayFloorTileset } from 'src/screens/challenges/5/level1/EntrywayFloorTileset';
import { EntrywayGenericTileset } from 'src/screens/challenges/5/level1/EntrywayGenericTileset';
import { EntrywayHospitalTileset } from 'src/screens/challenges/5/level1/EntrywayHospitalTileset';
import { EntrywayHospitalTileset2 } from 'src/screens/challenges/5/level1/EntrywayHospitalTileset2';
import { EntrywayWallTileset } from 'src/screens/challenges/5/level1/EntrywayWallTileset';
import borders from '../../assets/maze/background/borders.png';
import floors from '../../assets/maze/background/floors.png';
import generic from '../../assets/maze/background/generic.png';
import hospitalElements from '../../assets/maze/background/hospital.png';
import walls from '../../assets/maze/background/walls.png';
import { TilePositioning } from './basePosition';

export function useScenario(questionId: number): {
  loaded: boolean;
  positioning: TilePositioning[];
  render: (canvas: CanvasRenderingContext2D) => void;
} {
  const [tilesets, setTilesets] = useState<TilesetStaticTransposer[]>([]);
  const [tilesetLoaded, setTilesetLoaded] = useState(false);
  const floorsRef = useRef(new Image());
  const genericRef = useRef(new Image());
  const bordersRef = useRef(new Image());
  const wallsRef = useRef(new Image());
  const elementsRef = useRef(new Image());

  useEffect(() => {
    elementsRef.current.src = hospitalElements;
    genericRef.current.src = generic;
    bordersRef.current.src = borders;
    wallsRef.current.src = walls;
    floorsRef.current.src = floors;

    const imagesLoaded = Promise.all([
      new Promise(resolve => (bordersRef.current.onload = resolve)),
      new Promise(resolve => (genericRef.current.onload = resolve)),
      new Promise(resolve => (wallsRef.current.onload = resolve)),
      new Promise(resolve => (floorsRef.current.onload = resolve)),
      new Promise(resolve => (elementsRef.current.onload = resolve)),
    ]);

    imagesLoaded.then(() => {
      setTilesetLoaded(true);
      // this needs to be here otherwise an infinite react hook loop happens?!
      if (questionId === 0) {
        setTilesets([
          new EntrywayFloorTileset(floorsRef.current),
          new EntrywayBorderTileset(bordersRef.current),
          new EntrywayWallTileset(wallsRef.current),
          new EntrywayHospitalTileset(elementsRef.current),
          new EntrywayHospitalTileset2(elementsRef.current),
          new EntrywayGenericTileset(genericRef.current),
        ]);
      } else if (questionId === 1) {
        // TODO after
      }
    });
  }, [questionId]);

  const render = (canvas: CanvasRenderingContext2D) => {
    for (const tileset of tilesets) {
      tileset.render(canvas);
    }
  };

  return {
    loaded: tilesetLoaded,
    positioning: [],
    render,
  };
}
