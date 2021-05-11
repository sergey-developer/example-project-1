import { createSlice } from '@reduxjs/toolkit';
import lodashSet from 'lodash.set';

import {
  EditProviderStatusEnum,
  ProfileEditProviderModel
} from 'features/provider/types/models/EditProviderProfile';
import { LoadingStatus, Nullable, UpdateStatus } from 'shared/types';

import {
  AddOrEditLocationRequestAction,
  addOrEditLocationRequest
} from '../providerLocations';
import {
  AvatarUpdateErrorAction,
  AvatarUpdateRequestAction,
  ChangeProfileFieldAction,
  ChangeValidateFieldAction,
  CoverImageUpdateRequestAction,
  CoverImageUpdateSuccessAction,
  CreateProfileServicesAction,
  DeleteProfileServiceAction,
  GetProviderCategoryRequestAction,
  GetProviderCategorySuccessAction,
  GetProviderProfileErrorAction,
  GetProviderProfileRequestAction,
  GetProviderProfileSuccessAction,
  PublishProviderDiscardRequestAction,
  PublishProviderErrorAction,
  PublishProviderRequestAction,
  UpdateLegalInfoRequestAction,
  UpdateProfileServiceAction
} from './actionTypes';
import { defaultState } from './defaultState';
import { PublishProfileErrors } from './providerValisation';

export type ProviderEditProfileState = {
  data: ProfileEditProviderModel;
  loading: LoadingStatus;
  update: UpdateStatus;
  error: Nullable<string>;
  errors: {
    publishProfileErrors: Nullable<PublishProfileErrors>;
  };
  loaders: {
    coverLoading: LoadingStatus;
  };
  avatarLoading: LoadingStatus;
};

const providerEditProfileState: ProviderEditProfileState = {
  data: defaultState,
  update: 'idle',
  loading: 'idle',
  error: null,
  errors: {
    publishProfileErrors: null
  },
  loaders: {
    coverLoading: 'idle'
  },
  avatarLoading: 'idle'
};

