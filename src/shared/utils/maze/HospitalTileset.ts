import { CanvasMetadata } from '../TilesetExtractor';
import { TilesetStaticTransposer } from '../TilesetStaticTransposer';

const EMP = 1687;
export class HospitalTileset extends TilesetStaticTransposer {
  constructor(questionId: number, canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      questionId,
      canvasMetadata,
      {
        name: 'Hospital Elements',
        columns: 16,
        rows: 107,
        tileSize: 16,
      },
      tileset,
    );
  }

  public getTiles(): number[][] {
    if (this.questionId === 0) {
      return [
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, 33, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 5, EMP, EMP, EMP, 8, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 21, 6, 7, 22, 24, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 37, 38, 39, 39, 40, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 154, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 170, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 186, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 297, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 313, EMP, EMP, EMP, EMP, 226, EMP, EMP, EMP, EMP, EMP],
        [EMP, 241, EMP, EMP, EMP, EMP, 242, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
      ];
    }
    if (this.questionId === 1) {
      return [
        [EMP, EMP, EMP, 434, 435, EMP, EMP, EMP, EMP, 336, 337, EMP],
        [EMP, 442, 443, 450, 451, EMP, EMP, EMP, EMP, 352, 353, EMP],
        [EMP, 458, 459, 466, 467, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 472, 473, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, 339, 340, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, EMP, EMP, 355, 356, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
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
    if (this.questionId === 0) {
      return [241, 295, 21, 6, 7, 8, 22, 24, 226, 242];
    }
    return [];
  }
}
