import { CanvasMetadata } from '../TilesetExtractor';
import { TilesetStaticTransposer } from '../TilesetStaticTransposer';

const EMP = 585;
export class FloorTileset extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
      {
        name: 'Floor',
        columns: 15,
        rows: 40,
        tileSize: 16,
        playerColidesWithTiles: [],
      },
      tileset,
      [
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 477],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 477],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
      ],
    );
  }
}
