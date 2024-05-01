import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { useState } from 'react';
import { Joystick } from 'react-joystick-component';
import { MazeCanvas } from './MazeCanvas';

const maze = [
  [0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 2],
]; // 1 for wall, 0 for path

function MediMazeAdventure() {
  const [playerPosition, setPlayerPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <>
      <ChallengeScreen noPadding Footer={<></>}>
        <MazeCanvas maze={maze} playerPosition={playerPosition} />
        <div className="absolute bottom-12 right-12">
          <Joystick
            size={90}
            sticky={false}
            baseColor="#454545"
            stickColor="#ABABAB"
            throttle={200}
            minDistance={80}
            move={e => {
              setPlayerPosition(({ x, y }) => {
                if (e.direction === 'LEFT') {
                  return { x: x - 1, y };
                } else if (e.direction === 'RIGHT') {
                  return { x: x + 1, y };
                } else if (e.direction === 'FORWARD') {
                  return { x, y: y - 1 };
                } else if (e.direction === 'BACKWARD') {
                  return { x, y: y + 1 };
                }
                return { x, y };
              });
            }}
            stop={console.info}
          ></Joystick>
        </div>
      </ChallengeScreen>
    </>
  );
}

export default MediMazeAdventure;
