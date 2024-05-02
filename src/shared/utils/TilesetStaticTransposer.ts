import { CanvasMetadata, TilesetExtractor, TilesetMetadata } from './TilesetExtractor';

export class TilesetStaticTransposer {
  canvasMetadata: CanvasMetadata;
  tilesetMetadata: TilesetMetadata;
  tileset: HTMLImageElement;
  tiles: number[][];

  constructor(
    canvasMetadata: CanvasMetadata,
    tilesetMetadata: TilesetMetadata,
    tileset: HTMLImageElement,
    tiles: number[][],
  ) {
    this.canvasMetadata = canvasMetadata;
    this.tilesetMetadata = tilesetMetadata;
    this.tileset = tileset;
    this.tiles = tiles;
  }

  public transpose(canvas: CanvasRenderingContext2D) {
    const extractor = new TilesetExtractor(this.canvasMetadata, this.tilesetMetadata, this.tiles);
    for (let r = 0; r < this.tiles.length; r++) {
      for (let c = 0; c < this.tiles[r].length; c++) {
        const { sourceX, sourceY, tileHeight, tileWidth } = extractor.getTile(r, c);
        const scale = this.canvasMetadata.width / tileHeight / this.tiles[r].length;

        canvas.drawImage(
          this.tileset,
          sourceX,
          sourceY,
          tileWidth,
          tileHeight,
          c * tileWidth * scale,
          r * tileHeight * scale,
          tileWidth * scale,
          tileHeight * scale,
        );
      }
    }
  }
}
