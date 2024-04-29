import { corgiChallengeLevels } from '@/shared/utils/corgiPosesMap';
import { useEffect, useState } from 'react';

export type CorgiAnimationState = {
  animationFinished: boolean;
  trickIndex: number;
  showCounter: boolean;
  counter: number;
};

const INTERVAL_TICK = 1000;

export default function useSimonSaysAnimationState(
  questionId: number,
  config: { enabled: boolean },
): CorgiAnimationState {
  const [counter, setCounter] = useState(3);
  const [showCounter, setShowCounter] = useState(true);
  const [trickIndex, setTrickIndex] = useState(0);
  const [enableTrickCounter, setEnableTrickCounter] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  // restart all variables whenever questionId changes
  useEffect(() => {
    if (questionId === undefined || questionId === null) {
      return;
    }
    setCounter(3);
    setShowCounter(true);
    setTrickIndex(0);
    setEnableTrickCounter(false);
    setAnimationFinished(false);
  }, [questionId]);

  useEffect(() => {
    if (!config.enabled) {
      return;
    }

    const intervalSubscription = setInterval(() => {
      if (counter === 1) {
        setShowCounter(false);
        clearInterval(intervalSubscription);
        return;
      } else {
        setCounter(counter - 1);
      }
    }, INTERVAL_TICK);

    return () => clearInterval(intervalSubscription);
  }, [config.enabled, counter]);

  useEffect(() => {
    if (showCounter || questionId === undefined || questionId === null) {
      return;
    }
    setTimeout(() => {
      setEnableTrickCounter(true);
    }, 200);
  }, [questionId, showCounter]);

  useEffect(() => {
    if (!enableTrickCounter) {
      return;
    }
    const intervalSubscription = setInterval(() => {
      if (corgiChallengeLevels[questionId].tricks.length === trickIndex + 1) {
        setAnimationFinished(true);
        clearInterval(intervalSubscription);
        return;
      }
      setTrickIndex(trickIndex + 1);
    }, INTERVAL_TICK);

    return () => clearInterval(intervalSubscription);
  }, [enableTrickCounter, questionId, trickIndex]);

  return {
    animationFinished,
    counter,
    showCounter,
    trickIndex: corgiChallengeLevels[questionId].tricks[trickIndex],
  };
}
