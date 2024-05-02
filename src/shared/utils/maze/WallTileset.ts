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
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, 855, 791, 855, 791, 855, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, 887, 823, 887, 823, 887, 790, 855, 791, 855, 791],
        [EMP, EMP, 700, 700, 700, 700, 700, 822, 887, 823, 887, 823],
        [EMP, EMP, 700, 700, 700, 700, 700, 700, 700, 700, 700, 700],
        [EMP, EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP],
        [EMP, EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP],
        [EMP, EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP],
        [EMP, EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP],
        [EMP, EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP],
        [EMP, EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP],
        [EMP, EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, 700, 700, 700, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, 700, 700, 700, EMP, EMP, EMP, EMP, EMP],
      ],
    );
  }
}
