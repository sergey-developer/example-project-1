import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Layout } from 'components/Layout';
import { Spinner } from 'components/Spinner';
import { useAuth } from 'features/auth/hooks';
import { ROUTES } from 'shared/constants';
import { getSimpleLanguagesRequest } from 'state/ducks/directory';
import { doGetProviderList } from 'state/ducks/providerList';
import {
  doGetUserPersonalInfo,
  userPersonalInfoLoadingSelector
} from 'state/ducks/userPersonalInfo';
import { useAppDispatch } from 'state/store';

const UserRootPage = React.lazy(
  () => import('features/user/components/UserRootPage')
);
const ProviderRootPage = React.lazy(
  () => import('features/provider/components/ProviderRootPage')
);

const PrivateApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { auth, authReady } = useAuth();
  const userPersonalInfoLoading = useSelector(userPersonalInfoLoadingSelector);

  React.useEffect(() => {
    if (authReady && auth?.user?.profile?.sub) {
      dispatch(doGetProviderList(auth.user?.profile.sub));
      dispatch(doGetUserPersonalInfo());
      dispatch(getSimpleLanguagesRequest());
    }
  }, [authReady]);

  return userPersonalInfoLoading !== 'finished' ? (
    <Spinner size='lg' fullwidth />
  ) : (
    <Layout>
      <Switch>
        <Route path={ROUTES.USER_ROOT} component={UserRootPage} />

        <Route path={ROUTES.PROVIDER_BECOME} component={ProviderRootPage} />

        <Route path={ROUTES.PROVIDER_CREATE} component={ProviderRootPage} />

        <Route path={ROUTES.PROVIDER_ROOT} component={ProviderRootPage} />

        <Redirect from={ROUTES.ROOT} to={ROUTES.USER_ROOT} />
      </Switch>
    </Layout>
  );
};

export default PrivateApp;
