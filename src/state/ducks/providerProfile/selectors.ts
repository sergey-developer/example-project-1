import { Nullable } from 'shared/types';

import { ProviderProfileState, name as reducerName } from './providerProfileSlice';

const providerProfileSelector = (state: any): ProviderProfileState =>
  state[reducerName];

export type GetProviderAndProfileIdsReturn = {
  providerId?: Nullable<string>;
  profileId?: string;
};

const getProviderAndProfileIds = (state: any): GetProviderAndProfileIdsReturn => {
  const profileData: ProviderProfileState['data'] = state[reducerName]?.data;
  const providerId = profileData?.providerId;
  const profileId = profileData?.id;

  return {
    providerId,
    profileId
  };
};

export { providerProfileSelector, getProviderAndProfileIds };
