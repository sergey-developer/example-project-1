import { PayloadAction } from '@reduxjs/toolkit';

import {
  ProfileAddressDto,
  ProfileGeoCoordinateDto,
  ProviderProfileDto,
  ProvidersWithTaxonomyDto
} from 'shared/types/generate';

import {
  CreateProviderData,
  CreateProviderError,
  CreateProviderSteps,
  ExistProviderProfileFull
} from './state';

export type GotToStepPayload = {
  step: CreateProviderSteps;
};

export type GotToStepAction = PayloadAction<GotToStepPayload>;

export type SetLocationPayload = {
  address: ProfileAddressDto;
  addressFull?: boolean;
  geoPoint: ProfileGeoCoordinateDto;
};

export type SetLocationAction = PayloadAction<SetLocationPayload>;

export type SetLocationSuccessPayload = {
  address: ProfileAddressDto;
  geoPoint: ProfileGeoCoordinateDto;
  regionId: string;
};

export type SetLocationSuccessAction = PayloadAction<SetLocationSuccessPayload>;

export type SetLocationErrorPayload = {
  error: CreateProviderError;
  address: ProfileAddressDto;
};

export type SetLocationErrorAction = PayloadAction<SetLocationErrorPayload>;

export type SetCategoryPayload = {
  categoryId: number;
};

export type SetCategoryAction = PayloadAction<SetCategoryPayload>;

export type SetSimpleFieldPayload = Partial<
  Pick<
    CreateProviderData,
    'isIndividual' | 'name' | 'phone' | 'email' | 'npi' | 'specialtyIds'
  >
>;

export type SetSimpleFieldAction = PayloadAction<SetSimpleFieldPayload>;

export type GetSpecialtiesByCategoryRequestPayload = {
  categoryId: number;
};

export type GetSpecialtiesByCategoryRequestAction = PayloadAction<GetSpecialtiesByCategoryRequestPayload>;

export type GetSpecialtiesByCategorySuccessPayload = {
  specialties: ProvidersWithTaxonomyDto[];
};

export type GetSpecialtiesByCategorySuccessAction = PayloadAction<GetSpecialtiesByCategorySuccessPayload>;

export type GetSpecialtiesByCategoryErrorPayload = {
  error: string;
};

export type GetSpecialtiesByCategoryErrorAction = PayloadAction<GetSpecialtiesByCategoryErrorPayload>;

export type CreateProfileSuccessPayload = {
  providerId: string;
};

export type CreateProfileSuccessAction = PayloadAction<CreateProfileSuccessPayload>;

export type ChangeNPIRequestPayload = {
  npi: string;
};

export type ChangeNPIRequestAction = PayloadAction<ChangeNPIRequestPayload>;

export type ProviderAlreadyExistsPayload = {
  providerIds: string[];
};

export type ProviderAlreadyExistsAction = PayloadAction<ProviderAlreadyExistsPayload>;

export type GetExistsProvidersInfoRequestPayload = {
  providerIds: string[];
};

export type GetExistsProvidersInfoRequestAction = PayloadAction<GetExistsProvidersInfoRequestPayload>;

export type SetExistsProviderInfoPayload = {
  providerInfo: ExistProviderProfileFull;
};

export type SetExistsProviderInfoAction = PayloadAction<SetExistsProviderInfoPayload>;

export type ChangeProviderNamePayload = {
  name: string;
};

export type ChangeProviderNameAction = PayloadAction<ChangeProviderNamePayload>;

export type GetSimilarNameProfilesRequestPayload = {
  name: string;
};

export type GetSimilarNameProfilesRequestAction = PayloadAction<GetSimilarNameProfilesRequestPayload>;

export type GetSimilarNameProviderProfileSuccessAction = {
  profile: ProviderProfileDto;
};

export type GetSimilarNameProviderProfileSuccessPayload = PayloadAction<GetSimilarNameProviderProfileSuccessAction>;
