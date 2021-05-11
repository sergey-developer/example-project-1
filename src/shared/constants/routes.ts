export const ROUTES = {
  ROOT: '/',
  USER_ROOT: '/personal',
  USER_DASHBOARD: '/personal/dashboard',
  USER_INFO: '/personal/info',
  USER_REVIEWS: '/personal/reviews',
  USER_FAVORITES: '/personal/favorites',
  USER_HELP: '/personal/help',

  USER_CHANGE_PASSWORD: '/personal/settings/change-password',
  USER_CHANGE_EMAIL: '/personal/settings/change-email',

  PROVIDER_BECOME: '/provider/become',
  PROVIDER_CREATE: '/provider/create',
  PROVIDER_ROOT: '/provider/:id',
  PROVIDER_DASHBOARD: '/provider/:id/dashboard',
  PROVIDER_PROFILE: '/provider/:id/profile',
  PROVIDER_BANKING: '/provider/:id/banking',
  PROVIDER_LEGAL: '/provider/:id/legal',
  PROVIDER_REVIEWS: '/provider/:id/reviews',
  PROVIDER_LOCATIONS: '/provider/:id/locations',
  PROVIDER_TEAM: '/provider/:id/team',
  PROVIDER_PHOTOS: '/provider/:id/photos',
  PROVIDER_USER_ACCESS: '/provider/:id/user-access',
  PROVIDER_SETTINGS: '/provider/:id/settings',
  PROVIDER_REFERRALS: '/provider/:id/referrals',

  SIGN_IN_OIDC: '/signin-oidc',
  SIGN_OUT: '/logout'
};

export const NO_SIDEBAR_ROUTES = [ROUTES.PROVIDER_BECOME, ROUTES.PROVIDER_CREATE];
