import { UserManagerSettings } from 'oidc-client';

import env from './env';

interface IOidcClientConfig {
  get: () => UserManagerSettings;
}

class OidcClientConfig implements IOidcClientConfig {
  private static instance: OidcClientConfig;

  public static getInstance(): OidcClientConfig {
    if (!OidcClientConfig.instance) {
      OidcClientConfig.instance = new OidcClientConfig();
    }

    return OidcClientConfig.instance;
  }

  private config!: UserManagerSettings;

  private set = (value: UserManagerSettings) => {
    this.config = value;
  };

  private constructor() {
    const authUrl = env.get('baseAuthApiUrl') as string;
    const hostUrl = env.get('hostUrl') as string;

    const config: UserManagerSettings = {
      authority: authUrl,
      client_id: env.get('oidcClientId') as string,
      redirect_uri: `${hostUrl}/signin-oidc`,
      silent_redirect_uri: `${hostUrl}/silentrenew`,
      post_logout_redirect_uri: hostUrl,
      response_type: 'code',
      automaticSilentRenew: true,
      loadUserInfo: true,
      scope: 'openid offline_access',
      accessTokenExpiringNotificationTime: 120,
      metadata: {
        issuer: authUrl,
        jwks_uri: `${authUrl}/.well-known/openid-configuration/jwks`,
        authorization_endpoint: `${authUrl}/connect/authorize`,
        token_endpoint: `${authUrl}/connect/token`,
        userinfo_endpoint: `${authUrl}/connect/userinfo`,
        end_session_endpoint: `${authUrl}/connect/endsession`,
        check_session_iframe: `${authUrl}/connect/checksession`,
        revocation_endpoint: `${authUrl}/connect/revocation`,
        introspection_endpoint: `${authUrl}/connect/introspect`
      }
    };

    this.set(config);
  }

  public get = () => {
    return this.config;
  };
}

export default OidcClientConfig.getInstance();
