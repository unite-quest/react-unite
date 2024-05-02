import { CanvasMetadata } from '../TilesetExtractor';
import { TilesetStaticTransposer } from '../TilesetStaticTransposer';
import { Direction, Position } from './playerDrawer';

const EMP = 1222;
export class BorderTileset extends TilesetStaticTransposer {
  constructor(canvasMetadata: CanvasMetadata, tileset: HTMLImageElement) {
    super(
      canvasMetadata,
      {
        columns: 45,
        rows: 10,
        tileSize: 16,
      },
      tileset,
      [
        [EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP],
        [EMP, 51, 52, 52, 52, 52, 52, 53, EMP, EMP, EMP, EMP],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, 48, 52, 52, 52, 52],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 477],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, EMP, 477],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 50, 52, 52, 52],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP],
        [EMP, 96, EMP, EMP, EMP, EMP, EMP, EMP, 98, EMP, EMP, EMP],
        [EMP, 141, 52, 49, EMP, EMP, EMP, 50, 143, EMP, EMP, EMP],
        [EMP, EMP, EMP, 96, EMP, EMP, EMP, 98, EMP, EMP, EMP, EMP],
      ],
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isColliding(playerPosition: Position, playerDirection: Direction): boolean {
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
    if (newX >= this.tiles.length) {
      return true;
    }
    if (newY >= this.tiles[newX].length) {
      return true;
    }
    const newTile = this.tiles[newX][newY];
    // if new tile is a border, don't let them pass!
    if (newTile !== EMP) {
      return true;
    }
    return false;
  }
}
