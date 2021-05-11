import { ProfileEditProviderModel } from 'features/provider/types';
import { LoadingStatus, Nullable } from 'shared/types';
import { ErrorTypes } from 'shared/types/error/error-types';
import {
  ProfileAddressDto,
  ProfileGeoCoordinateDto,
  ProfileProviderDto,
  ProviderProfileDto,
  ProvidersWithTaxonomyDto
} from 'shared/types/generate';

export enum CreateProviderSteps {
  Address,
  MainCategory,
  ProviderName,
  AdditionInfo,
  Success
}

export type CreateProviderError = {
  type: Nullable<ErrorTypes>;
  message?: Nullable<string>;
};

export type CreateProviderErrorsMap = {
  address: Nullable<CreateProviderError>;
  npi: Nullable<CreateProviderError>;
};

export type CreateProviderData = {
  name: Nullable<string>;
  categoryId: Nullable<number>;
  address: Nullable<ProfileAddressDto>;
  geoPoint: Nullable<ProfileGeoCoordinateDto>;
  regionId: Nullable<string>;
  isIndividual: Nullable<boolean>;
  phone: Nullable<string>;
  email: Nullable<string>;
  npi: Nullable<string>;
  providerId: Nullable<string>;
  specialtyIds: number[];
};

export type ExistProviderProfileFull = {
  activeProfile: Nullable<ProviderProfileDto>;
} & ProfileProviderDto;

export const defaultStateData: CreateProviderData = {
  name: null,
  categoryId: null,
  address: null,
  geoPoint: null,
  regionId: null,
  isIndividual: null,
  phone: null,
  email: null,
  npi: null,
  providerId: null,
  specialtyIds: []
};

export type CreateProviderState = {
  data: CreateProviderData;
  step: CreateProviderSteps;
  specialtiesDirectory: ProvidersWithTaxonomyDto[];
  existProviderIds: string[];
  existProviderProfiles: ExistProviderProfileFull[];
  similarNameProviderProfiles: ProviderProfileDto[];
  loaders: {
    existCheck: LoadingStatus;
    similarProviderProfiles: LoadingStatus;
  };
  error: Nullable<string>;
  errors: CreateProviderErrorsMap;
};

export const createProviderState: CreateProviderState = {
  data: defaultStateData,
  specialtiesDirectory: [],
  existProviderIds: [],
  existProviderProfiles: [],
  similarNameProviderProfiles: [],
  loaders: {
    existCheck: 'idle',
    similarProviderProfiles: 'idle'
  },
  step: CreateProviderSteps.Address,
  error: null,
  errors: {
    address: null,
    npi: null
  }
};
