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
      [EMP, 855, 791, 855, 791, 855, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 887, 823, 887, 823, 887, 790, 855, 791, 855, 791, EMP],
      [EMP, 700, 700, 700, 700, 700, 822, 887, 823, 887, 823, EMP],
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
