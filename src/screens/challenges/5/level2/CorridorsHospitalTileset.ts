import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';

const EMP = 1687;
export class CorridorsHospitalTileset extends TilesetStaticTransposer {
  constructor(tileset: HTMLImageElement) {
    super(
      {
        name: 'Hospital Elements 1',
        columns: 16,
        rows: 107,
        tileSize: 16,
        mappedColumns: 12,
      },
      tileset,
    );
  }

  public getTiles(): number[][] {
    return [
      [EMP, EMP, EMP, 204, 205, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, 327, 190, 191, 673, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 297, 343, 236, 237, 689, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 313, 273, 275, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 345, 289, 290, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, 597, 598, EMP, 593, 651, 652, EMP],
      [EMP, EMP, EMP, 521, 522, 613, 614, EMP, 609, 557, 558, EMP],
      [EMP, EMP, EMP, 537, 538, 629, 630, EMP, EMP, 541, 542, EMP],
      [EMP, EMP, EMP, EMP, EMP, 645, 646, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 570, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, 2, 3, EMP, EMP, 676, 677, EMP, EMP, EMP, EMP],
      [EMP, 5, 18, 19, EMP, 8, 692, 693, EMP, EMP, EMP, EMP],
      [EMP, 21, 6, 7, 22, 24, 708, 709, EMP, EMP, EMP, EMP],
      [EMP, 37, 38, 39, 39, 40, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
    ];
  }

  public getCollidingTiles(): number[] {
    return [241, 295, 21, 6, 7, 22, 226, 242];
  }
}
