import { CanvasMetadata } from '../TilesetExtractor';
import { TilesetStaticTransposer } from '../TilesetStaticTransposer';
import { Direction, Position } from './playerDrawer';

const EMP = 585;
export class FloorTileset extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
      {
        columns: 15,
        rows: 40,
        tileSize: 16,
      },
      tileset,
      [
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
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
        [EMP, EMP, EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
      ],
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isColliding(_: Position, _2: Direction): boolean {
    return false;
  }
}
