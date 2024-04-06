import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import "./App.css";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase/firebase.config";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import React from "react";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LfBZ7IpAAAAAF4q_HespEbH5Vz87TWyZPPOCfDh"),
  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

function App() {
  const [count, setCount] = useState(0);

  const test = async () => {
    throw new TypeError("Sentry test");
    setCount((count) => count + 1);
    await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
  };

  return (
    <>
      <div id="detail">
        <Outlet />
        <button onClick={test}>count is {count}</button>
      </div>
    </>
  );
}

export default App;
