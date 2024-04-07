import { Button } from '@/components/ui/button';
import { AuthenticationContext } from '@/shared/authentication/AuthenticationProvider';
import { authenticationService } from '@/shared/authentication/AuthenticationService';
import { LoaderContext } from '@/shared/loader/LoaderProvider';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Story() {
  const { user } = useContext(AuthenticationContext);
  const { setLoading } = useContext(LoaderContext);

  const googleLogin = () => {
    authenticationService.login('google');
  };
  const facebookLogin = () => {
    authenticationService.login('facebook');
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
      authenticationService.anonymousLogin();
    } else {
      console.log('already logged in');
    }
  }, [user]);

  return (
    <>
      <Link to="/challenge/1">
        <Button>Iniciar</Button>
      </Link>
      <Button variant="secondary" onClick={googleLogin}>
        Google Login
      </Button>
      <Button variant="secondary" onClick={facebookLogin}>
        Facebook Login
      </Button>
    </>
  );
}

export default Story;
