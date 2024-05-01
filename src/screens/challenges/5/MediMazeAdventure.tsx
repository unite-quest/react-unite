import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { useState } from 'react';
import { Joystick } from 'react-joystick-component';
import { MazeCanvas } from './MazeCanvas';

function MediMazeAdventure() {
  const [direction, setDirection] = useState<'FORWARD' | 'RIGHT' | 'LEFT' | 'BACKWARD' | null>(
    null,
  );

  return (
    <>
      <ChallengeScreen noPadding noBottomPadding Footer={<></>}>
        <MazeCanvas
          direction={direction}
          width={window.innerWidth}
          height={window.innerHeight - 80}
        />
        <div className="absolute bottom-12 right-12">
          <Joystick
            size={90}
            sticky={false}
            baseColor="#454545"
            stickColor="#ABABAB"
            throttle={200}
            minDistance={80}
            move={e => {
              setDirection(e.direction);
            }}
            stop={() => {
              setDirection(null);
            }}
          ></Joystick>
        </div>
      </ChallengeScreen>
    </>
  );
}

export default MediMazeAdventure;
