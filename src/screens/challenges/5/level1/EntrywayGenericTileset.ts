import { CanvasMetadata } from '@/shared/utils/maze/TilesetExtractor';
import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';

const EMP = 1227;
export class EntrywayGenericTileset extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
      {
        name: 'Border',
        columns: 16,
        rows: 78,
        tileSize: 16,
        mappedColumns: 12,
      },
      tileset,
    );
  }

  public getTiles(): number[][] {
    return [
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, 676, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, 692, EMP, EMP, EMP, EMP, 43, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 59, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
    ];
  }

  public getCollidingTiles(): number[] {
    return [];
  }
}
