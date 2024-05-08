import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';

const EMP = 585;
export class CorridorsFloorTileset extends TilesetStaticTransposer {
  constructor(tileset: HTMLImageElement) {
    super(
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
      [EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478],
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
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 478, EMP],
      [EMP, EMP, EMP, EMP, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, 478, 478, 478, 478, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
    ];
  }

  public getCollidingTiles(): number[] {
    return [];
  }
}
