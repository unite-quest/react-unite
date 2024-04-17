// eslint-disable-next-line no-restricted-imports
import { Auth } from 'firebase/auth';

import { firebaseApp } from '../firebase/FirebaseService';

let auth: Auth | null = null;
export const getFirebaseAuthInstance: () => Promise<Auth> = async () => {
  if (auth) {
    return auth;
  }
  const { getAuth } = await import('firebase/auth');

  auth = getAuth(firebaseApp);
  return auth;
};

const login = async (type: 'facebook' | 'google'): Promise<void> => {
  const instance = await getFirebaseAuthInstance();
  const { signInWithRedirect, GoogleAuthProvider, FacebookAuthProvider } = await import(
    'firebase/auth'
  );
  const provider = type === 'google' ? new GoogleAuthProvider() : new FacebookAuthProvider();
  instance.languageCode = 'pt';

  return signInWithRedirect(instance, provider);
};

const anonymousLogin = async () => {
  const instance = await getFirebaseAuthInstance();
  const { signInAnonymously } = await import('firebase/auth');
  console.log('logging in anonymously');
  try {
    return signInAnonymously(instance);
  } catch (err) {
    console.error('could not login anonymously', err);
    return Promise.reject(err);
  }
};

const authenticationService = {
  initializeAuth: getFirebaseAuthInstance,
  login,
  anonymousLogin,
};

export { authenticationService };
