import { createSlice } from '@reduxjs/toolkit';

import { ErrorTypes } from 'shared/types/error/error-types';

import {
  ChangeNPIRequestAction,
  ChangeProviderNameAction,
  CreateProfileSuccessAction,
  GetExistsProvidersInfoRequestAction,
  GetSimilarNameProfilesRequestAction,
  GetSimilarNameProviderProfileSuccessPayload,
  GetSpecialtiesByCategoryErrorAction,
  GetSpecialtiesByCategoryRequestAction,
  GetSpecialtiesByCategorySuccessAction,
  GotToStepAction,
  ProviderAlreadyExistsAction,
  SetCategoryAction,
  SetExistsProviderInfoAction,
  SetLocationAction,
  SetLocationErrorAction,
  SetLocationSuccessAction,
  SetSimpleFieldAction
} from './actionTypes';
import { CreateProviderSteps, createProviderState } from './state';
import { loadDataFromSessionStore, saveDataToSessionStore } from './utils';

export const sliceName = 'createProvider';

const createProviderSlice = createSlice({
  name: sliceName,
  initialState: loadDataFromSessionStore(),
  reducers: {
    goToStep(state, action: GotToStepAction) {
      state.step = action.payload.step;
      saveDataToSessionStore(state);
    },
    setLocationRequest(state, action: SetLocationAction) {},
    setLocationSuccess(state, action: SetLocationSuccessAction) {
      state.data.address = action.payload.address;
      state.data.geoPoint = action.payload.geoPoint;
      state.data.regionId = action.payload.regionId;
      state.errors.address = null;
      saveDataToSessionStore(state);
    },
    setLocationError(state, action: SetLocationErrorAction) {
      state.errors.address = action.payload.error;
      state.data.address = action.payload.address;
    },
    setCategory(state, action: SetCategoryAction) {
      state.data.categoryId = action.payload.categoryId;
      state.data.specialtyIds = [];
      saveDataToSessionStore(state);
    },
    setSimpleField(state, action: SetSimpleFieldAction) {
      state.data = {
        ...state.data,
        ...action.payload
      };
      saveDataToSessionStore(state);
    },

    getSpecialtiesByCategoryRequest(
      state,
      action: GetSpecialtiesByCategoryRequestAction
    ) {},
    getSpecialtiesByCategorySuccess(
      state,
      action: GetSpecialtiesByCategorySuccessAction
    ) {
      state.specialtiesDirectory = action.payload.specialties;
      saveDataToSessionStore(state);
    },
    getSpecialtiesByCategoryError(
      state,
      action: GetSpecialtiesByCategoryErrorAction
    ) {
      state.error = action.payload.error;
    },
    createProfileRequest(state) {},
    createProfileSuccess(state, action: CreateProfileSuccessAction) {
      state.data.providerId = action.payload.providerId;
      state.step = CreateProviderSteps.Success;
      saveDataToSessionStore(state);
    },
    createProfileError(state) {},

    setDefaultState(state) {
      saveDataToSessionStore(createProviderState);
      return createProviderState;
    },
    changeNPIRequest(state, action: ChangeNPIRequestAction) {
      state.data.npi = action.payload.npi;

      state.existProviderIds = [];
      state.errors.npi = null;
      state.existProviderProfiles = [];
      saveDataToSessionStore(state);
    },
    providerAlreadyExists(state, action: ProviderAlreadyExistsAction) {
      state.existProviderIds = action.payload.providerIds;
      state.errors.npi = {
        type: ErrorTypes.PROVIDER_WITH_NPI_EXISTS
      };
      saveDataToSessionStore(state);
    },

    checkExistsProvidersRequest(state) {
      state.loaders.existCheck = 'pending';
    },
    checkExistsProvidersSuccess(state) {
      state.loaders.existCheck = 'finished';
    },

    getExistsProvidersInfoRequest(
      state,
      action: GetExistsProvidersInfoRequestAction
    ) {},
    setExistsProviderInfo(state, action: SetExistsProviderInfoAction) {
      state.existProviderProfiles.push(action.payload.providerInfo);
      saveDataToSessionStore(state);
    },
    changeProviderName(state, action: ChangeProviderNameAction) {
      state.data.name = action.payload.name;
      state.similarNameProviderProfiles = [];
      state.loaders.similarProviderProfiles = 'finished';
      saveDataToSessionStore(state);
    },

    getSimilarNameProviderProfilesRequest(
      state,
      action: GetSimilarNameProfilesRequestAction
    ) {
      state.loaders.similarProviderProfiles = 'pending';
    },
    getSimilarNameProviderProfileSuccess(
      state,
      action: GetSimilarNameProviderProfileSuccessPayload
    ) {
      state.similarNameProviderProfiles.push(action.payload.profile);
    },
    getAllSimilarNameProviderProfilesSuccess(state) {
      state.loaders.similarProviderProfiles = 'finished';
    }
  }
});

export const { name } = createProviderSlice;

export const {
  goToStep,
  setLocationRequest,
  setLocationSuccess,
  setLocationError,
  setCategory,
  setSimpleField,

  getSpecialtiesByCategoryRequest,
  getSpecialtiesByCategorySuccess,
  getSpecialtiesByCategoryError,

  createProfileRequest,
  createProfileSuccess,
  createProfileError,

  setDefaultState,

  changeNPIRequest,
  providerAlreadyExists,

  checkExistsProvidersRequest,
  checkExistsProvidersSuccess,

  getExistsProvidersInfoRequest,
  setExistsProviderInfo,

  changeProviderName,
  getSimilarNameProviderProfilesRequest,
  getSimilarNameProviderProfileSuccess,
  getAllSimilarNameProviderProfilesSuccess
} = createProviderSlice.actions;

export default createProviderSlice.reducer;
