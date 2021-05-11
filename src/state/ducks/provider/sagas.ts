import { call, put, takeLatest } from 'redux-saga/effects';

import { ProviderApi } from 'features/provider/services';
import { ProviderDto } from 'features/provider/types';

import {
  GetProviderByIdAction,
  doGetProvider,
  getProviderError,
  getProviderSuccess,
  providerLoading
} from './providerSlice';

function* getProviderById({ payload }: GetProviderByIdAction) {
  yield put(providerLoading('pending'));
  try {
    const provider: ProviderDto = yield call(ProviderApi.getOneById, payload);
    yield put(getProviderSuccess(provider));
  } catch (error) {
    yield put(getProviderError(error.message));
  }
}

export function* getProviderByIdSaga() {
  yield takeLatest(doGetProvider.type, getProviderById);
}
