export type CanvasMetadata = {
  height: number;
  width: number;
};

export type TilesetMetadata = {
  name: string;
  columns: number;
  rows: number;
  tileSize: number;
  mappedColumns: number;
};

type TileMetadata = {
  sourceX: number;
  sourceY: number;
  tileHeight: number;
  tileWidth: number;
};

export class TilesetExtractor {
  canvasMetadata: CanvasMetadata;
  metadata: TilesetMetadata;
  tileMatrix: number[][];
  constructor(canvasMetadata: CanvasMetadata, metadata: TilesetMetadata, tileMatrix: number[][]) {
    this.canvasMetadata = canvasMetadata;
    this.metadata = metadata;
    this.tileMatrix = tileMatrix;
  }

  getTile(r: number, c: number): TileMetadata {
    const tile = this.tileMatrix[r][c];
    const tileRow = Math.floor(tile / this.metadata.columns);
    const tileCol = tile % this.metadata.columns;
    const sourceX = tileCol * this.metadata.tileSize;
    const sourceY = tileRow * this.metadata.tileSize;

    return {
      sourceX,
      sourceY,
      tileHeight: this.metadata.tileSize,
      tileWidth: this.metadata.tileSize,
    };
  }
}
