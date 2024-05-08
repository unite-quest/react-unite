import { useEffect } from 'react';
import { Direction } from 'src/hooks/maze2/playerDrawer';
import {
  EnemyPositioning,
  MoveEnemyFn,
  MovePlayerFn,
  ObjectivePositioning,
  PlayerPositioning,
  TilePositioning,
} from './basePosition';

type PositioningForEntities = [
  PlayerPositioning,
  TilePositioning[],
  EnemyPositioning[],
  ObjectivePositioning,
];
type MovementControlScheme = [MovePlayerFn, MoveEnemyFn];
type CollisionControlScheme = [(entityId: string) => void, () => void];

export function useGlobalPositionControl(
  tick: number,
  direction: Direction,
  positioning: PositioningForEntities,
  movementControl: MovementControlScheme,
  collisionControl: CollisionControlScheme,
) {
  useEffect(() => {
    console.log(direction, tick, positioning, movementControl, collisionControl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);
}
