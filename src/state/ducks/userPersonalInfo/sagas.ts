import { call, debounce, put, select, takeLatest } from 'redux-saga/effects';

import { UsersApi } from 'features/user/services';
import {
  EditUserPersonalInfoModel,
  UserPersonalInfoDto,
  UserPersonalInfoModel
} from 'features/user/types';
import { FilesApi, FilesService } from 'shared/services';

import { userPersonalInfoDataSelector } from './selectors';
import {
  DeleteAvatarAction,
  UploadAvatarAction,
  UserPersonalInfoState,
  avatarHandledError,
  avatarHandledSuccess,
  avatarLoading,
  deleteAvatar,
  doGetUserPersonalInfo,
  editUserPersonalInfo,
  editUserPersonalInfoError,
  editUserPersonalInfoLoading,
  editUserPersonalInfoSuccess,
  getPersonalInfoError,
  getPersonalInfoLoading,
  getPersonalInfoSuccess,
  uploadAvatar
} from './userPersonalInfoSlice';

function* getUserPersonalInfoSaga() {
  yield put(getPersonalInfoLoading('pending'));
  try {
    const personalInfo: UserPersonalInfoDto = yield call(UsersApi.getSelfData);
    yield put(getPersonalInfoSuccess(personalInfo as UserPersonalInfoModel));
  } catch (error) {
    yield put(getPersonalInfoError(error.message));
  }
}

function* editUserPersonalInfoSaga() {
  yield put(editUserPersonalInfoLoading('pending'));

  const personalInfo: UserPersonalInfoState['data'] = yield select(
    userPersonalInfoDataSelector
  );

  try {
    yield call(UsersApi.updateSelfData, personalInfo as EditUserPersonalInfoModel);
    yield put(editUserPersonalInfoSuccess());
  } catch (error) {
    yield put(editUserPersonalInfoError(error));
  }
}

function* uploadAvatarSaga({ payload: file }: UploadAvatarAction) {
  yield put(avatarLoading('pending'));
  try {
    const src: string = yield call(FilesApi.uploadOne, file);
    yield put(avatarHandledSuccess());
    yield put(editUserPersonalInfo({ avatarUrl: src }));
  } catch (error) {
    yield put(avatarHandledError(error.message));
  }
}

function* deleteAvatarSaga({ payload: avatarUrl }: DeleteAvatarAction) {
  yield put(avatarLoading('pending'));
  try {
    const filePath: string = FilesService.extractFilePath(avatarUrl);
    yield call(FilesApi.deleteOne, filePath);
    yield put(avatarHandledSuccess());
    yield put(editUserPersonalInfo({ avatarUrl: null }));
  } catch (error) {
    yield put(avatarHandledError(error.message));
  }
}

export function* userPersonalInfoRootSaga() {
  yield takeLatest(doGetUserPersonalInfo.type, getUserPersonalInfoSaga);
  yield debounce(1000, editUserPersonalInfo.type, editUserPersonalInfoSaga);
  yield takeLatest(uploadAvatar.type, uploadAvatarSaga);
  yield takeLatest(deleteAvatar.type, deleteAvatarSaga);
}
