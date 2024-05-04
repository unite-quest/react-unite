import { CanvasMetadata } from '@/shared/utils/maze/TilesetExtractor';
import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';

const EMP = 585;
export class CorridorsFloorTileset extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
      {
        name: 'Floor',
        columns: 15,
        rows: 40,
        tileSize: 16,
        mappedColumns: 12,
      },
      tileset,
    );
  }

  public getTiles(): number[][] {
    return [
      // number of columns and rows is very important for scaling
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 478, 478, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, 477],
      [478, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, 477],
      [478, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, 477],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
    ];
  }

  public getCollidingTiles(): number[] {
    return [];
  }
}
