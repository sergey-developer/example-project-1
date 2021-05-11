import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Button } from 'components/Buttons';
import { BaseAcceptModal } from 'components/Modals';
import { addRequestInterceptors, addResponseInterceptors } from 'config/api';
import { Nullable } from 'shared/types';
import { getCurrentUri } from 'shared/utils';
import {
  AuthState,
  authInitialState,
  authSelector,
  authSetUser,
  doSignOut,
  doSignin,
  doStartSignin
} from 'state/ducks/auth';
import { useAppDispatch } from 'state/store';

import { AuthService } from '../services';
import { checkUserBackFromOidc } from '../utils';

export interface AuthContextProps {
  auth: AuthState;
  signOut: () => void;
  authReady: boolean;
}

export const AuthContext = React.createContext<AuthContextProps>({
  auth: authInitialState,
  signOut: () => {},
  authReady: false
});

const AuthProvider: React.FC = ({ children }) => {
  const [t] = useTranslation('auth');
  const dispatch = useAppDispatch();
  const auth = useSelector(authSelector);
  const [isSessionExpired, setSessionExpired] = React.useState(false);
  const [authReady, setAuthReady] = React.useState(false);
  const ejectRequestInterceptorRef = React.useRef<Nullable<Function>>(null);

  const location = window.location;
  const currentUri = getCurrentUri(location);

  const requestInterceptorsEffect = () => {
    if (auth.user) {
      const initRequestInterceptors = (user: typeof auth.user) => {
        const { eject } = addRequestInterceptors({ user });
        ejectRequestInterceptorRef.current = eject;
      };

      if (ejectRequestInterceptorRef.current) {
        ejectRequestInterceptorRef.current();
        initRequestInterceptors(auth.user);
      } else {
        initRequestInterceptors(auth.user);
        setAuthReady(true);
      }
    }
  };

  const responseInterceptorsEffect = () => {
    addResponseInterceptors({
      onUnauthorized: () => setSessionExpired(true)
    });
  };

  React.useEffect(requestInterceptorsEffect, [auth.user]);

  React.useEffect(responseInterceptorsEffect, []);

  React.useEffect(() => {
    AuthService.onUserLoaded(user => {
      dispatch(authSetUser(user));
    });
  }, []);

  const signin = () => {
    const userBackFromOidc = checkUserBackFromOidc(location);

    if (!userBackFromOidc) {
      dispatch(doSignin({ cameFromUri: currentUri }));
    }
  };

  const signOut = () => {
    dispatch(doSignOut());
  };

  const startSignin = () => {
    dispatch(doStartSignin({ cameFromUri: currentUri }));
  };

  React.useEffect(() => {
    signin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        signOut,
        authReady
      }}
    >
      {isSessionExpired && (
        <BaseAcceptModal
          open={isSessionExpired}
          title={t('sessionExpiredMessage')}
          subTitle={t('loginAgainMessage')}
          action={<Button onClick={startSignin}>{t('loginBtnLabel')}</Button>}
        />
      )}

      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
