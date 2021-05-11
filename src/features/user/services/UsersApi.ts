import env from 'config/env';
import { BaseApi } from 'shared/services';

import { EditUserPersonalInfoModel, UserPersonalInfoDto } from '../types';

const apiVersions = {
  current: 'v1',
  v2: 'v2'
};

type ApiVersionsKeys = keyof typeof apiVersions;

type ExtraRequestConfig = Partial<{
  version: ApiVersionsKeys;
}>;

interface IUsersApi {
  getSelfData: (extra?: ExtraRequestConfig) => Promise<UserPersonalInfoDto>;
  updateSelfData: (
    data: EditUserPersonalInfoModel,
    extra?: ExtraRequestConfig
  ) => Promise<boolean>;
  checkEmailAvailable: (
    email: string,
    extra?: ExtraRequestConfig
  ) => Promise<boolean>;
  updateEmail: (email: string, extra?: ExtraRequestConfig) => Promise<number>;
}

class UsersApi extends BaseApi implements IUsersApi {
  private static instance: UsersApi;

  public static getInstance(): UsersApi {
    if (!UsersApi.instance) {
      UsersApi.instance = new UsersApi();
    }

    return UsersApi.instance;
  }

  protected generatePath = (
    subPath?: string,
    version: ApiVersionsKeys = 'current'
  ): string => {
    const apiVersion = apiVersions[version];

    return super.generatePath(subPath, apiVersion);
  };

  private constructor() {
    super(env.get('baseAuthApiUrl') as string, 'Users');
  }

  public getSelfData = async (
    extra?: ExtraRequestConfig
  ): Promise<UserPersonalInfoDto> => {
    try {
      const url = this.generatePath(`read/self`, extra?.version);

      const response = await this.api.get<UserPersonalInfoDto>(url);

      return response.data;
    } catch (error) {
      throw error;
      // TODO: handle error
    }
  };

  public updateSelfData = async (
    data: EditUserPersonalInfoModel,
    extra?: ExtraRequestConfig
  ): Promise<boolean> => {
    try {
      const url = this.generatePath(`update/self`, extra?.version);

      const response = await this.api.put<string>(url, data);

      return !!response.data;
    } catch (error) {
      throw error;
      // TODO: handle error
    }
  };

  public checkEmailAvailable = async (
    email: string,
    extra?: ExtraRequestConfig
  ): Promise<boolean> => {
    try {
      const url = this.generatePath(
        `check/email-available?email=${email}`,
        extra?.version
      );

      const response = await this.api.get<boolean>(url);
      return response.data;
    } catch (error) {
      throw error;
      // TODO: handle error
    }
  };

  public updateEmail = async (
    newEmail: string,
    extra?: ExtraRequestConfig
  ): Promise<number> => {
    try {
      const url = this.generatePath(`update/self/email`, extra?.version);

      const response = await this.api.put(url, {
        newEmail
      });
      return response.status;
      // return !!response.data;
    } catch (error) {
      throw error;
      // TODO: handle error
    }
  };

  public checkPasswordValid = async (
    password: string,
    extra?: ExtraRequestConfig
  ): Promise<boolean> => {
    try {
      const url = this.generatePath(`check/password`, extra?.version);

      const response = await this.api.post<boolean>(url, `"${password}"`);
      return response.data;
    } catch (error) {
      throw error;
      // TODO: handle error
    }
  };
}

export default UsersApi.getInstance();
