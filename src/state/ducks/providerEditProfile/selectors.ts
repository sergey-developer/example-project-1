import { RootState } from '../../store';
import {
  ProviderEditProfileState,
  name as reducerName
} from './providerEditProfileSlice';

export const providerEditProfileStateSelector = (
  state: any
): ProviderEditProfileState => state[reducerName];

export const providerEditProfileLegalSelector = (state: any) =>
  providerEditProfileStateSelector(state)?.data?.profile?.legal;

export const providerCoverLoadSelector = (state: any) =>
  providerEditProfileStateSelector(state).loaders.coverLoading;

export const publicProviderErrorSelector = (state: any) =>
  providerEditProfileStateSelector(state).errors.publishProfileErrors;

export const providerGallerySelector = (state: any) =>
  providerEditProfileStateSelector(state).data.profile?.gallery;

export const providerEditProfileDataSelector = (state: RootState) =>
  state.providerEditProfile.data;
