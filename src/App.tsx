import { Outlet } from 'react-router-dom';
import './App.css';

import { AuthenticationProvider } from './shared/authentication/AuthenticationProvider';
import { LoaderProvider } from './shared/loader/LoaderProvider';

function App() {
  return (
    <AuthenticationProvider>
      <LoaderProvider>
        <Outlet />
      </LoaderProvider>
    </AuthenticationProvider>
  );
}

export default App;
