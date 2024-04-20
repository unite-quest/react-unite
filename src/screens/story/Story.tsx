import { UniteButton } from '@/components/ui/button';
import { AuthenticationContext } from '@/shared/authentication/AuthenticationProvider';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import landscape from '../../assets/pixelArt_landscape.svg';

const getAuth = () => import('../../shared/authentication/AuthenticationService');

function Story() {
  const { user } = useContext(AuthenticationContext);
  const { setLoading } = useContext(LoaderContext);

  const googleLogin = async () => {
    (await getAuth()).authenticationService.login('google');
  };
  const anonLogin = async () => {
    (await getAuth()).authenticationService.anonymousLogin();
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [setLoading]);

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    if (user === null) {
      anonLogin();
    }
  }, [user]);

  return (
    <>
      <div className="bg-light-blue h-screen">
        <div className="text-dark-green font-pt-serif text-4xl p-10 font-bold text-left">
          A nossa história
        </div>
        <div className="text-black font-roboto text-lg font-medium p-10 text-left">
          Prepare-se para embarcar em nossa jornada de união (unite quest). Ao longo do caminho,
          você enfrentará uma série de desafios, cada um projetado para fortalecer a união de nossa
          família até o dia do casamento. Cada desafio simboliza uma etapa importante de nossas
          vidas; sua resolução nos levará ao próximo estágio dessa emocionante jornada.
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <img src={landscape} alt="Landscape" />
        <div className="bg-beige p-5">
          <Link to={`/challenge/${ChallengeRouteIdentifier.One_LogoQuiz}/landing`}>
            <UniteButton title="Challenge 1" />
          </Link>
          <Link to={`/challenge/${ChallengeRouteIdentifier.Two_LogicGates}/landing`}>
            <UniteButton title="Challenge 2" />
          </Link>
          <Link to={`/challenge/${ChallengeRouteIdentifier.Three_Video}/landing`}>
            <UniteButton title="Challenge 3" />
          </Link>
          {!user ? <UniteButton title="Google Login" onClick={googleLogin} /> : null}
        </div>
      </div>
    </>
  );
}

export default Story;
