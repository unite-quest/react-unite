import {
  ChallengeIdentifier,
  fromRouteToChallengeIdentifier,
} from '@/shared/utils/ChallengeIdentifiers';
import { ChallengeMetadata, challengeMetadataMap } from '@/shared/utils/challengeMetadata';
import { useLocation, useParams } from 'react-router-dom';

type ChallengeScreenType = 'landing' | 'challenge' | 'details';

function fromPathNameToStep(path: string): ChallengeScreenType {
  if (path.indexOf('/landing') >= 0) {
    return 'landing';
  } else if (path.indexOf('details') >= 0) {
    return 'details';
  }
  return 'challenge';
}

export function useCurrentChallenge(): {
  id: ChallengeIdentifier;
  screenType: ChallengeScreenType;
  meta: ChallengeMetadata;
} {
  const { challengeId: unsanitizedChallengeId } = useParams();
  const { pathname } = useLocation();
  const challengeId = fromRouteToChallengeIdentifier(unsanitizedChallengeId);

  if (challengeId === undefined || !challengeMetadataMap[challengeId]) {
    throw new TypeError('Invalid challenge identifier');
  }

  return {
    id: challengeId,
    screenType: fromPathNameToStep(pathname),
    meta: challengeMetadataMap[challengeId],
  };
}
