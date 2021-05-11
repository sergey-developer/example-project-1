import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ProviderDto } from 'features/provider/types';
import { ProviderProfile, ProviderProfileInsurance } from 'features/provider/types';
import {
  ErrorAction,
  LoadingAction,
  LoadingStatus,
  Nullable,
  UpdateStatus
} from 'shared/types';

import {
  ChangeAffiliateAuction,
  ChangeAwardAction,
  ChangeEducationAction,
  ChangeSelectInsurancesAction,
  ChangeSelectSpecialitiesAction,
  ChangeServiceAction,
  ChangeTextFieldAction,
  DeleteAffiliateAction,
  DeleteAwardAction,
  DeleteEducationAction,
  DeleteServiceAction,
  UpdateAwardPhotoUrlAction,
  UpdateEducationPhotoUrlAction,
  UpdateServiceImageUrlAction,
  UploadAwardImageAction,
  UploadEducationImageAction,
  UploadServiceImageAction
} from './actionTypes';
import { defaultState } from './defaultState';

export type ProviderProfileState = {
  data: Nullable<ProviderProfile>;
  loading: LoadingStatus;
  update: UpdateStatus;
  error: Nullable<string>;
};

export type GetProviderProfileAction = PayloadAction<{
  profileId: ProviderDto['activeProfileId'];
  providerId: ProviderDto['id'];
}>;

export type GetActiveProfile = PayloadAction<{
  providerId: ProviderDto['id'];
}>;

export type ChangeAvatarStart = PayloadAction<{
  file: File;
  name: string;
}>;

export type ChangeAvatarSuccess = PayloadAction<{
  photoUrl: string;
}>;

const providerProfileInitialState = {
  data: defaultState,
  update: 'idle',
  loading: 'idle',
  error: null
} as ProviderProfileState;

