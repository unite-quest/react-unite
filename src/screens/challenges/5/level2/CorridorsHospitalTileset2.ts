import { CanvasMetadata } from '@/shared/utils/maze/TilesetExtractor';
import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';

const EMP = 1687;
export class CorridorsHospitalTileset2 extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
      {
        name: 'Hospital Elements 2',
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
      [EMP, 241, 327, 190, 191, 673, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 257, 343, 236, 237, 689, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 329, 273, 275, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 345, 289, 290, EMP, EMP, EMP, 295, 327, 295, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, 329, 311, 343, 311, 226, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, 345, EMP, 623, EMP, 242, EMP],
      [EMP, EMP, EMP, 594, EMP, 597, 598, EMP, EMP, EMP, 492, EMP],
      [EMP, EMP, EMP, 610, EMP, 613, 614, EMP, EMP, 623, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, 631, 632, EMP, EMP, 639, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, 647, 648, EMP, EMP, 655, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, 663, 664, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 570, EMP],
      [EMP, 663, 664, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP,  34, EMP, EMP, EMP, EMP, EMP, EMP, 1086, EMP, EMP, EMP],
      [EMP,  50, EMP, EMP, EMP, EMP, EMP, EMP, 1102, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 226, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 242, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
    ];
  }

  public getCollidingTiles(): number[] {
    return [241, 295, 21, 6, 7, 8, 22, 24, 226, 242];
  }
}
