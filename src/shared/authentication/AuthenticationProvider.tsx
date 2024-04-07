import UserModel from '@/models/UserModel';
import React, { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { auth } from './AuthenticationService';

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
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      const u = new UserModel(firebaseUser);
      console.log('user updated', u);
      setUser(u);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthenticationContext.Provider value={{ user }}>{children}</AuthenticationContext.Provider>
  );
};
