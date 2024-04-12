// eslint-disable-next-line no-restricted-imports
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check';
import { firebaseConfig } from './firebaseConfig';

const setupFirebase = (): FirebaseApp => {
  if (getApps.length) {
    return getApp();
  }

  const firebaseApp = initializeApp(firebaseConfig);
  initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider('6LfBZ7IpAAAAAF4q_HespEbH5Vz87TWyZPPOCfDh'),
    isTokenAutoRefreshEnabled: true,
  });
  return firebaseApp;
};

export const firebaseApp = setupFirebase();
