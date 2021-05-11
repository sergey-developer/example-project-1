import { PayloadAction } from '@reduxjs/toolkit';

import { ProviderProfileInsurance } from 'features/provider/types';
import { Nullable } from 'shared/types';
import { ProfileProfileAttributesDto } from 'shared/types/generate';
import { Specialty } from 'shared/types/model/specialty';

export type ChangeTextFieldPayload = Pick<
  ProfileProfileAttributesDto,
  'name' | 'overview'
>;

export type ChangeTextFieldAction = PayloadAction<ChangeTextFieldPayload>;

export type ChangeServicePayload = {
  index: number;
  name?: string;
  description?: string;
};

export type ChangeServiceAction = PayloadAction<ChangeServicePayload>;

export type DeleteServicePayload = {
  index: number;
};

export type DeleteServiceAction = PayloadAction<DeleteServicePayload>;

export type UploadServiceImagePayload = {
  file: File;
  index: number;
};

export type UploadServiceImageAction = PayloadAction<UploadServiceImagePayload>;

export type UpdateServiceImageUrlPayload = {
  index: number;
  imageUrl: Nullable<string>;
};

export type UpdateServiceImageUrlAction = PayloadAction<UpdateServiceImageUrlPayload>;

export type ChangeAwardPayload = {
  index: number;
  name?: string;
  description?: string;
};

export type ChangeAwardAction = PayloadAction<ChangeAwardPayload>;

export type DeleteAwardPayload = {
  index: number;
};

export type DeleteAwardAction = PayloadAction<DeleteAwardPayload>;

export type UploadAwardImagePayload = {
  index: number;
  file: File;
};

export type UploadAwardImageAction = PayloadAction<UploadAwardImagePayload>;

export type UpdateAwardPhotoUrlPayload = {
  index: number;
  photoUrl: string | null;
};

export type UpdateAwardPhotoUrlAction = PayloadAction<UpdateAwardPhotoUrlPayload>;

export type ChangeEducationPayload = {
  index: number;
  degree?: string;
  schoolName?: string;
  graduated?: number;
};

export type ChangeEducationAction = PayloadAction<ChangeEducationPayload>;

export type DeleteEducationPayload = {
  index: number;
};

export type DeleteEducationAction = PayloadAction<DeleteEducationPayload>;

export type UploadEducationImagePayload = {
  index: number;
  file: File;
};

export type UploadEducationImageAction = PayloadAction<UploadEducationImagePayload>;

export type UpdateEducationPhotoUrlPayload = {
  index: number;
  photoUrl: Nullable<string>;
};

export type UpdateEducationPhotoUrlAction = PayloadAction<UpdateEducationPhotoUrlPayload>;

export type ChangeAffiliatePayload = {
  index: number;
  name?: string;
  webSite?: string;
};

export type ChangeAffiliateAuction = PayloadAction<ChangeAffiliatePayload>;

export type DeleteAffiliatePayload = {
  index: number;
};

export type DeleteAffiliateAction = PayloadAction<DeleteAffiliatePayload>;

export type ChangeSelectInsurancesPayload = {
  insurances: ProviderProfileInsurance[];
};

export type ChangeSelectInsurancesAction = PayloadAction<ChangeSelectInsurancesPayload>;

export type ChangeSelectSpecialitiesPayload = {
  specialties: Specialty[];
};

export type ChangeSelectSpecialitiesAction = PayloadAction<ChangeSelectSpecialitiesPayload>;
