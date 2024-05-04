import { CanvasMetadata } from '@/shared/utils/maze/TilesetExtractor';
import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';

const EMP = 1222;
export class CorridorsBorderTileset extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
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
      [51, 52, 52, 52, 52, 52, 52, 52, 52, EMP, EMP, 53],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [EMP, EMP, EMP, EMP, EMP, 11, 52, 52, 52, 52, 52, 48],
      [EMP, EMP, EMP, EMP, EMP, 55, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, 55, EMP, EMP, EMP, EMP, EMP, EMP],
      [49, EMP, EMP, EMP, EMP, 55, EMP, EMP, EMP, EMP, EMP, 91],
      [96, EMP, EMP, EMP, EMP, 55, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, 55, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, 55, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 98],
      [141, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 143],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
    ];
  }

  public getCollidingTiles(): number[] {
    return [48, 49, 50, 51, 52, 53, 96, 98, 141, 143];
  }
}
