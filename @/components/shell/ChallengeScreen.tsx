import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChallengeIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';
import { Header } from '../ui/header';
import { Lamp } from '../ui/lamp';

const ChallengeScreen: React.FC<
  PropsWithChildren<{
    description?: string;
    Footer: JSX.Element;
    onTipClick?: () => void;
  }>
> = ({ Footer, description, children, onTipClick }) => {
  const navigate = useNavigate();
  const { meta, screenType, id } = useCurrentChallenge();

  const goBack = () => {
    navigate(-1);
  };

  const showTip =
    onTipClick &&
    (screenType === 'details' ||
      (screenType === 'challenge' && id === ChallengeIdentifier.Six_ApartmentTinder) ||
      (screenType === 'challenge' && id === ChallengeIdentifier.Eight_TornInvite));

  return (
    <>
      <div className={`min-h-svh ${meta.background}`}>
        <Header
          title={screenType === 'landing' ? meta.period : meta.title}
          variant="intro"
          style={meta.background}
          onFlagClick={goBack}
        />
        <div className="pl-5 pr-5">
          {description ? (
            <div className="pt-6 pb-12 text-left">
              <span>{description}</span>
            </div>
          ) : null}
          {children}
        </div>
        {Footer}
        {showTip ? (
          <div className="fixed bottom-36 right-4">
            <Lamp onClick={onTipClick} />
          </div>
        ) : null}
      </div>
    </>
  );
};
export { ChallengeScreen };
