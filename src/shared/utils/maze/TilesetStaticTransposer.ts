import { CanvasMetadata, TilesetExtractor, TilesetMetadata } from './TilesetExtractor';
import {
  Direction,
  PLAYER_DIMENSIONS,
  PLAYER_OFFSET_TO_ZERO,
  PLAYER_SCALE,
  Position,
} from './playerDrawer';

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

  // in absolute canvas dimensions
  private getBoundingBoxForPlayer(
    playerPosition: Position,
    direction: Direction,
    scale: number,
  ): [Position, Position] {
    const newScale = scale * PLAYER_SCALE;
    const playerZero: Position = {
      x: playerPosition.x + PLAYER_OFFSET_TO_ZERO.HORIZONTAL,
      y: playerPosition.y + PLAYER_OFFSET_TO_ZERO.VERTICAL,
    };

    if (direction === 'LEFT') {
      return [
        {
          x: playerZero.x - 4 * newScale,
          y: playerZero.y,
        },
        {
          x: playerZero.x - 4 * newScale,
          y: playerZero.y + PLAYER_DIMENSIONS.VERTICAL / 2,
        },
      ];
    }
    if (direction === 'RIGHT') {
      return [
        {
          x: playerZero.x + 8 * newScale,
          y: playerZero.y,
        },
        {
          x: playerZero.x + 8 * newScale,
          y: playerZero.y + PLAYER_DIMENSIONS.VERTICAL,
        },
      ];
    }
    if (direction === 'FORWARD') {
      return [
        {
          x: playerZero.x + PLAYER_DIMENSIONS.HORIZONTAL / 2,
          y: playerZero.y + 10 * newScale,
        },
        {
          x: playerZero.x + PLAYER_DIMENSIONS.HORIZONTAL / 2,
          y: playerZero.y + 10 * newScale,
        },
      ];
    }
    if (direction === 'BACKWARD') {
      return [
        {
          x: playerZero.x,
          y: playerZero.y + PLAYER_DIMENSIONS.VERTICAL,
        },
        {
          x: playerZero.x + PLAYER_DIMENSIONS.HORIZONTAL,
          y: playerZero.y + PLAYER_DIMENSIONS.VERTICAL,
        },
      ];
    }

    throw new Error('invalid bouding box direction!?');
  }

  private toTileMapCoordinates(position: Position, scale: number): Position {
    return {
      x: Math.round(position.x / (scale * this.tilesetMetadata.tileSize)),
      y: Math.round(position.y / (scale * this.tilesetMetadata.tileSize)),
    };
  }

  public isColliding(playerPosition: Position, playerDirection: Direction): boolean {
    const tiles = this.getTiles();
    const tilesPerRow = tiles[0].length;
    const scale = Math.round(
      this.canvasMetadata.width / this.tilesetMetadata.tileSize / tilesPerRow,
    );

    // translate position to tilemap x and y
    const [a, b] = this.getBoundingBoxForPlayer(playerPosition, playerDirection, scale);
    const pointA = this.toTileMapCoordinates(a, scale);
    const pointB = this.toTileMapCoordinates(b, scale);
    const { x: newX, y: newY } = pointA;
    const { x: newX2, y: newY2 } = pointB;

    // edge cases
    if (newY >= tiles.length) {
      console.log('[Tileset] Y colliding with edge', this.tilesetMetadata.name);
      return true;
    }
    if (newX >= tiles[newY].length) {
      console.log('[Tileset] X colliding with edge', this.tilesetMetadata.name);
      return true;
    }
    if (newY2 >= tiles.length) {
      console.log('[Tileset] Y colliding with edge 2', this.tilesetMetadata.name);
      return true;
    }
    if (newX2 >= tiles[newY2].length) {
      console.log('[Tileset] X colliding with edge 2', this.tilesetMetadata.name);
      return true;
    }
    return false;

    // actual colision check
    const newTile = tiles[newY][newX];
    if (this.getCollidingTiles().includes(newTile)) {
      console.log(`[Tileset] colliding with ${this.tilesetMetadata.name}: ${newTile}`);
      return true;
    }
    const newTile2 = tiles[newY2][newX2];
    if (this.getCollidingTiles().includes(newTile2)) {
      console.log(`[Tileset] colliding 2 with ${this.tilesetMetadata.name}: ${newTile2}`);
      return true;
    }
    return false;
  }
}
