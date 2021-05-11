import env from 'config/env';
import { OidcUserModel } from 'features/auth/types';
import { BaseApi } from 'shared/services';
import {
  CreateProviderRequestDto,
  CreateProviderResponseDto,
  ExistProviderResponseDto,
  ProviderProfileDto,
  UpdateProviderRequestDto,
  UpdateResponseDto
} from 'shared/types/generate';

import { ProviderDto } from '../types';

type ProviderApiVersions = 'v1' | 'v2';
type ProviderApiVersionsKeys = 'current' | 'v2';

const apiVersions: Record<ProviderApiVersionsKeys, ProviderApiVersions> = {
  current: 'v1',
  v2: 'v2'
};

// TODO: move to common and reuse
type ExtraRequestConfig = {
  apiVersion: ProviderApiVersionsKeys;
};

class ProviderApi extends BaseApi {
  private static instance: ProviderApi;

  public static getInstance(): ProviderApi {
    if (!ProviderApi.instance) {
      ProviderApi.instance = new ProviderApi();
    }

    return ProviderApi.instance;
  }

  protected generatePath(
    subPath: string,
    apiVersion: ProviderApiVersionsKeys = 'current'
  ): string {
    const version = apiVersions[apiVersion];

    return super.generatePath(subPath, version);
  }

  private constructor() {
    super(env.get('baseProviderApiUrl') as string, 'provider');
  }

  public getListByUserId = async (
    userId: OidcUserModel['profile']['sub'],
    extra?: ExtraRequestConfig
  ): Promise<ProviderDto[]> => {
    const url = this.generatePath(`owner-providers/${userId}`, extra?.apiVersion);
    const response = await this.api.get<ProviderDto[]>(url);
    return response.data;
  };

  public getOneById = async (
    id: ProviderDto['id'],
    extra?: ExtraRequestConfig
  ): Promise<ProviderProfileDto> => {
    const url = this.generatePath(`provider/${id}`, extra?.apiVersion);
    const response = await this.api.get<ProviderProfileDto>(url);
    return response.data;
  };

  public getProfile = async (
    profileId: ProviderDto['activeProfileId'],
    providerId: ProviderDto['id'],
    extra?: ExtraRequestConfig
  ): Promise<ProviderProfileDto> => {
    const url = this.generatePath(
      `profile/${providerId}/${profileId}`,
      extra?.apiVersion
    );

    const response = await this.api.get<ProviderProfileDto>(url);
    return response.data;
  };

  public updateProviderById = async (
    providerId: string,
    updateRequest: UpdateProviderRequestDto,
    extra?: ExtraRequestConfig
  ) => {
    const url = this.generatePath(
      `update-provider/${providerId}`,
      extra?.apiVersion
    );

    const response = await this.api.post<UpdateResponseDto>(url, updateRequest);

    return response.data;
  };

  public createNewProvider = async (
    provider: CreateProviderRequestDto,
    extra?: ExtraRequestConfig
  ) => {
    const url = this.generatePath('create-new', extra?.apiVersion);

    const response = await this.api.post<CreateProviderResponseDto>(url, provider);

    return response.data;
  };

  public existProviderByNPIOnlyHealthCare = async (
    externalId: string,
    extra?: ExtraRequestConfig
  ): Promise<ExistProviderResponseDto> => {
    const url = this.generatePath(`exist-provider/${externalId}`, extra?.apiVersion);

    const response = await this.api.get<ExistProviderResponseDto>(url);

    return response.data;
  };
}

export default ProviderApi.getInstance();
