import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Spinner } from 'components/Spinner';
import { ROUTES } from 'shared/constants';

import AppProvider from './AppProvider';
import PrivateApp from './PrivateApp';

const SigninOidcPage = React.lazy(
  () => import('features/auth/components/SigninOidcPage')
);

const SignOutPage = React.lazy(() => import('features/auth/components/SignOutPage'));

const App: React.FC = () => {
  return (
    <div className='app'>
      <React.Suspense fallback={<Spinner size='lg' fullwidth />}>
        <AppProvider>
          <Switch>
            <Route exact path={ROUTES.SIGN_IN_OIDC} component={SigninOidcPage} />

            <Route exact path={ROUTES.SIGN_OUT} component={SignOutPage} />

            <Route path={ROUTES.ROOT} component={PrivateApp} />
          </Switch>
        </AppProvider>
      </React.Suspense>
    </div>
  );
};

export default App;
