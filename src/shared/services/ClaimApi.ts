import env from 'config/env';
import {
  ProfileClaimListDto,
  ResolveClaimRequest,
  ResolveClaimResponse
} from 'shared/types/generate';
import { V1ClaimListListParams } from 'shared/types/generate/provider';

import BaseApi from './BaseApi';

type ExtraRequestConfig = {
  apiVersion: DirectoryApiVersionsKeys;
};
type DirectoryApiVersions = 'v1' | 'v2';
type DirectoryApiVersionsKeys = 'current' | 'v2';

const apiVersions: Record<DirectoryApiVersionsKeys, DirectoryApiVersions> = {
  current: 'v1',
  v2: 'v2'
};
class ClaimApi extends BaseApi {
  private static instance: ClaimApi;

  public static getInstance(): ClaimApi {
    if (!ClaimApi.instance) {
      ClaimApi.instance = new ClaimApi();
    }

    return ClaimApi.instance;
  }
  protected generatePath(
    subPath: string,
    apiVersion: DirectoryApiVersionsKeys = 'current'
  ): string {
    const version = apiVersions[apiVersion];

    return super.generatePath(subPath, version);
  }
  private constructor() {
    super(env.get('baseProviderApiUrl') as string, 'claim');
  }

  public getClaimList = async (
    params?: V1ClaimListListParams,
    extra?: ExtraRequestConfig
  ): Promise<ProfileClaimListDto> => {
    const url = this.generatePath(`list`);

    const response = await this.api.get<ProfileClaimListDto>(url, {
      params
    });

    return response.data;
  };

  public resolveClaim = async (
    claimRequest: ResolveClaimRequest,
    extra?: ExtraRequestConfig
  ) => {
    const url = this.generatePath(`resolve`, extra?.apiVersion);

    const response = await this.api.post<ResolveClaimResponse>(url, claimRequest);
    return response.data;
  };
}

export default ClaimApi.getInstance();
