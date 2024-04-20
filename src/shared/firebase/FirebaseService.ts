// eslint-disable-next-line no-restricted-imports
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

const setupFirebase = (): FirebaseApp => {
  if (getApps.length) {
    return getApp();
  }

  const firebaseApp = initializeApp(firebaseConfig);
  return firebaseApp;
};

export const firebaseApp = setupFirebase();
