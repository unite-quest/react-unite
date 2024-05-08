import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';

const EMP = 1222;
export class CorridorsBorderTileset extends TilesetStaticTransposer {
  constructor(tileset: HTMLImageElement) {
    super(
      {
        name: 'Border',
        columns: 45,
        rows: 10,
        tileSize: 16,
        mappedColumns: 12,
      },
      tileset,
    );
  }

  public getTiles(): number[][] {
    return [
      [51, 52, 52, 52, 52, 52, 53, EMP, EMP, EMP, EMP, EMP],
      [96, EMP, EMP, EMP, EMP, EMP, 48, 52, 52, 52, 52, 52],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 477],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 477],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 477],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 50],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, 52, 52, 52, 52, 52, 52, 52, 52, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, 52, 52, 52, 52, 52, 52, 52, 52, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [141, 52, 52, 49, EMP, EMP, EMP, EMP, 50, 52, 52, 143],
      [EMP, EMP, EMP, 96, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
    ];
  }

  public getCollidingTiles(): number[] {
    return [48, 49, 50, 51, 52, 53, 96, 98, 141, 143];
  }
}
