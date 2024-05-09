import { Direction, Position } from 'src/hooks/maze2/playerDrawer';

export interface TileCell {
  id: number;
  collide: boolean;
  x: number;
  y: number;
  h: number;
  w: number;
}
export interface TileRowPositioning {
  columns: TileCell[];
}
export interface TilePositioning {
  type: 'tile';
  rows: TileRowPositioning[];
}

export interface EnemyPositioning {
  type: 'enemy';
  name: string;
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface ObjectivePositioning {
  type: 'objective';
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface PlayerPositioning {
  type: 'player';
  direction: Direction;
  x: number;
  y: number;
  h: number;
  w: number;
}

export type MovePlayerFn = (
  getPosition: (currentPosition: Position) => {
    direction: Direction;
    position: Position;
  },
) => void;

export type MoveEnemyFn = (entityId: string, position: Position) => void;

export type RenderPlayerFn = (canvas: CanvasRenderingContext2D, tick: number) => void;
