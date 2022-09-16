import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useState,
} from "react";
import { unstable_batchedUpdates } from "react-dom";
import {
  AuthError,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth/react-native";

import {
  getAuthentication,
  loginRequest,
  registerRequest,
} from "./authentication.service";

interface IAuthenticationContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: AuthError | null;
  onLogin: (email: string, password: string) => void;
  onRegister: (
    email: string,
    password: string,
    repeatedPassword: string
  ) => void;
  onLogout: () => void;
}

const AuthenticationContext = createContext<
  IAuthenticationContextProps | undefined
>(undefined);

export const AuthenticationContextProvider: FunctionComponent = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError | null>(null);

  onAuthStateChanged(getAuthentication(), (usr) => {
    if (!usr) {
      return setIsLoading(false);
    }

    setIsLoading(false);
    setUser(usr);
  });

  const onLogin = useCallback((email: string, password: string) => {
    setIsLoading(true);

    loginRequest(email, password)
      .then((usr) => {
        unstable_batchedUpdates(() => {
          setUser(usr.user);
          setIsLoading(false);
        });
      })
      .catch((e: AuthError) => {
        unstable_batchedUpdates(() => {
          setIsLoading(false);
          setError(e);
        });
      });
  }, []);

  const onRegister = useCallback(
    (email: string, password: string, repeatedPassword: string) => {
      setIsLoading(true);

      registerRequest(email, password, repeatedPassword)
        .then((usr) => {
          unstable_batchedUpdates(() => {
            setIsLoading(false);
            setUser(usr.user);
          });
        })
        .catch((e: AuthError) => {
          unstable_batchedUpdates(() => {
            setIsLoading(false);
            setError(e);
          });
        });
    },
    []
  );

  const onLogout = useCallback(async () => {
    await signOut(getAuthentication());
    setUser(null);
  }, [setUser]);

  const authentication: IAuthenticationContextProps = {
    isAuthenticated: !!user,
    isLoading,
    user,
    error,
    onRegister,
    onLogin,
    onLogout,
  };

  return (
    <AuthenticationContext.Provider value={authentication}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = React.useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within a AuthenticationProvider"
    );
  }

  return context;
};
