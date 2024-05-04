import { CanvasMetadata, TilesetExtractor, TilesetMetadata } from './TilesetExtractor';
import { Direction, Position } from './playerDrawer';

export abstract class TilesetStaticTransposer {
  canvasMetadata: CanvasMetadata;
  tilesetMetadata: TilesetMetadata;
  tileset: HTMLImageElement;
  scale: number;

  constructor(
    canvasMetadata: CanvasMetadata,
    tilesetMetadata: TilesetMetadata,
    tileset: HTMLImageElement,
  ) {
    this.canvasMetadata = canvasMetadata;
    this.tilesetMetadata = tilesetMetadata;
    this.tileset = tileset;
    // to avoid artifacts, scale should NEVER be a floating point number
    // actually, to avoid artifacts, scale should generate a number that's not a floating point number
    // so as long as the canvas width is divisible by tileHeight (16) and this.tilesetMetadata.mappedColumns, we should be good
    this.scale =
      this.canvasMetadata.width / tilesetMetadata.tileSize / this.tilesetMetadata.mappedColumns;
  }

  public abstract getTiles(): number[][];

  public abstract getCollidingTiles(): number[];

  public transpose(canvas: CanvasRenderingContext2D) {
    const tiles = this.getTiles();
    const extractor = new TilesetExtractor(this.canvasMetadata, this.tilesetMetadata, tiles);

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
          c * tileWidth * this.scale,
          r * tileHeight * this.scale,
          tileWidth * this.scale,
          tileHeight * this.scale,
        );
      }
    }
  }

  public isColliding(playerPosition: Position, playerDirection: Direction): boolean {
    const tiles = this.getTiles();

    // translate position to tilemap x and y
    const scale = Math.round(
      // 2?
      this.canvasMetadata.width / this.tilesetMetadata.tileSize / tiles[0].length,
    );
    const playerCenter: Position = {
      x: playerPosition.x + 32,
      y: playerPosition.y + 32,
    };
    const translated: Position = {
      x: Math.round(playerCenter.x / (scale * this.tilesetMetadata.tileSize)),
      y: Math.round(playerCenter.y / (scale * this.tilesetMetadata.tileSize)),
    };

    // create increments based on direction
    const rowIncrement = playerDirection === 'LEFT' ? -1 : playerDirection === 'RIGHT' ? 1 : 0;
    const colIncrement =
      playerDirection === 'FORWARD' ? -1 : playerDirection === 'BACKWARD' ? 1 : 0;
    const newX = translated.y + colIncrement;
    const newY = translated.x + rowIncrement;
    // edge cases
    if (newX >= tiles.length) {
      console.log('[Tileset] colliding with edge', this.tilesetMetadata.name);
      return true;
    }
    if (newY >= tiles[newX].length) {
      console.log('[Tileset] colliding with edge', this.tilesetMetadata.name);
      return true;
    }

    // actual colision check
    const newTile = tiles[newX][newY];
    if (this.getCollidingTiles().includes(newTile)) {
      console.log('[Tileset] colliding with ', this.tilesetMetadata.name);
      return true;
    }
    return false;
  }
}
