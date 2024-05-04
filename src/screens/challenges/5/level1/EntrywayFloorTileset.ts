import { CanvasMetadata } from '@/shared/utils/maze/TilesetExtractor';
import { TilesetStaticTransposer } from '@/shared/utils/maze/TilesetStaticTransposer';

const EMP = 585;
export class EntrywayFloorTileset extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
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

  public getCollidingTiles(): number[] {
    return [];
  }
}
