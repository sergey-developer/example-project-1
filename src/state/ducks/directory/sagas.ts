import { call, put, takeLatest } from 'redux-saga/effects';

import { DirectoryApi } from 'shared/services';
import { CategoryStatusDto } from 'shared/types/dto/CategoryDto';
import {
  LanguageSimpleRecordDto,
  ProvidersCategoryRecordDto
} from 'shared/types/generate';

import {
  getCategoryListRequest,
  getCategoryListSuccess,
  getSimpleLanguagesRequest,
  getSimpleLanguagesSuccess
} from './directorySlice';

function* getSimpleLanguagesRequestSaga() {
  try {
    const simpleLanguages: LanguageSimpleRecordDto[] = yield call(
      DirectoryApi.getSimpleLanguagesList
    );

    yield put(
      getSimpleLanguagesSuccess({
        simpleLanguages
      })
    );
  } catch (error) {}
}

function* getCategoryListRequestSaga() {
  try {
    const categories: ProvidersCategoryRecordDto[] = yield call(
      DirectoryApi.getListCategories,
      CategoryStatusDto.Active
    );

    yield put(
      getCategoryListSuccess({
        categories
      })
    );
  } catch (error) {}
}

export function* directoryRootSaga() {
  yield takeLatest(getSimpleLanguagesRequest.type, getSimpleLanguagesRequestSaga);
  yield takeLatest(getCategoryListRequest.type, getCategoryListRequestSaga);
}
