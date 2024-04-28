import { ChallengeScreen } from '@/components/shell/ChallengeScreen';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { corgiPosesMap } from '@/shared/utils/corgiPosesMap';
import { useContext, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useCurrentQuestion } from 'src/hooks/useCurrentQuestion';
import useImagePreloader from 'src/hooks/useImagePreloader';
import useSimonSaysAnimationState from 'src/hooks/useSimonSaysAnimationState';

function SimonSaysChallenge() {
  const navigate = useNavigate();

  const { setLoading } = useContext(LoaderContext);
  // pre-load images
  const [challengeEnabled, setChallengeEnabled] = useState(false);
  const { id: questionId } = useCurrentQuestion();
  const { showCounter, counter, trickIndex, animationFinished } = useSimonSaysAnimationState(
    questionId,
    {
      enabled: challengeEnabled,
    },
  );
  const currentTrick = corgiPosesMap[trickIndex];
  const background = showCounter ? 'bg-black' : currentTrick.background;
  const { imagesPreloaded } = useImagePreloader(corgiPosesMap.map(pose => pose.image));

  useEffect(() => {
    if (!imagesPreloaded) {
      return;
    }
    setTimeout(() => {
      setLoading(false);
      setChallengeEnabled(true);
    }, 200);
  }, [imagesPreloaded, setLoading]);

  useEffect(() => {
    if (!animationFinished || questionId === null) {
      return;
    }

    navigate({
      pathname: 'details',
      search: createSearchParams({
        id: String(questionId),
      }).toString(),
    });
  }, [animationFinished, navigate, questionId]);

  return (
    <>
      <ChallengeScreen noPadding Footer={<div></div>}>
        <div
          className={`w-full ${background} flex items-center justify-center`}
          style={{ height: 'calc(100svh - 5rem)' }}
        >
          {showCounter ? (
            <div>
              <span className="font-roboto text-beige text-9xl">{counter}</span>
            </div>
          ) : (
            <img className="flex" height={200} width={200} src={currentTrick.image} />
          )}
        </div>
      </ChallengeScreen>
    </>
  );
}

export default SimonSaysChallenge;
