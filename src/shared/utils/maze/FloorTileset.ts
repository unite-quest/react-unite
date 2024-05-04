import { CanvasMetadata } from '../TilesetExtractor';
import { TilesetStaticTransposer } from '../TilesetStaticTransposer';

const EMP = 585;
export class FloorTileset extends TilesetStaticTransposer {
  constructor(questionId: number, canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      questionId,
      canvasMetadata,
      {
        name: 'Floor',
        columns: 15,
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
        [EMP, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 477, EMP],
        [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 477, EMP],
        [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
        [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
        [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
        [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
        [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
        [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP],
      ];
    }
    if (this.questionId === 1) {
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
    return [
      // number of columns and rows is very important for scaling
      [EMP, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 477, 477, 477, 477, 477, 477],
      [EMP, 478, 478, 478, 478, 478, 478, 478, 478, 478, 477, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, 478, 478, 478, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      [EMP, EMP, EMP, 478, 478, 478, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
    ];
  }

  public getCollidingTiles(): number[] {
    return [];
  }
}
