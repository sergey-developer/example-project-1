import { PayloadAction } from '@reduxjs/toolkit';

import {
  ProfileLocationAttributesDto,
  ProviderProfileDto,
  ProviderProfileLocationDto
} from 'shared/types/generate';

import { ViewProviderLocationsState } from './providerLocationsSlice';

export type AddOrEditLocationRequestPayload = {
  locationId: string;
  target: ProfileLocationAttributesDto;
  providerId: string;
  profileId: string;
};

export type AddOrEditLocationRequestAction = PayloadAction<AddOrEditLocationRequestPayload>;

export type GetProviderLocationsSuccessAction = PayloadAction<
  ProviderProfileDto['locations'],
  string,
  ViewProviderLocationsState['meta']
>;

export type DeleteProviderLocationPayload = Pick<
  ProviderProfileLocationDto,
  'id' | 'profileId' | 'providerId'
>;

export type DeleteProviderLocationAction = PayloadAction<DeleteProviderLocationPayload>;

export type DeleteProviderLocationSuccessAction = PayloadAction<
  ProviderProfileLocationDto['id']
>;

export type OpenLocationEditModalPayload = {
  locationId: string;
};

export type OpenLocationEditModalAction = PayloadAction<OpenLocationEditModalPayload>;

export type SetMainLocationRequestPayload = {
  locationId: string;
  providerId: string;
  profileId: string;
};

export type SetMainLocationRequestAction = PayloadAction<SetMainLocationRequestPayload>;

export type OpenSetMainLocationModalPayload = {
  locationId: string;
};

export type OpenSetMainLocationModalAction = PayloadAction<OpenSetMainLocationModalPayload>;
