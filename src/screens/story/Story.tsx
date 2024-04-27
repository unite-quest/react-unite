import { UniteButton } from '@/components/ui/button';
import { AuthenticationContext } from '@/shared/authentication/AuthenticationProvider';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import landscape from '../../assets/adventure-landscape.png';
import arrow from '../../assets/arrow.svg';

const getAuth = () => import('../../shared/authentication/AuthenticationService');

function Story() {
  const { user } = useContext(AuthenticationContext);
  const { setLoading } = useContext(LoaderContext);

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
          Você enfrentará uma sequência de 8 desafios distintos, cada um levando ao próximo ao ser
          corretamente resolvido. Seu progresso será salvo após cada resposta correta. Esses
          desafios representam etapas marcantes de nossas vidas, desde o momento em que nos
          conhecemos até o dia do nosso casamento.
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <img src={landscape} alt="Landscape" />
        <div className="bg-beige p-5">
          <Link to={`/challenge/${ChallengeRouteIdentifier.One_LogoQuiz}/landing`}>
            <UniteButton
              title="Iniciar"
              buttonVariant="adventure"
              icon={<img width={21} height={21} src={arrow} alt="arrow" className="invert" />}
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Story;