const providerEditProfileSlice = createSlice({
  name: 'providerEditProfile',
  initialState: providerEditProfileState,
  reducers: {
    getProviderProfileRequest(state, action: GetProviderProfileRequestAction) {
      state.loading = 'pending';
    },
    getProviderProfileSuccess(state, action: GetProviderProfileSuccessAction) {
      state.data = action.payload.data;
      state.loading = 'finished';
    },
    getProviderProfileError(state, action: GetProviderProfileErrorAction) {
      state.loading = 'finished';
      state.error = action.payload.error;
    },

    getProviderCategoryRequest(state, action: GetProviderCategoryRequestAction) {
      state.loading = 'pending';
    },

    getProviderCategorySuccess(state, action: GetProviderCategorySuccessAction) {
      state.loading = 'finished';
      if (state.data?.profile) {
        state.data.profile.category = action.payload.category;
      }
    },

    changeProfileField(state, action: ChangeProfileFieldAction) {
      if (state.data) {
        state.data.profile = {
          ...state.data?.profile,
          ...action.payload
        };
        if (
          state.data.providerStatus &&
          state.data.providerStatus !== EditProviderStatusEnum.UpdateInProgress &&
          state.data.providerStatus !== EditProviderStatusEnum.OwnershipPending
        ) {
          state.data.providerStatus = EditProviderStatusEnum.Modified;
        }
      }
    },

    createProfileServices(state, action: CreateProfileServicesAction) {
      if (state.data?.services && Array.isArray(state.data?.services)) {
        state.data.services = state.data.services.concat([action.payload.service]);
      } else if (state.data) {
        state.data.services = [action.payload.service];
      }
      if (
        state?.data?.providerStatus &&
        state.data.providerStatus !== EditProviderStatusEnum.UpdateInProgress &&
        state.data.providerStatus !== EditProviderStatusEnum.OwnershipPending
      ) {
        state.data.providerStatus = EditProviderStatusEnum.Modified;
      }
    },

    updateProfileService(state, action: UpdateProfileServiceAction) {
      const editService = action.payload.service;
      if (state.data?.services?.length) {
        state.data.services = state.data?.services.map(service =>
          service.id === editService.id
            ? {
                ...service,
                ...editService,
                target: {
                  ...service.target,
                  ...editService.target
                }
              }
            : service
        );
      }

      if (
        state?.data?.providerStatus &&
        state.data.providerStatus !== EditProviderStatusEnum.UpdateInProgress &&
        state.data.providerStatus !== EditProviderStatusEnum.OwnershipPending
      ) {
        state.data.providerStatus = EditProviderStatusEnum.Modified;
      }
    },
    deleteProfileService(state, action: DeleteProfileServiceAction) {
      const deleteServiceId = action.payload.service.id;
      if (state.data?.services?.length) {
        state.data.services = state.data.services.filter(
          item => item.id !== deleteServiceId
        );
      }
      if (
        state?.data?.providerStatus &&
        state.data.providerStatus !== EditProviderStatusEnum.UpdateInProgress &&
        state.data.providerStatus !== EditProviderStatusEnum.OwnershipPending
      ) {
        state.data.providerStatus = EditProviderStatusEnum.Modified;
      }
    },

    avatarUpdateRequest(state, action: AvatarUpdateRequestAction) {
      state.avatarLoading = 'pending';
    },
    avatarUpdateSuccess(state) {
      state.avatarLoading = 'finished';
      state.error = null;
    },
    avatarUpdateError(state, action: AvatarUpdateErrorAction) {
      state.error = action.payload.message;
    },

    publishProviderRequest(state, action: PublishProviderRequestAction) {
      state.errors.publishProfileErrors = null;
    },
    publishProviderSuccess(state) {
      if (state.data) {
        state.data.providerStatus = EditProviderStatusEnum.UpdateInProgress;
      }
    },
    publishProviderError(state, action: PublishProviderErrorAction) {
      state.errors.publishProfileErrors = action.payload.profileErrors;
    },

    publishProviderDiscardRequest(
      state,
      actions: PublishProviderDiscardRequestAction
    ) {},
    publishProviderDiscardSuccess(state) {
      if (state.data) {
        state.data.providerStatus = EditProviderStatusEnum.Pristine;
      }
    },

    updateLegalInfoRequest(state, action: UpdateLegalInfoRequestAction) {
      if (state.data?.profile) {
        state.data.profile.legal = {
          ...state.data.profile.legal,
          ...action.payload.legal
        };
      }
    },

    coverImageUpdateRequest(state, action: CoverImageUpdateRequestAction) {
      state.loaders.coverLoading = 'pending';
    },
    coverImageUpdateSuccess(state, action: CoverImageUpdateSuccessAction) {
      state.loaders.coverLoading = 'finished';
      if (state.data.profile) {
        state.data.profile.coverImageUrl = action.payload.coverImageUrl;
      }
    },

    changeValidateField(state, action: ChangeValidateFieldAction) {
      const { field, index, subField } = action.payload;
      if (!state.errors.publishProfileErrors) {
        return state;
      }

      if (index !== undefined && subField) {
        lodashSet(
          state.errors.publishProfileErrors,
          `${field}[${index}].${subField}`,
          undefined
        );
      } else {
        delete state.errors.publishProfileErrors[field];
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(
      addOrEditLocationRequest,
      (state, action: AddOrEditLocationRequestAction) => {
        state.data.locations?.push({
          id: action.payload.locationId,
          target: action.payload.target
        });

        delete state.errors.publishProfileErrors?.locations;
      }
    );
  }
});

export const { name } = providerEditProfileSlice;

export const {
  getProviderProfileRequest,
  getProviderProfileSuccess,
  getProviderProfileError,
  //Category
  getProviderCategoryRequest,
  getProviderCategorySuccess,

  //Services
  createProfileServices,
  updateProfileService,
  deleteProfileService,

  changeProfileField,

  avatarUpdateRequest,
  avatarUpdateSuccess,
  avatarUpdateError,

  publishProviderRequest,
  publishProviderSuccess,
  publishProviderError,
  publishProviderDiscardRequest,
  publishProviderDiscardSuccess,

  updateLegalInfoRequest,

  coverImageUpdateRequest,
  coverImageUpdateSuccess,

  changeValidateField
} = providerEditProfileSlice.actions;

export default providerEditProfileSlice.reducer;
