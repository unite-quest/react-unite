import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentChallenge } from 'src/hooks/useCurrentChallenge';
import { Header } from '../ui/header';

const ChallengeScreen: React.FC<
  PropsWithChildren<{
    Footer: JSX.Element;
  }>
> = ({ Footer, children }) => {
  const navigate = useNavigate();
  const { meta } = useCurrentChallenge();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={`min-h-svh ${meta.background}`}>
        <Header title={meta.title} variant="intro" style={meta.background} onFlagClick={goBack} />
        <div className="pl-5 pr-5">{children}</div>
        {Footer}
      </div>
    </>
  );
};
export { ChallengeScreen };
