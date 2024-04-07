import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);
initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider("6LfBZ7IpAAAAAF4q_HespEbH5Vz87TWyZPPOCfDh"),
  isTokenAutoRefreshEnabled: true,
});

export { firebaseApp };
