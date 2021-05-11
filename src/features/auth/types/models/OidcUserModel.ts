import { User as OidcUser } from 'oidc-client';

export type OidcUserStateModel = {
  cameFromUri: string;
};

export type OidcUserModel = Omit<OidcUser, 'state'> & {
  state?: OidcUserStateModel;
};
