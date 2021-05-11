import { call, put, takeLatest } from 'redux-saga/effects';

import { DirectoryApi } from 'shared/services';
import { SpecialtyWithTaxonomyRecordDto } from 'shared/types/dto/SpecialtyWithTaxonomyRecordDto';

import { GetSpecialtiesByIdsAction } from './actionTypes';
import {
  getSpecialtiesByCategoryIdRequest,
  getSpecialtiesError,
  getSpecialtiesSuccess
} from './specialtiesWithTaxonomySlice';

function* getSpecialtiesByIdsSaga({ payload }: GetSpecialtiesByIdsAction) {
  const { categoryId } = payload;

  try {
    const specialties: SpecialtyWithTaxonomyRecordDto[] = yield call(
      DirectoryApi.getSpecialtiesWithTaxonomyRecord,
      categoryId
    );

    yield put(
      getSpecialtiesSuccess({
        specialties
      })
    );
  } catch (error) {
    yield put(getSpecialtiesError({ error: error.message }));
  }
}

export function* specialtiesWithTaxonomyRootSaga() {
  yield takeLatest(getSpecialtiesByCategoryIdRequest.type, getSpecialtiesByIdsSaga);
}
