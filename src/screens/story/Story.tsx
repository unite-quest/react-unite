import { UniteButton } from '@/components/ui/button';
import { AuthenticationContext } from '@/shared/authentication/AuthenticationProvider';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
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
  const facebookLogin = async () => {
    (await getAuth()).authenticationService.login('facebook');
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
    } else {
      console.log('already logged in');
    }
  }, [user]);

  return (
    <>
      <div className="bg-light-blue h-screen">
        <div className="text-dark-green font-pt-serif text-4xl p-10 font-bold text-left">
          A nossa história
        </div>
        <div className="text-black font-roboto text-lg font-medium p-10 text-left">
          Decidimos contar um pouco de nossa trajetória até aqui de uma maneira diferente!
          Convidamos cada um de vocês para participar de uma sequência de desafios preparados
          exclusivamente para o nosso casamento. Clique no botão abaixo e comece agora mesmo!
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <img src={landscape} alt="Landscape" />
        <div className="bg-beige p-5">
          <Link to="/challenge/1/home">
            <UniteButton title="Challenge 1" />
          </Link>
          <Link to="/challenge/2/home">
            <UniteButton title="Challenge 2" />
          </Link>
          <UniteButton title="Google Login" onClick={googleLogin} />
          <UniteButton title="Facebook Login" onClick={facebookLogin} />
        </div>
      </div>
    </>
  );
}

export default Story;
