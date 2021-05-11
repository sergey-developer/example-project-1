import { call, put, takeLatest } from 'redux-saga/effects';

import { EditProviderApi, ProviderApi } from 'features/provider/services';
import { ProfileEditElementType } from 'features/provider/types/models/EditProviderProfile';
import { EditProviderProfileDto, ProviderProfileDto } from 'shared/types/generate';

import { GetProviderProfileAction } from '../providerProfile';
import {
  AddOrEditLocationRequestAction,
  DeleteProviderLocationAction,
  SetMainLocationRequestAction
} from './actionTypes';
import {
  addOrEditLocationRequest,
  addOrEditLocationSuccess,
  deleteProviderLocationError,
  deleteProviderLocationLoading,
  deleteProviderLocationSuccess,
  doDeleteProviderLocation,
  doGetProviderLocations,
  getProviderLocationsError,
  getProviderLocationsLoading,
  getProviderLocationsSuccess,
  setMainLocationRequest,
  setMainLocationSuccess
} from './providerLocationsSlice';

function* getProviderLocationsSaga({ payload }: GetProviderProfileAction) {
  yield put(getProviderLocationsLoading('pending'));

  try {
    const profile: EditProviderProfileDto = yield call(
      EditProviderApi.getProfile,
      payload.profileId!,
      payload.providerId
    );

    yield put(
      getProviderLocationsSuccess(profile.locations, {
        mainUnitId: profile.profile?.mainUnitId,
        profileId: profile.profileId,
        providerId: profile.providerId
      })
    );
  } catch (error) {
    yield put(getProviderLocationsError(error.message));
  }
}

function* addOrEditLocationRequestSaga({ payload }: AddOrEditLocationRequestAction) {
  try {
    yield call(
      EditProviderApi.createOrUpdateProviderLocation,
      payload.providerId,
      payload.profileId,
      payload.locationId,
      {
        id: payload.locationId,
        target: payload.target
      }
    );

    yield put(addOrEditLocationSuccess());
    yield put(
      doGetProviderLocations({
        profileId: payload.profileId,
        providerId: payload.providerId
      })
    );
  } catch (error) {
    console.log(error);
  }
}

function* deleteProviderLocationSaga({ payload }: DeleteProviderLocationAction) {
  yield put(deleteProviderLocationLoading('pending'));

  try {
    yield call(
      EditProviderApi.deleteProviderProfileElement,
      payload.providerId!,
      payload.profileId!,
      ProfileEditElementType.LOCATION,
      payload.id!
    );

    yield put(deleteProviderLocationSuccess(payload.id));
  } catch (error) {
    yield put(deleteProviderLocationError(error.message));
  }
}

function* setMainLocationRequestSaga({ payload }: SetMainLocationRequestAction) {
  const { profileId, providerId, locationId } = payload;

  try {
    yield call(EditProviderApi.updateProfile, providerId, profileId, {
      mainUnitId: locationId
    });

    yield put(setMainLocationSuccess());

    yield put(
      doGetProviderLocations({
        profileId: profileId,
        providerId: providerId
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export function* getProviderLocationsRootSaga() {
  yield takeLatest(doGetProviderLocations.type, getProviderLocationsSaga);
  yield takeLatest(addOrEditLocationRequest.type, addOrEditLocationRequestSaga);
  yield takeLatest(doDeleteProviderLocation.type, deleteProviderLocationSaga);
  yield takeLatest(setMainLocationRequest.type, setMainLocationRequestSaga);
}
