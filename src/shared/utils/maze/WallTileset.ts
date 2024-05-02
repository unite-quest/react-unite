import { CanvasMetadata } from '../TilesetExtractor';
import { TilesetStaticTransposer } from '../TilesetStaticTransposer';

const EMP = 1222;
export class WallTileset extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
      {
        columns: 32,
        rows: 40,
        tileSize: 16,
      },
      tileset,
      [
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 477],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 477],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 477],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
      ],
    );
  }
}
