import { Outlet } from 'react-router-dom';
import './App.css';

import { AuthenticationProvider } from './shared/authentication/AuthenticationProvider';
import { BottomDrawerProvider } from './shared/bottom-drawer/BottomDrawerProvider';
import { AnswerManagerProvider } from './shared/database/AnswerManagerProvider';
import { LoaderProvider } from './shared/loader/LoaderProvider';

function App() {
  return (
    <AuthenticationProvider>
      <LoaderProvider>
        <BottomDrawerProvider>
          <AnswerManagerProvider>
            <Outlet />
          </AnswerManagerProvider>
        </BottomDrawerProvider>
      </LoaderProvider>
    </AuthenticationProvider>
  );
}

export default App;
