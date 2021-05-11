import { PayloadAction } from '@reduxjs/toolkit';
import { type } from 'node:os';

import {
  ProfileLegalModel,
  ProfileProfileAttributesModel,
  ServiceInProfileModel
} from 'features/provider/types/models/EditProviderProfile';
import { CategoryDto } from 'shared/types/dto/CategoryDto';
import { EditProviderProfileDto } from 'shared/types/generate';

import {
  AffiliateError,
  AwardsError,
  EducationError,
  PublishProfileErrors,
  ServicesError
} from './providerValisation';

export type GetProviderProfileRequestPayload = {
  providerId: string;
};

export type GetProviderProfileRequestAction = PayloadAction<GetProviderProfileRequestPayload>;

export type GetProviderProfileSuccessPayload = {
  data: EditProviderProfileDto;
};

export type GetProviderProfileSuccessAction = PayloadAction<GetProviderProfileSuccessPayload>;

export type GetProviderProfileErrorPayload = {
  error: string;
};

export type GetProviderProfileErrorAction = PayloadAction<GetProviderProfileErrorPayload>;

export type ChangeProfileFieldPayload = Pick<
  ProfileProfileAttributesModel,
  | 'photoUrl'
  | 'name'
  | 'overview'
  | 'isIndividual'
  | 'languages'
  | 'specialtyIds'
  | 'healthcare'
  | 'education'
  | 'awards'
  | 'affiliations'
  | 'legal'
  | 'coverImageUrl'
>;
export type ChangeProfileFieldAction = PayloadAction<ChangeProfileFieldPayload>;

export type GetProviderCategoryRequestPayload = {
  categoryId: number;
};

export type GetProviderCategoryRequestAction = PayloadAction<GetProviderCategoryRequestPayload>;

export type GetProviderCategorySuccessPayload = {
  category: CategoryDto;
};

export type GetProviderCategorySuccessAction = PayloadAction<GetProviderCategorySuccessPayload>;

export type CreateProfileServicesPayload = {
  service: ServiceInProfileModel;
};

export type CreateProfileServicesAction = PayloadAction<CreateProfileServicesPayload>;

export type UpdateProfileServicePayload = {
  service: ServiceInProfileModel;
};

export type UpdateProfileServiceAction = PayloadAction<UpdateProfileServicePayload>;

export type DeleteProfileServicePayload = {
  service: ServiceInProfileModel;
};

export type DeleteProfileServiceAction = PayloadAction<DeleteProfileServicePayload>;

export type AvatarUpdateRequestPayload = {
  file: Blob;
};

export type AvatarUpdateRequestAction = PayloadAction<AvatarUpdateRequestPayload>;

export type AvatarUpdateErrorPayload = {
  message: string;
};

export type AvatarUpdateErrorAction = PayloadAction<AvatarUpdateErrorPayload>;

export type PublishProviderRequestPayload = {
  profileId: string;
  providerId: string;
};

export type PublishProviderRequestAction = PayloadAction<PublishProviderRequestPayload>;

export type PublishProviderErrorPayload = {
  profileErrors: PublishProfileErrors;
};

export type PublishProviderErrorAction = PayloadAction<PublishProviderErrorPayload>;

export type PublishProviderDiscardRequestPayload = {
  profileId: string;
  providerId: string;
};

export type PublishProviderDiscardRequestAction = PayloadAction<PublishProviderDiscardRequestPayload>;

export type UpdateLegalInfoRequestPayload = {
  legal: ProfileLegalModel;
};

export type UpdateLegalInfoRequestAction = PayloadAction<UpdateLegalInfoRequestPayload>;

export type CoverImageUpdateRequestPayload = {
  file: Blob;
};

export type CoverImageUpdateRequestAction = PayloadAction<CoverImageUpdateRequestPayload>;

export type CoverImageUpdateSuccessPayload = {
  coverImageUrl: string;
};

export type CoverImageUpdateSuccessAction = PayloadAction<CoverImageUpdateSuccessPayload>;

export type ChangeValidateFieldPayload = {
  field: keyof Omit<PublishProfileErrors, 'locations'>;
  subField?:
    | keyof ServicesError
    | keyof EducationError
    | keyof AwardsError
    | keyof AffiliateError;
  index?: number;
};

export type ChangeValidateFieldAction = PayloadAction<ChangeValidateFieldPayload>;
