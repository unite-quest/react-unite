import { CanvasMetadata } from '@/shared/utils/maze/TilesetExtractor';
import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';

const EMP = 1222;
export class EntrywayWallTileset extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
      {
        name: 'Walls',
        columns: 32,
        rows: 40,
        tileSize: 16,
        mappedColumns: 12,
      },
      tileset,
    );
  }

  public getTiles(): number[][] {
    return [
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 971, 972, 973, EMP, 974, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 1003, 1004, 1005, EMP, 1006, 971, 972, 972, 972, 973, EMP],
      [EMP, 700, 700, 700, 700, 700, 1003, 1004, 1004, 1004, 1005, EMP],
      [EMP, 700, 700, 700, 700, 700, 700, 700, 700, 700, 700, EMP],
      [EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP, EMP],
      [EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP, EMP],
      [EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP, EMP],
      [EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP, EMP],
      [EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP, EMP],
      [EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP, EMP],
      [EMP, 700, 700, 700, 700, 700, 700, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, 700, 700, 700, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, 700, 700, 700, EMP, EMP, EMP, EMP, EMP, EMP],
    ];
  }

  public getCollidingTiles(): number[] {
    return [];
  }
}
