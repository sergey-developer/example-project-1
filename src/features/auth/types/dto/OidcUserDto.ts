import { User as OidcUser } from 'oidc-client';

import { OidcUserStateModel } from '../models';

export type OidcUserDto = Readonly<
  Omit<OidcUser, 'state'> & {
    state?: OidcUserStateModel;
  }
>;
