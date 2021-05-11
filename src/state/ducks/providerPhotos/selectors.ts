import { ProfileGalleryModel } from 'features/provider/types/models/EditProviderProfile';

import { ProviderEditPhotoState, name as reducerName } from './providerPhotosSlice';

export const providerEditPhotoStateSelector = (state: any): ProviderEditPhotoState =>
  state[reducerName];

export const providerEditPhotoGallerySelector = (
  state: any
): ProfileGalleryModel[] =>
  providerEditPhotoStateSelector(state)?.data?.profile?.gallery || [];

export const providerEditPhotoUploadProgressSelector = (state: any) =>
  providerEditPhotoStateSelector(state).uploadProgress;

export const providerEditPhotoUploadModalSelector = (state: any) =>
  providerEditPhotoStateSelector(state).uploadPhotosModal;

export const uploadPhotoErrorSelector = (state: any) =>
  providerEditPhotoStateSelector(state)?.errors?.files;
