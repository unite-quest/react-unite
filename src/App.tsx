import { Outlet } from 'react-router-dom';
import './App.css';

import { AuthenticationProvider } from './shared/authentication/AuthenticationProvider';
import { AnswerManagerProvider } from './shared/database/AnswerManagerProvider';
import { LoaderProvider } from './shared/loader/LoaderProvider';

function App() {
  return (
    <AuthenticationProvider>
      <LoaderProvider>
        <AnswerManagerProvider>
          <Outlet />
        </AnswerManagerProvider>
      </LoaderProvider>
    </AuthenticationProvider>
  );
}

export default App;
