import { CanvasMetadata, TilesetExtractor, TilesetMetadata } from './TilesetExtractor';
import { Direction, Position } from './maze/playerDrawer';

export abstract class TilesetStaticTransposer {
  questionId: number;
  canvasMetadata: CanvasMetadata;
  tilesetMetadata: TilesetMetadata;
  tileset: HTMLImageElement;

  constructor(
    questionId: number,
    canvasMetadata: CanvasMetadata,
    tilesetMetadata: TilesetMetadata,
    tileset: HTMLImageElement,
  ) {
    this.questionId = questionId;
    this.canvasMetadata = canvasMetadata;
    this.tilesetMetadata = tilesetMetadata;
    this.tileset = tileset;
  }

  public abstract getTiles(): number[][];

  public abstract getCollidingTiles(): number[];

  public transpose(canvas: CanvasRenderingContext2D) {
    const tiles = this.getTiles();
    const extractor = new TilesetExtractor(this.canvasMetadata, this.tilesetMetadata, tiles);

    for (let r = 0; r < tiles.length; r++) {
      for (let c = 0; c < tiles[r].length; c++) {
        const { sourceX, sourceY, tileHeight, tileWidth } = extractor.getTile(r, c);
        // to avoid artifacts, scale should NEVER be a floating point number
        // actually, to avoid artifacts, scale should generate a number that's not a floating point number
        // so as long as the canvas width is divisible by tileHeight (16) and tiles[r].length, we should be good
        const scale = this.canvasMetadata.width / tileHeight / tiles[r].length;

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

  public isColliding(playerPosition: Position, playerDirection: Direction): boolean {
    return false;
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
