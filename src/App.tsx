import { Outlet } from 'react-router-dom';
import './App.css';

import { AuthenticationProvider } from './shared/authentication/AuthenticationProvider';
import { BottomDrawerProvider } from './shared/bottom-drawer/BottomDrawerProvider';
import { GiftDrawerProvider } from './shared/bottom-drawer/GiftDrawerProvider';
import { RentalDrawerProvider } from './shared/bottom-drawer/RentalDrawerProvider';
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
              <RentalDrawerProvider>
                <GiftDrawerProvider>
                  <Outlet />
                </GiftDrawerProvider>
              </RentalDrawerProvider>
            </AnswerManagerProvider>
          </ModalProvider>
        </BottomDrawerProvider>
      </LoaderProvider>
    </AuthenticationProvider>
  );
}

export default App;
