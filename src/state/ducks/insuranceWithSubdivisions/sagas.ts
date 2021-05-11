import { call, put, takeLatest } from 'redux-saga/effects';

import { DirectoryApi } from 'shared/services';
import { InsuranceWithSubdivisionDto } from 'shared/types/dto/InsuranceWithSubdivisionDto';

import { GetInsurancesByCategoryIdRequestAction } from './actionTypes';
import {
  getInsurancesByCategoryIdRequest,
  getInsurancesError,
  getInsurancesSuccess
} from './insuranceWithSubdivisionsSlice';

function* getInsurancesByCategoryIdSaga({
  payload
}: GetInsurancesByCategoryIdRequestAction) {
  const { categoryId } = payload;

  try {
    const insurances: InsuranceWithSubdivisionDto[] = yield call(
      DirectoryApi.getInsurancesWithSubdivisionsByCategoryId,
      categoryId
    );

    yield put(
      getInsurancesSuccess({
        insurances
      })
    );
  } catch (error) {
    yield put(
      getInsurancesError({
        message: error.message
      })
    );
  }
}

export function* insurancesWithSubdivisionsRootSaga() {
  yield takeLatest(
    getInsurancesByCategoryIdRequest.type,
    getInsurancesByCategoryIdSaga
  );
}