const providerProfileSlice = createSlice({
  name: 'providerProfile',
  initialState: providerProfileInitialState,
  reducers: {
    doGetProviderProfile(state, action: GetProviderProfileAction) {},
    doGetActiveProfile(state, action: GetActiveProfile) {},
    providerProfileLoading(state, action: LoadingAction) {
      state.data = null;
      state.loading = action.payload;
      state.error = null;
    },
    getProviderProfileSuccess(state, action: PayloadAction<ProviderProfile>) {
      state.data = action.payload;
      state.loading = 'finished';
      state.error = null;
    },
    getProviderProfileError(state, action: ErrorAction) {
      state.data = null;
      state.loading = 'finished';
      state.error = action.payload;
    },
    getInsurancesInProfile() {},
    getInsurancesInProfileSuccess(
      state,
      action: PayloadAction<ProviderProfileInsurance[]>
    ) {
      if (state.data?.healthcare) {
        state.data.healthcare.insurances = action.payload;
      }
    },
    getInsurancesInProfileError(state, action: ErrorAction) {
      state.error = action.payload;
    },

    updateStart(state) {
      state.update = 'update';
    },

    updateEnd(state) {
      state.update = 'idle';
    },

    updateError(state, action: ErrorAction) {
      state.update = 'idle';
      state.error = action.payload;
    },

    changeTextFieldValue(state, action: ChangeTextFieldAction) {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },

    changeAvatarStart(state, action: ChangeAvatarStart) {},

    changeAvatarSuccess(state, action: ChangeAvatarSuccess) {
      if (state.data) {
        state.data.photoUrl = action.payload.photoUrl;
      }
    },

    changeService(state, action: ChangeServiceAction) {
      const { index, ...rest } = action.payload;

      const services = state.data?.services;

      if (services && index !== undefined) {
        services[index] = {
          ...(services[index] && services[index]),
          ...rest
        };
      }
    },
    deleteService(state, action: DeleteServiceAction) {
      const { index } = action.payload;

      if (state.data && state.data?.services && index !== undefined) {
        state.data.services = state.data.services.filter(
          (_, serviceIndex) => serviceIndex !== index
        );
      }
    },
    uploadServiceImage(state, action: UploadServiceImageAction) {},
    updateServiceImageUrl(state, action: UpdateServiceImageUrlAction) {
      const { index, imageUrl } = action.payload;
      if (state.data && state.data.services) {
        state.data.services[index].imageUrl = imageUrl;
      }
    },

    //Awards Actions
    changeAward(state, action: ChangeAwardAction) {
      const { index, ...rest } = action.payload;
      const awards = state.data?.awards;
      if (awards) {
        awards[index] = {
          ...awards[index],
          ...rest
        };
      }
    },
    deleteAward(state, action: DeleteAwardAction) {
      const { index } = action.payload;
      if (state.data?.awards) {
        state.data.awards = state.data?.awards.filter(
          (_, awardIndex) => awardIndex !== index
        );
      }
    },
    uploadAwardImage(state, action: UploadAwardImageAction) {},
    updateAwardProtoUrl(state, action: UpdateAwardPhotoUrlAction) {
      const { index, photoUrl } = action.payload;
      if (state.data?.awards) {
        state.data.awards[index].photoUrl = photoUrl;
      }
    },

    //Education Actions
    changeEducation(state, action: ChangeEducationAction) {
      const { index, ...rest } = action.payload;
      const education = state.data?.education;
      if (education) {
        education[index] = {
          ...education[index],
          ...rest
        };
      }
    },
    deleteEducation(state, action: DeleteEducationAction) {
      const { index } = action.payload;
      if (state.data?.education) {
        state.data.education = state.data?.education.filter(
          (_, educationIndex) => educationIndex !== index
        );
      }
    },
    uploadEducationImage(state, action: UploadEducationImageAction) {},
    updateEducationPhotoUrl(state, action: UpdateEducationPhotoUrlAction) {
      const { index, photoUrl } = action.payload;
      if (state.data?.education) {
        state.data.education[index].photoUrl = photoUrl;
      }
    },

    //Affiliates Action
    changeAffiliate(state, action: ChangeAffiliateAuction) {
      const { index, ...rest } = action.payload;
      const affiliations = state.data?.affiliations;
      if (affiliations) {
        affiliations[index] = {
          ...affiliations[index],
          ...rest
        };
      }
    },
    deleteAffiliate(state, action: DeleteAffiliateAction) {
      const { index } = action.payload;
      if (state.data?.affiliations) {
        state.data.affiliations = state.data?.affiliations.filter(
          (_, affiliationsIndex) => affiliationsIndex !== index
        );
      }
    },
    //Insurances Actions
    changeSelectInsurances(state, action: ChangeSelectInsurancesAction) {
      if (state.data?.healthcare?.insurances) {
        state.data.healthcare.insurances = action.payload.insurances;
      }
    },

    //Specialities Actions
    changeSelectSpecialities(state, action: ChangeSelectSpecialitiesAction) {
      if (state.data?.specialties) {
        state.data.specialties = action.payload.specialties;
      }
    }
  }
});

/**
 * name should be used in the "selectors" and "useInjectReducer"
 */
export const { name } = providerProfileSlice;

export const {
  doGetProviderProfile,
  providerProfileLoading,
  getProviderProfileSuccess,
  getProviderProfileError,
  doGetActiveProfile,
  getInsurancesInProfile,
  getInsurancesInProfileSuccess,
  getInsurancesInProfileError,

  updateStart,
  updateError,
  updateEnd,

  changeTextFieldValue,

  changeAvatarStart,
  changeAvatarSuccess,

  changeService,
  deleteService,
  updateServiceImageUrl,
  uploadServiceImage,

  // Awards Actions
  changeAward,
  deleteAward,
  uploadAwardImage,
  updateAwardProtoUrl,

  //Education Actions
  changeEducation,
  deleteEducation,
  uploadEducationImage,
  updateEducationPhotoUrl,

  //Affiliates Action
  changeAffiliate,
  deleteAffiliate,

  //Insurances Actions
  changeSelectInsurances,

  //Specialities Actions
  changeSelectSpecialities
} = providerProfileSlice.actions;

export default providerProfileSlice.reducer;
