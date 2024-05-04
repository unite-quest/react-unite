import { CanvasMetadata } from '../TilesetExtractor';
import { TilesetStaticTransposer } from '../TilesetStaticTransposer';

const EMP = 1222;
export class BorderTileset extends TilesetStaticTransposer {
  constructor(questionId: number, canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      questionId,
      canvasMetadata,
      {
        name: 'Border',
        columns: 45,
        rows: 10,
        tileSize: 16,
      },
      tileset,
    );
  }

  public getTiles(): number[][] {
    if (this.questionId === 0) {
      return [
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [51, 52, 52, 52, 52, 52, 53, EMP, EMP, EMP, EMP, EMP],
        [96, EMP, EMP, EMP, EMP, EMP, 48, 52, 52, 52, 52, EMP],
        [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 477, EMP],
        [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 477, EMP],
        [96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 477, EMP],
        [96, EMP, EMP, EMP, EMP, EMP, EMP, 50, 52, 52, 52, EMP],
        [96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP, EMP],
        [96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP, EMP],
        [96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP, EMP],
        [96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP, EMP],
        [96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP, EMP],
        [141, 52, 49, EMP, EMP, EMP, 50, 143, EMP, EMP, EMP, EMP],
        [EMP, EMP, 96, EMP, EMP, EMP, 98, EMP, EMP, EMP, EMP, EMP],
      ];
    }
    if (this.questionId === 1) {
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
    return [];
  }

  public getCollidingTiles(): number[] {
    return [48, 49, 50, 51, 52, 53, 96, 98, 141, 143];
  }
}
