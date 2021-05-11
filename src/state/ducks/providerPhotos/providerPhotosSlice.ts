import { createSlice } from '@reduxjs/toolkit';
import { type } from 'node:os';

import { ProfileEditProviderModel } from 'features/provider/types/models/EditProviderProfile';
import { LoadingStatus, Nullable, UpdateStatus } from 'shared/types';
import { FileErrorTypes } from 'shared/types/error/error-types';

import {
  DeletePhotoRequestAction,
  LoadProviderPhotosErrorAction,
  LoadProviderPhotosRequestAction,
  LoadProviderPhotosSuccessAction,
  UpdatePhotosErrorAction,
  UpdatePhotosRequestAction,
  UploadPhotoRejectAction,
  UploadPhotosErrorAction,
  UploadPhotosProgressAction,
  UploadPhotosRequestAction,
  UploadPhotosSuccessAction
} from './actionTypes';
import { defaultState } from './defaultState';

export type FileError = {
  fileName: string;
  errorType: FileErrorTypes;
};

type ErrorTypes = {
  files: FileError[];
};

export type ProviderEditPhotoState = {
  data: ProfileEditProviderModel;
  loading: LoadingStatus;
  update: UpdateStatus;
  error: Nullable<string>;
  errors: ErrorTypes;
  uploadProgress: Nullable<number>;
  uploadPhotosModal: boolean;
};

const providerEditPhotoState: ProviderEditPhotoState = {
  data: defaultState,
  update: 'idle',
  loading: 'idle',
  error: null,
  errors: {
    files: []
  },
  uploadProgress: null,
  uploadPhotosModal: false
};

const providerEditPhotoSlice = createSlice({
  name: 'providerEditPhoto',
  initialState: providerEditPhotoState,
  reducers: {
    //LoadPhoto
    loadProviderPhotosRequest(state, action: LoadProviderPhotosRequestAction) {
      state.loading = 'pending';
    },
    loadProviderPhotosSuccess(state, action: LoadProviderPhotosSuccessAction) {
      state.loading = 'finished';
      state.data = action.payload.data;
    },
    loadProviderPhotosError(state, action: LoadProviderPhotosErrorAction) {
      state.loading = 'finished';
      state.error = action.payload.message;
    },

    //UploadPhoto
    uploadPhotosRequest(state, action: UploadPhotosRequestAction) {
      state.loading = 'pending';
    },
    uploadPhotosSuccess(state, action: UploadPhotosSuccessAction) {
      state.loading = 'finished';
      state.uploadProgress = null;

      if (state.data.profile?.gallery) {
        state.data.profile.gallery = action.payload.gallery;
      }
    },
    uploadPhotosProgress(state, action: UploadPhotosProgressAction) {
      state.uploadProgress = action.payload.progress;
    },
    uploadPhotosError(state, action: UploadPhotosErrorAction) {
      state.loading = 'finished';
      state.error = action.payload.message;
      state.uploadProgress = null;
    },

    uploadPhotoReject(state, action: UploadPhotoRejectAction) {
      state.errors.files.push(action.payload);
    },

    closeUploadRejectModal(state) {
      state.errors.files = [];
    },

    openUploadPhotoModal(state) {
      state.uploadPhotosModal = true;
      state.errors.files = [];
    },
    closeUploadPhotoModal(state) {
      state.uploadPhotosModal = false;
    },

    //UpdatePhoto
    updatePhotosRequest(state, action: UpdatePhotosRequestAction) {
      state.loading = 'pending';
    },
    updatePhotosSuccess(state) {
      state.loading = 'finished';
      state.uploadPhotosModal = false;
    },
    updatePhotosError(state, action: UpdatePhotosErrorAction) {
      state.loading = 'finished';
      state.error = action.payload.message;
    },

    //DeletePhoto
    deletePhotoRequest(state, action: DeletePhotoRequestAction) {
      state.loading = 'pending';
    }
  }
});

export const { name } = providerEditPhotoSlice;

export const {
  loadProviderPhotosError,
  loadProviderPhotosRequest,
  loadProviderPhotosSuccess,

  openUploadPhotoModal,
  closeUploadPhotoModal,
  closeUploadRejectModal,

  uploadPhotosRequest,
  uploadPhotosProgress,
  uploadPhotosSuccess,
  uploadPhotosError,
  uploadPhotoReject,

  updatePhotosRequest,
  updatePhotosSuccess,
  updatePhotosError,

  deletePhotoRequest
} = providerEditPhotoSlice.actions;

export default providerEditPhotoSlice.reducer;
