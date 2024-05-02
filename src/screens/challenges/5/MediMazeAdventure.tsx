import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { Position } from '@/shared/utils/maze/playerDrawer';
import { useContext, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import { MazeCanvas } from './MazeCanvas';
function MediMazeAdventure() {
  const { setLoading } = useContext(LoaderContext);
  const [direction, setDirection] = useState<'FORWARD' | 'RIGHT' | 'LEFT' | 'BACKWARD' | null>(
    null,
  );
  const initialPosition: Position = { x: 130, y: 380 };

  const onLoaded = () => {
    setLoading(false);
  };

  return (
    <>
      <ChallengeScreen noPadding noBottomPadding Footer={<></>}>
        <MazeCanvas
          direction={direction}
          width={window.innerWidth}
          height={window.innerHeight - 80}
          playerInitialPosition={initialPosition}
          onLoaded={onLoaded}
        />
        <div className="absolute bottom-12 right-12 z-20">
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
