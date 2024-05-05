import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ModalContext } from '@/shared/modal/ModalProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { getMazeParameters } from '@/shared/utils/maze/mazeLevelMetadata';
import { useContext, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';
import { MazeCanvas } from './MazeCanvas';

function getCanvasDimensions(): { sidePadding: number; width: number; height: number } {
  const sidePadding = 16;
  const availableWidth = window.innerWidth - 2 * sidePadding;
  const decrementForWidthToBeDivisibleBy12 = availableWidth % 12;
  const availableHeight = window.innerHeight - 80;
  const decrementForHeightToBeDivisibleBy16 = availableHeight % 16;
  return {
    sidePadding,
    height: availableHeight - decrementForHeightToBeDivisibleBy16,
    width: availableWidth - decrementForWidthToBeDivisibleBy12,
  };
}

function MediMazeAdventureDetails() {
  const { setLoading } = useContext(LoaderContext);
  const { id: questionId } = useCurrentQuestion();

  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const [direction, setDirection] = useState<'FORWARD' | 'RIGHT' | 'LEFT' | 'BACKWARD' | null>(
    null,
  );
  const onLoaded = () => {
    setLoading(false);
  };

  const onReachObjective = () => {
    if (questionId === 1) {
      openModal({
        type: 'imageSuccess',
        message: 'A Mimi recebeu a coxinha! Aperte X para ir para o próximo desafio.',
        image: 'https://gabrieltnishimura.github.io/unite/coxinha.webp',
        dismiss: () => {
          navigate(`/challenge/${ChallengeRouteIdentifier.Six_ApartmentTinder}/landing`);
        },
      });
      return;
    }

    openModal({
      type: 'success',
      message: 'Você conseguiu chegar no objetivo! Clique no x para continuar',
      dismiss: () => {
        navigate({
          pathname: `/challenge/${ChallengeRouteIdentifier.Five_Labyrinth}`,
          search: createSearchParams({
            id: String(questionId + 1),
          }).toString(),
        });
      },
    });
  };
  const onCollideWithEnemy = () => {
    openModal({
      type: 'failure',
      message: `A equipe médica encontrou você com uma coxinha e você foi expulso dessa sala! Aperte X para recomeçar`,
      dismiss: () => {
        location.reload();
      },
    });
  };

  const { boundingBox, playerInit } = getMazeParameters(questionId);
  const { sidePadding, height, width } = getCanvasDimensions();

  return (
    <>
      <ChallengeScreen noPadding noBottomPadding Footer={<></>}>
        <div style={{ paddingLeft: `${sidePadding}px`, paddingRight: `${sidePadding}px` }}>
          <MazeCanvas
            questionId={questionId}
            direction={direction}
            height={height}
            width={width}
            playerInit={playerInit}
            onLoaded={onLoaded}
            objectiveCollisionBoundary={{
              type: 'objective',
              boundingBox,
              onTouch: onReachObjective,
            }}
            onCollideWithEnemy={onCollideWithEnemy}
          />
        </div>
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

export default MediMazeAdventureDetails;
