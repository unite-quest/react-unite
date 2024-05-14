import { UniteScreen } from '@/components/shell/screen';
import { FixedBottom } from '@/components/ui/fixed-bottom';
import { StackSpacing } from '@/components/ui/stack-spacing';
import { UniteText, UniteTitle } from '@/components/ui/unite-text';
import { AuthenticationContext } from '@/shared/authentication/AuthenticationProvider';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { ChallengeRouteIdentifier } from '@/shared/utils/ChallengeIdentifiers';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAnswerStatus from 'src/hooks/useAnswerStatus';
import landscape from '../../../src/assets/adventure-landscape.png';

const getAuth = () => import('../../shared/authentication/AuthenticationService');

function Story() {
  const { user } = useContext(AuthenticationContext);
  const { setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();
  const { started } = useAnswerStatus();

  const goBack = () => {
    navigate(-1);
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

  const goToAdventure = () => {
    if (started) {
      navigate(`/challenge/map`);
      return;
    }
    navigate(`/challenge/${ChallengeRouteIdentifier.One_LogoQuiz}/landing`);
  };

  return (
    <>
      <UniteScreen
        background="bg-light-beige"
        Header={<></>}
        Footer={
          <FixedBottom
            background="bg-beige"
            title={started ? 'Resumir' : 'Iniciar'}
            buttonVariant="adventure"
            onClick={goToAdventure}
            withArrow={true}
          >
            <h1 className="font-bitmap-pixel text-4xl text-[#7f7ffa]">Unite Quest</h1>
            <StackSpacing size="lg" />
            <img src={landscape} alt="Landscape" />
          </FixedBottom>
        }
      >
        <StackSpacing size="lg" />
        <UniteText onClick={goBack}>Voltar</UniteText>
        <StackSpacing size="sm" />
        <UniteTitle align="left" color="text-dark-green">
          A nossa história
        </UniteTitle>
        <StackSpacing size="sm" />
        <UniteText align="left">
          Você enfrentará uma sequência de 8 desafios distintos, cada um levando ao próximo ao ser
          corretamente resolvido. Seu progresso será salvo após cada resposta correta. Esses
          desafios representam etapas marcantes de nossas vidas, desde o momento em que nos
          conhecemos até o dia do nosso casamento.
        </UniteText>
      </UniteScreen>
    </>
  );
}

export default Story;
