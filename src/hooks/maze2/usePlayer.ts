import { useEffect, useRef, useState } from 'react';
import characterArmor from '../../assets/maze/armor.png';
import characterSpriteSheet from '../../assets/maze/character-base.png';
import characterHair from '../../assets/maze/hair.png';
import { MovePlayerFn, PlayerPositioning, RenderPlayerFn } from './basePosition';
import { Direction, Position, drawPlayer } from './playerDrawer';

export function usePlayer(questionId: number): {
  loaded: boolean;
  positioning: PlayerPositioning;
  move: MovePlayerFn;
  stop: () => void;
  render: RenderPlayerFn;
} {
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [positioning, setPlayerPositioning] = useState<PlayerPositioning>({
    type: 'player',
    direction: 'FORWARD',
    h: 0,
    w: 0,
    x: 0,
    y: 0,
  });

  const bodyRef = useRef(new Image());
  const clothesRef = useRef(new Image());
  const hairRef = useRef(new Image());

  useEffect(() => {
    bodyRef.current.src = characterSpriteSheet;
    clothesRef.current.src = characterArmor;
    hairRef.current.src = characterHair;

    const imagesLoaded = Promise.all([
      new Promise(resolve => (bodyRef.current.onload = resolve)),
      new Promise(resolve => (clothesRef.current.onload = resolve)),
      new Promise(resolve => (hairRef.current.onload = resolve)),
    ]);
    imagesLoaded.then(() => {
      setPlayerLoaded(true);
      if (questionId === 0) {
        setPlayerPositioning({
          type: 'player',
          direction: 'FORWARD',
          h: 0,
          w: 0,
          x: 40,
          y: 175,
        });
      }
    });
  }, [questionId]);

  const render = (canvas: CanvasRenderingContext2D, frame: number) => {
    drawPlayer(
      canvas,
      bodyRef.current,
      positioning.direction,
      {
        x: positioning.x,
        y: positioning.y,
      },
      false,
      frame,
    );
  };

  const move =
    (
      getPosition: (currentPosition: Position) => {
        direction: Direction;
        position: Position;
      },
    ) =>
    () => {
      const { direction, position: newPosition } = getPosition({
        x: positioning.x,
        y: positioning.y,
      });
      setPlayerPositioning({
        type: 'player',
        direction,
        x: newPosition.x,
        y: newPosition.y,
        h: 64,
        w: 64,
      });
    };

  return {
    loaded: playerLoaded,
    positioning,
    move,
    render,
    stop: () => {
      setPlayerPositioning(currentPositioning => ({ ...currentPositioning, stopped: true }));
    },
  };
}
