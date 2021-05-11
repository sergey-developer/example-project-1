import axios from 'axios';

type BaseEnvConfig = {
  oidcClientId: string;
  baseAuthApiUrl: string;
  baseFilesApiUrl: string;
  baseSearchApiUrl: string;
  mainUrl: string;
  baseReviewApiUrl: string;
  baseProviderApiUrl: string;
};

type ExtendedEnvConfig = BaseEnvConfig & {
  hostUrl: string;
  isDev: boolean;
};

type ConfigKeys = keyof ExtendedEnvConfig;

interface IEnvConfig {
  init: () => Promise<void>;
  get: (key: ConfigKeys) => ExtendedEnvConfig[ConfigKeys];
}

class EnvConfig implements IEnvConfig {
  private static instance: EnvConfig;

  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
    }

    return EnvConfig.instance;
  }

  private config!: ExtendedEnvConfig;

  private set = (value: ExtendedEnvConfig) => {
    this.config = value;
  };

  private load = async () => {
    const response = await axios.get<BaseEnvConfig>(
      `${this.config.hostUrl}/envConfig.json`
    );

    this.set({
      ...this.config,
      ...response.data
    });
  };

  private constructor() {
    // eslint-disable-next-line no-restricted-globals
    const hostUrl = location.origin;

    this.set({
      oidcClientId: '',
      baseAuthApiUrl: '',
      baseFilesApiUrl: '',
      baseReviewApiUrl: '',
      baseProviderApiUrl: '',
      baseSearchApiUrl: '',
      mainUrl: '',
      hostUrl,
      isDev: process.env.NODE_ENV === 'development'
    });
  }

  public get = (key: ConfigKeys) => {
    const target = this.config;
    const value = target[key];

    if (value === undefined) {
      throw new Error(`Property: "${value}" by key: "${key}" does not exist`);
    }

    return value;
  };

  public init = async () => {
    await this.load();
  };
}

export default EnvConfig.getInstance();
