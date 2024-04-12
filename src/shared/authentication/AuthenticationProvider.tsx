import UserModel from '@/models/UserModel';
import React, { PropsWithChildren, createContext, useEffect, useState } from 'react';

const getAuth = () => import('../authentication/AuthenticationService');

export interface AuthenticationContextInput {
  user: UserModel | null | undefined;
}

const defaultState: AuthenticationContextInput = {
  user: undefined,
};

export const AuthenticationContext = createContext<AuthenticationContextInput>(defaultState);
export const AuthenticationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null | undefined>(undefined);

  useEffect(() => {
    const t = async () => {
      // need workaround to unsubscribe
      (await getAuth()).auth?.onAuthStateChanged(firebaseUser => {
        if (!firebaseUser) {
          setUser(null);
          return;
        }

        const u = new UserModel(firebaseUser);
        console.log('user updated', u);
        setUser(u);
      });
    };
    t();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ user }}>{children}</AuthenticationContext.Provider>
  );
};
