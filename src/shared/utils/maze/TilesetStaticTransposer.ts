import { TilesetExtractor, TilesetMetadata } from './TilesetExtractor';
import {
  Direction,
  PLAYER_DIMENSIONS,
  PLAYER_OFFSET_TO_ZERO,
  PLAYER_SCALE,
  Position,
} from './playerDrawer';

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
    return false;

    const tiles = this.getTiles();
    const scale = this.getScale();

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
