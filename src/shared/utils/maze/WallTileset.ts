import { CanvasMetadata } from '../TilesetExtractor';
import { TilesetStaticTransposer } from '../TilesetStaticTransposer';

const EMP = 1222;
export class WallTileset extends TilesetStaticTransposer {
  constructor(questionId: number, canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      questionId,
      canvasMetadata,
      {
        name: 'Walls',
        columns: 32,
        rows: 40,
        tileSize: 16,
      },
      tileset,
    );
  }

  public getTiles(): number[][] {
    if (this.questionId === 0) {
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
    if (this.questionId === 1) {
      return [
        [EMP, 1047, 1047, 1047, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 1079, 1086, 1086, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [791, 855, 792, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [823, 887, 824, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
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
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      ];
    }
    return [];
  }

  public getCollidingTiles(): number[] {
    return [];
  }
}
