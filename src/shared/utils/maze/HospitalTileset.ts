import { CanvasMetadata } from '../TilesetExtractor';
import { TilesetStaticTransposer } from '../TilesetStaticTransposer';

const EMP = 1687;
export class HospitalTileset extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
      {
        name: 'Hospital Elements',
        columns: 16,
        rows: 107,
        tileSize: 16,
        playerColidesWithTiles: [241, 295, 21, 6, 7, 8, 22, 24, 226, 242],
      },
      tileset,
      [
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, 33, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 5, EMP, EMP, EMP, 8, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 21, 6, 7, 22, 24, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 37, 38, 39, 39, 40, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 154, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 170, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 186, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 297, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 313, EMP, EMP, EMP, EMP, 226, EMP, EMP, EMP, EMP, EMP],
        [EMP, 241, EMP, EMP, EMP, EMP, 242, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      ],
    );
  }
}
