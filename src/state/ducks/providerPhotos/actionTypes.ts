import { PayloadAction } from '@reduxjs/toolkit';

import { FileErrorTypes } from 'shared/types/error/error-types';
import { EditProviderProfileDto, ProfileGalleryDto } from 'shared/types/generate';

export type LoadProviderPhotosRequestPayload = {
  providerId: string;
};

export type LoadProviderPhotosRequestAction = PayloadAction<LoadProviderPhotosRequestPayload>;

export type LoadProviderPhotosSuccessPayload = {
  data: EditProviderProfileDto;
};

export type LoadProviderPhotosSuccessAction = PayloadAction<LoadProviderPhotosSuccessPayload>;

export type LoadProviderPhotosErrorPayload = {
  message: string;
};

export type LoadProviderPhotosErrorAction = PayloadAction<LoadProviderPhotosErrorPayload>;

export type UploadPhotosRequestPayload = {
  files: File[];
};

export type UploadPhotosRequestAction = PayloadAction<UploadPhotosRequestPayload>;

export type UploadPhotosSuccessPayload = {
  gallery: ProfileGalleryDto[];
};

export type UploadPhotosSuccessAction = PayloadAction<UploadPhotosSuccessPayload>;

export type UploadPhotosProgressPayload = {
  progress: number;
};

export type UploadPhotosProgressAction = PayloadAction<UploadPhotosProgressPayload>;

export type UploadPhotosErrorPayload = {
  message: string;
};

export type UploadPhotosErrorAction = PayloadAction<UploadPhotosErrorPayload>;

export type UploadPhotoRejectPayload = {
  fileName: string;
  errorType: FileErrorTypes;
};

export type UploadPhotoRejectAction = PayloadAction<UploadPhotoRejectPayload>;

export type UpdatePhotosRequestPayload = {
  gallery: ProfileGalleryDto[];
};

export type UpdatePhotosRequestAction = PayloadAction<UpdatePhotosRequestPayload>;

export type UpdatePhotosErrorPayload = {
  message: string;
};

export type UpdatePhotosErrorAction = PayloadAction<UpdatePhotosErrorPayload>;

export type DeletePhotoRequestPayload = {
  index: number;
};

export type DeletePhotoRequestAction = PayloadAction<DeletePhotoRequestPayload>;

export type DeletePhotoSuccessPayload = {
  gallery: ProfileGalleryDto[];
};

export type DeletePhotoSuccessAction = PayloadAction<DeletePhotoSuccessPayload>;

export type DeletePhotoErrorPayload = {
  message: string;
};

export type DeletePhotoErrorAction = PayloadAction<DeletePhotoErrorPayload>;
