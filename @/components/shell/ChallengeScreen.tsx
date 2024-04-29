import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChallengeIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';
import { Header } from '../ui/header';
import { InsetSpacing } from '../ui/inset-spacing';
import { Lamp } from '../ui/lamp';
import { StackSpacing } from '../ui/stack-spacing';
import { UniteText } from '../ui/unite-text';

const ChallengeScreen: React.FC<
  PropsWithChildren<{
    noPadding?: boolean;
    description?: string;
    Footer: JSX.Element;
    onTipClick?: () => void;
  }>
> = ({ noPadding, Footer, description, children, onTipClick }) => {
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
        {noPadding ? (
          <>
            {description ? (
              <>
                <UniteText>{description}</UniteText>
                <StackSpacing size="md" />
              </>
            ) : null}
            {children}
          </>
        ) : (
          <InsetSpacing size="md">
            {description ? (
              <>
                <UniteText>{description}</UniteText>
                <StackSpacing size="md" />
              </>
            ) : null}
            {children}
          </InsetSpacing>
        )}
        <StackSpacing size="xl" />
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
