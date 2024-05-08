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
  x: number;
  y: number;
  h: number;
  w: number;
}
