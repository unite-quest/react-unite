import { CanvasMetadata, TilesetExtractor, TilesetMetadata } from './TilesetExtractor';
import { Direction, Position } from './maze/playerDrawer';

export abstract class TilesetStaticTransposer {
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
        // to avois artifacts, scale should NEVER be a floating point number
        const scale = Math.round(this.canvasMetadata.width / tileHeight / this.tiles[r].length);

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
    // translate position to tilemap x and y
    const scale = Math.round(
      // 2?
      this.canvasMetadata.width / this.tilesetMetadata.tileSize / this.tiles[0].length,
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
    if (newX >= this.tiles.length) {
      return true;
    }
    if (newY >= this.tiles[newX].length) {
      return true;
    }

    // actual colision check
    const newTile = this.tiles[newX][newY];
    if (this.tilesetMetadata.playerColidesWithTiles.includes(newTile)) {
      console.log('[Tileset] colliding with ', this.tilesetMetadata.name);
      return true;
    }
    return false;
  }
}
