import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ROUTES } from 'shared/constants';

const DashboardPage = React.lazy(
  () => import('./dashboard/DashboardPage.container')
);

const PersonalInfoPage = React.lazy(
  () => import('./personal-info/PersonalInfoPage.container')
);

const ReviewsPage = React.lazy(() => import('./reviews/ReviewsPage.container'));

const ChangePasswordPage = React.lazy(
  () => import('./settings/change-password/ChangePasswordPage.container')
);

const ChangeEmailPage = React.lazy(
  () => import('./settings/change-email/ChangeEmailPage.container')
);

const FavoritesPage = React.lazy(
  () => import('./favorites/FavoritesPage.container')
);

const UserRootPage = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.USER_DASHBOARD} component={DashboardPage} />

      <Route exact path={ROUTES.USER_INFO} component={PersonalInfoPage} />

      <Route exact path={ROUTES.USER_REVIEWS} component={ReviewsPage} />

      <Route exact path={ROUTES.USER_FAVORITES} component={FavoritesPage} />

      <Route
        exact
        path={ROUTES.USER_HELP}
        component={() => {
          return <div>PERSONAL HELP</div>;
        }}
      />

      <Route
        exact
        path={ROUTES.USER_CHANGE_PASSWORD}
        component={ChangePasswordPage}
      />

      <Route exact path={ROUTES.USER_CHANGE_EMAIL} component={ChangeEmailPage} />

      <Redirect from='*' to={ROUTES.USER_DASHBOARD} />
    </Switch>
  );
};

export default UserRootPage;
