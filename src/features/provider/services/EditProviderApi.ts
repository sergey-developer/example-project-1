import env from 'config/env';
import EnvConfig from 'config/env';
import { BaseApi } from 'shared/services';
import {
  CreateServiceDto,
  EditProviderLocationDto,
  EditProviderProfileDto,
  ProfileProfileAttributesDto
} from 'shared/types/generate';

import { ProfileEditElementType } from '../types/models/EditProviderProfile';

type ProviderApiVersions = 'v1' | 'v2';
type ProviderApiVersionsKeys = 'current' | 'v2';

const apiVersions: Record<ProviderApiVersionsKeys, ProviderApiVersions> = {
  current: 'v1',
  v2: 'v2'
};

type ExtraRequestConfig = {
  apiVersion: ProviderApiVersionsKeys;
};

class EditProviderApi extends BaseApi {
  private static instance: EditProviderApi;

  public static getInstance(): EditProviderApi {
    if (!EditProviderApi.instance) {
      EditProviderApi.instance = new EditProviderApi();
    }

    return EditProviderApi.instance;
  }

  protected generatePath(
    subPath: string,
    apiVersion: ProviderApiVersionsKeys = 'current'
  ): string {
    const version = apiVersions[apiVersion];

    return super.generatePath(subPath, version);
  }

  private constructor() {
    super(env.get('baseProviderApiUrl') as string, 'provider-edit');
  }

  public getProfile = async (
    profileId: string,
    providerId: string,
    extra?: ExtraRequestConfig
  ): Promise<EditProviderProfileDto> => {
    const url = this.generatePath(
      `${providerId}/profiles/${profileId}`,
      extra?.apiVersion
    );

    const response = await this.api.get<EditProviderProfileDto>(url);
    return response.data;
  };

  public updateProfile = async (
    providerId: string,
    profileId: string,
    data: ProfileProfileAttributesDto,
    extra?: ExtraRequestConfig
  ): Promise<EditProviderProfileDto> => {
    const url = this.generatePath(
      `${providerId}/profiles/${profileId}/profile`,
      extra?.apiVersion
    );

    const response = await this.api.put<EditProviderProfileDto>(url, data);

    return response.data;
  };

  public createOrUpdateProviderProfileService = async (
    providerId: string,
    profileId: string,
    serviceId: string,
    data: CreateServiceDto,
    extra?: ExtraRequestConfig
  ): Promise<boolean> => {
    const url = this.generatePath(
      `${providerId}/profiles/${profileId}/services/${serviceId}`,
      extra?.apiVersion
    );
    const response = await this.api.put<boolean>(url, data);

    return response.data;
  };

  public deleteProviderProfileElement = async (
    providerId: string,
    profileId: string,
    elementType: ProfileEditElementType,
    elementId: string
  ) => {
    //TODO need fix create url function

    // const urlTwo = this.generatePath(
    //   `${providerId}​/profiles​/${profileId}​/collections​/${elementType}​/${elementId}`
    // );

    const baseUrl = EnvConfig.get('baseProviderApiUrl') as string;
    const url = `${baseUrl}/api/v1/provider-edit/${providerId}/profiles/${profileId}/collections/${elementType}/${elementId}`;

    const response = await this.api.delete<boolean>(url);

    return response.data;
  };

  public createOrUpdateProviderLocation = async (
    providerId: string,
    profileId: string,
    locationId: string,
    data: EditProviderLocationDto,
    extra?: ExtraRequestConfig
  ) => {
    const url = this.generatePath(
      `${providerId}/profiles/${profileId}/locations/${locationId}`
    );

    const response = await this.api.put<boolean>(url, data);

    return response.data;
  };

  public applyAllChanges = async (
    providerId: string,
    profileId: string,
    extra?: ExtraRequestConfig
  ) => {
    const url = this.generatePath(
      `${providerId}/profiles/${profileId}/apply`,
      extra?.apiVersion
    );

    const response = await this.api.post<boolean>(url);

    return response.data;
  };

  public rejectAllChanges = async (
    providerId: string,
    profileId: string,
    extra?: ExtraRequestConfig
  ) => {
    const url = this.generatePath(
      `${providerId}/profiles/${profileId}/reject`,
      extra?.apiVersion
    );

    const response = await this.api.post<boolean>(url);

    return response.data;
  };
}

export default EditProviderApi.getInstance();
