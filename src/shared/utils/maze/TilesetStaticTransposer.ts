import { TilesetExtractor, TilesetMetadata } from './TilesetExtractor';

export abstract class TilesetStaticTransposer {
  tilesetMetadata: TilesetMetadata;
  tileset: HTMLImageElement;
  applyScaling: boolean;

  constructor(
    tilesetMetadata: TilesetMetadata,
    tileset: HTMLImageElement,
    applyScaling: boolean = false,
  ) {
    this.tilesetMetadata = tilesetMetadata;
    this.tileset = tileset;
    this.applyScaling = applyScaling;
  }

  public abstract getTiles(): number[][];

  public abstract getCollidingTiles(): number[];

  public render(canvas: CanvasRenderingContext2D) {
    const tiles = this.getTiles();
    const extractor = new TilesetExtractor(this.tilesetMetadata, tiles);

    if (tiles.length === 0) {
      throw new Error('Invalid number of rows provided in getTiles');
    }

    if (tiles[0].length !== this.tilesetMetadata.mappedColumns) {
      throw new Error('Invalid number of columns provided in getTiles');
    }

    for (let r = 0; r < tiles.length; r++) {
      for (let c = 0; c < tiles[r].length; c++) {
        const { sourceX, sourceY, tileHeight, tileWidth } = extractor.getTile(r, c);

        canvas.drawImage(
          this.tileset,
          sourceX,
          sourceY,
          tileWidth,
          tileHeight,
          c * tileWidth,
          r * tileHeight,
          tileWidth,
          tileHeight,
        );
      }
    }
  }
}
