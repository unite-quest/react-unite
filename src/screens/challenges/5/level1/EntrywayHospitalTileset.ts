import { CanvasMetadata } from '@/shared/utils/maze/TilesetExtractor';
import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';

const EMP = 1687;
export class EntrywayHospitalTileset extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
      {
        name: 'Hospital Elements',
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
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, 2, 3, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 5, 18, 19, EMP, 8, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 21, 6, 7, 22, 24, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 37, 38, 39, 39, 40, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, 155, EMP, EMP, EMP, EMP, EMP],
      [EMP, 297, EMP, EMP, EMP, EMP, 171, EMP, EMP, EMP, EMP, EMP],
      [EMP, 313, EMP, EMP, EMP, EMP, 187, EMP, EMP, EMP, EMP, EMP],
      [EMP, 297, 273, 275, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 313, 289, 290, EMP, EMP, 226, EMP, EMP, EMP, EMP, EMP],
      [EMP, 241, EMP, EMP, EMP, EMP, 242, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
    ];
  }

  public getCollidingTiles(): number[] {
    return [241, 295, 21, 6, 7, 8, 22, 226, 242, 313, 273, 289, 290, 275, 37, 38, 39];
  }
}
