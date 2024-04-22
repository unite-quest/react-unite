import { Outlet } from 'react-router-dom';
import './App.css';

import { AuthenticationProvider } from './shared/authentication/AuthenticationProvider';
import { BottomDrawerProvider } from './shared/bottom-drawer/BottomDrawerProvider';
import { AnswerManagerProvider } from './shared/database/AnswerManagerProvider';
import { LoaderProvider } from './shared/loader/LoaderProvider';
import { ModalProvider } from './shared/modal/ModalProvider';

function App() {
  return (
    <AuthenticationProvider>
      <LoaderProvider>
        <BottomDrawerProvider>
          <ModalProvider>
            <AnswerManagerProvider>
              <Outlet />
            </AnswerManagerProvider>
          </ModalProvider>
        </BottomDrawerProvider>
      </LoaderProvider>
    </AuthenticationProvider>
  );
}

export default App;
