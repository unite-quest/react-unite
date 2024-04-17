import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';
import { Header } from '../ui/header';
import { Lamp } from '../ui/lamp';

const ChallengeScreen: React.FC<
  PropsWithChildren<{
    Footer: JSX.Element;
    tip?: string;
  }>
> = ({ Footer, children, tip }) => {
  const navigate = useNavigate();
  const { meta, screenType } = useCurrentChallenge();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={`min-h-svh ${meta.background}`}>
        <Header title={meta.title} variant="intro" style={meta.background} onFlagClick={goBack} />
        <div className="pl-5 pr-5">{children}</div>
        {Footer}
        {screenType === 'details' ? (
          <div className="absolute bottom-36 right-4">
            <Lamp onClick={() => alert(tip)} />
          </div>
        ) : null}
      </div>
    </>
  );
};
export { ChallengeScreen };
