import React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { ROUTES } from 'shared/constants';
// import { useDirectorySlice } from 'shared/hooks';
import { doGetProvider } from 'state/ducks/provider';
import { useAppDispatch } from 'state/store';

import { InModerationModalProvider } from './common/modals';

const BankingPage = React.lazy(
  () => import('./banking/BankingPage/BankingPage.container')
);

const DashboardPage = React.lazy(
  () => import('./dashboard/DashboardPage.container')
);

const ProfilePage = React.lazy(() => import('./profile/ProfilePage.container'));

const LocationsPage = React.lazy(
  () => import('features/provider/components/locations/LocationsPage.container')
);

const ProfilePhotosContainer = React.lazy(
  () => import('./photos/ProfilePhotos.container')
);

const BecomePage = React.lazy(
  () => import('features/provider/components/become/BecomePage')
);

const CreateProviderPage = React.lazy(
  () =>
    import('features/provider/components/create-provider/CreateProvider.container')
);

const ReviewsPage = React.lazy(
  () => import('features/provider/components/reviews/ReviewsPage.container')
);

const ReferralsPage = React.lazy(
  () => import('features/provider/components/referrals/ReferralsPage.container')
);

type ProviderRootPageProps = RouteComponentProps<{ id: string }>;

const ProviderRootPage: React.FC<ProviderRootPageProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const providerId = match.params.id;
  // useDirectorySlice();

  React.useEffect(() => {
    if (providerId) {
      dispatch(doGetProvider(providerId));
    }
  }, [providerId]);

  return (
    <InModerationModalProvider>
      <Switch>
        <Route exact path={ROUTES.PROVIDER_DASHBOARD} component={DashboardPage} />

        <Route exact path={ROUTES.PROVIDER_PROFILE} component={ProfilePage} />

        <Route exact path={ROUTES.PROVIDER_BANKING} component={BankingPage} />

        <Route exact path={ROUTES.PROVIDER_CREATE} component={CreateProviderPage} />

        <Route exact path={ROUTES.PROVIDER_REVIEWS} component={ReviewsPage} />

        <Route exact path={ROUTES.PROVIDER_LOCATIONS} component={LocationsPage} />

        <Route exact path={ROUTES.PROVIDER_REFERRALS} component={ReferralsPage} />

        <Route
          exact
          path={ROUTES.PROVIDER_TEAM}
          component={() => <div>PROVIDER TEAM</div>}
        />

        <Route
          exact
          path={ROUTES.PROVIDER_PHOTOS}
          component={ProfilePhotosContainer}
        />

        <Route
          exact
          path={ROUTES.PROVIDER_USER_ACCESS}
          component={() => <div>PROVIDER USER ACCESS</div>}
        />

        <Route
          exact
          path={ROUTES.PROVIDER_SETTINGS}
          component={() => <div>PROVIDER SETTINGS</div>}
        />

        <Route exact path={ROUTES.PROVIDER_BECOME} component={BecomePage} />

        <Redirect to={ROUTES.PROVIDER_DASHBOARD} />
      </Switch>
    </InModerationModalProvider>
  );
};

export default ProviderRootPage;
