import { call, put, takeLatest } from 'redux-saga/effects';

import { ProviderApi } from 'features/provider/services';
import { ProviderDto } from 'features/provider/types';

import {
  GetProviderListByUserIdAction,
  doGetProviderList,
  getProviderListError,
  getProviderListSuccess,
  providerListLoading
} from './providerListSlice';

function* getProviderListByUserIdSaga({ payload }: GetProviderListByUserIdAction) {
  yield put(providerListLoading('pending'));
  try {
    const providerList: ProviderDto[] = yield call(
      ProviderApi.getListByUserId,
      payload
    );
    yield put(getProviderListSuccess(providerList));
  } catch (error) {
    yield put(getProviderListError(error.message));
  }
}

export function* getProviderListByUserIdRootSaga() {
  yield takeLatest(doGetProviderList.type, getProviderListByUserIdSaga);
}
