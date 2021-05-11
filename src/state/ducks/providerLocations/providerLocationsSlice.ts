import { combineReducers, createSlice, nanoid } from '@reduxjs/toolkit';

import { ProfileEditProviderModel } from 'features/provider/types';
import {
  ErrorAction,
  LoadingAction,
  LoadingStatus,
  Nullable
} from 'shared/types/common';
import {
  EditProviderProfileDto,
  ProfileProfileAttributesDto,
  ProviderProfileDto
} from 'shared/types/generate';

import { RootState } from '../../store';
import { GetProviderProfileAction } from '../providerProfile';
import {
  AddOrEditLocationRequestAction,
  DeleteProviderLocationAction,
  DeleteProviderLocationSuccessAction,
  GetProviderLocationsSuccessAction,
  OpenLocationEditModalAction,
  OpenSetMainLocationModalAction,
  SetMainLocationRequestAction
} from './actionTypes';

export type ViewProviderLocationsState = {
  data: Nullable<ProfileEditProviderModel['locations']>;
  meta: Partial<{
    providerId: ProfileEditProviderModel['providerId'];
    profileId: ProfileEditProviderModel['profileId'];
    mainUnitId: ProfileProfileAttributesDto['mainUnitId'];
  }>;
  loading: LoadingStatus;
  error: Nullable<string>;
};

const viewProviderLocationsInitialState = {
  data: null,
  meta: {},
  loading: 'idle',
  error: null
} as ViewProviderLocationsState;

const viewProviderLocationsSlice = createSlice({
  name: 'providerLocations/view',
  initialState: viewProviderLocationsInitialState,
  reducers: {
    doGetProviderLocations(state, action: GetProviderProfileAction) {},
    getProviderLocationsLoading(state, action: LoadingAction) {
      state.loading = action.payload;
    },
    getProviderLocationsSuccess: {
      reducer(state, action: GetProviderLocationsSuccessAction) {
        state.data = action.payload;
        state.meta = action.meta;
        state.loading = 'finished';
        state.error = null;
      },
      prepare(
        payload: ProviderProfileDto['locations'],
        meta: ViewProviderLocationsState['meta']
      ) {
        return { payload, meta };
      }
    },
    getProviderLocationsError(state, action: ErrorAction) {
      state.data = null;
      state.meta = {};
      state.loading = 'finished';
      state.error = action.payload;
    },
    doDeleteProviderLocation(state, action: DeleteProviderLocationAction) {},
    deleteProviderLocationLoading(state, action: LoadingAction) {
      state.loading = action.payload;
    },
    deleteProviderLocationSuccess(
      state,
      action: DeleteProviderLocationSuccessAction
    ) {
      if (state.data) {
        state.data = state.data.filter(location => location.id !== action.payload);
      }
      state.loading = 'finished';
      state.error = null;
    },
    deleteProviderLocationError(state, action) {
      state.loading = 'finished';
      state.error = action.payload;
    }
  }
});

export type EditProviderLocationsState = {
  data: Nullable<EditProviderProfileDto['locations']>;
  loading: LoadingStatus;
  locationEditId: Nullable<string>;
  setMainLocationId: Nullable<string>;
};

const editProviderLocationsInitialState = {
  data: null,
  loading: 'idle',
  locationEditId: null,
  setMainLocationId: null
} as EditProviderLocationsState;

const editProviderLocationsSlice = createSlice({
  name: 'providerLocations/edit',
  initialState: editProviderLocationsInitialState,
  reducers: {
    addNewLocationOpenModal(state) {
      state.locationEditId = nanoid();
    },
    openLocationEditModal(state, action: OpenLocationEditModalAction) {
      state.locationEditId = action.payload.locationId;
    },
    closeEditLocationModal(state) {
      state.locationEditId = null;
    },
    addOrEditLocationRequest(state, action: AddOrEditLocationRequestAction) {
      state.loading = 'pending';
    },
    addOrEditLocationSuccess(state) {
      state.locationEditId = null;
      state.loading = 'finished';
    },

    openSetMainLocationModal(state, action: OpenSetMainLocationModalAction) {
      state.setMainLocationId = action.payload.locationId;
    },
    closeSetMainLocationModal(state) {
      state.setMainLocationId = null;
    },
    setMainLocationRequest(state, action: SetMainLocationRequestAction) {},
    setMainLocationSuccess(state) {
      state.setMainLocationId = null;
    }
  }
});

export const reducerName = 'providerLocations';

const reducer = combineReducers<{
  view: ReturnType<typeof viewProviderLocationsSlice.reducer>;
  edit: ReturnType<typeof editProviderLocationsSlice.reducer>;
}>({
  view: viewProviderLocationsSlice.reducer,
  edit: editProviderLocationsSlice.reducer
});

export type ProviderLocationsRootState = RootState &
  Record<typeof reducerName, ReturnType<typeof reducer>>;

export const {
  doGetProviderLocations,
  getProviderLocationsLoading,
  getProviderLocationsSuccess,
  getProviderLocationsError,
  doDeleteProviderLocation,
  deleteProviderLocationLoading,
  deleteProviderLocationSuccess,
  deleteProviderLocationError
} = viewProviderLocationsSlice.actions;

export const {
  addNewLocationOpenModal,
  closeEditLocationModal,
  addOrEditLocationRequest,
  addOrEditLocationSuccess,
  openLocationEditModal,
  setMainLocationRequest,
  setMainLocationSuccess,

  openSetMainLocationModal,
  closeSetMainLocationModal
} = editProviderLocationsSlice.actions;

export default reducer;
