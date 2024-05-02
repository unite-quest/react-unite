import { CanvasMetadata } from '../TilesetExtractor';
import { TilesetStaticTransposer } from '../TilesetStaticTransposer';

const EMP = 1222;
export class BorderTileset extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
      {
        name: 'Border',
        columns: 45,
        rows: 10,
        tileSize: 16,
        playerColidesWithTiles: [48, 49, 50, 51, 52, 53, 96, 98, 141, 143],
      },
      tileset,
      [
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 51, 52, 52, 52, 52, 52, 53, EMP, EMP, EMP, EMP],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, 48, 52, 52, 52, 52],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 477],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 477],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 477],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 50, 52, 52, 52],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP],
        [EMP, 141, 52, 49, EMP, EMP, EMP, 50, 143, EMP, EMP, EMP],
        [EMP, EMP, EMP, 96, EMP, EMP, EMP, 98, EMP, EMP, EMP, EMP],
      ],
    );
  }
}
