import { Log, UserManager, UserManagerEvents } from 'oidc-client';

import env from 'config/env';
import OidcClientConfig from 'config/oidc-client';
import { Nullable } from 'shared/types';

import { OidcUserDto } from '../types';

class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  private readonly userManager: UserManager;

  private constructor() {
    this.userManager = new UserManager(OidcClientConfig.get());

    if (env.get('isDev')) {
      Log.logger = console;
      Log.level = Log.INFO;
    }

    this.userManager.events.addAccessTokenExpiring(() => {
      // "onUserLoaded" trigger to get user with new access token
      this.userManager.signinSilent();
    });
  }

  public getUser = async (): Promise<Nullable<OidcUserDto>> => {
    try {
      return this.userManager.getUser();
    } catch (error) {
      throw error;
      // TODO: handle error
    }
  };

  public startSignin = async (args?: any): Promise<void> => {
    try {
      await this.userManager.signinRedirect({ state: args });
    } catch (error) {
      throw error;
      // TODO: handle error
    }
  };

  public finishSignin = async (): Promise<OidcUserDto> => {
    try {
      return this.userManager.signinRedirectCallback();
    } catch (error) {
      throw error;
      // TODO: handle error
    }
  };

  public signOut = async (): Promise<void> => {
    try {
      await this.userManager.removeUser();
      await this.userManager.signoutRedirect();
    } catch (error) {
      throw error;
      // TODO: handle error
    }
  };

  public onUserLoaded = (cb: UserManagerEvents.UserLoadedCallback) => {
    this.userManager.events.addUserLoaded(cb);
  };
}

export default AuthService.getInstance();
