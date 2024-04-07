import React, { PropsWithChildren, createContext, useEffect } from "react";
import { auth } from "./AuthenticationService";
import UserModel from "src/models/UserModel";

export interface AuthenticationContextInput {
  user: UserModel | null | undefined;
}

const defaultState: AuthenticationContextInput = {
  user: undefined,
};

export const AuthenticationContext =
  createContext<AuthenticationContextInput>(defaultState);
export const AuthenticationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = React.useState<UserModel | null | undefined>(
    undefined
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      setUser(new UserModel(firebaseUser));
    });
    return unsubscribe;
  }, []);

  return (
    <AuthenticationContext.Provider value={{ user }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
