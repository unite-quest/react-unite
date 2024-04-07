import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { AuthenticationProvider } from './shared/authentication/AuthenticationProvider';
import { firebaseApp } from './shared/firebase/FirebaseService';

const db = getFirestore(firebaseApp);

function App() {
  const [count, setCount] = useState(0);

  const test = async () => {
    throw new TypeError('Sentry test');
    setCount(count => count + 1);
    await addDoc(collection(db, 'users'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });
  };

  const googleLogin = () => {};
  const facebookLogin = () => {};

  return (
    <AuthenticationProvider>
      <div id="detail">
        <Outlet />
        <button onClick={test}>count is {count}</button>
        <button onClick={googleLogin}>google login</button>
        <button onClick={facebookLogin}>facebook login</button>
      </div>
    </AuthenticationProvider>
  );
}

export default App;
