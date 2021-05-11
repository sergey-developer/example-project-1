import { call, put, takeLatest } from 'redux-saga/effects';

import { AuthService } from 'features/auth/services';
import { OidcUserDto, OidcUserModel } from 'features/auth/types';
import { Nullable } from 'shared/types';

import {
  FinishSigninAction,
  SigninAction,
  authError,
  authLoading,
  authSetUser,
  doFinishSignin,
  doSignOut,
  doSignin,
  doStartSignin
} from './authSlice';

function* startSigninSaga({ payload }: SigninAction) {
  try {
    yield call(AuthService.startSignin, payload);
  } catch (error) {
    yield put(authError(error.message));
  }
}

function* signin(signinAction: SigninAction) {
  yield put(authLoading('pending'));
  try {
    const user: Nullable<OidcUserDto> = yield call(AuthService.getUser);
    if (user) {
      yield put(authSetUser(user as Nullable<OidcUserModel>));
    } else {
      yield call(startSigninSaga, signinAction);
    }
  } catch (error) {
    yield put(authError(error.message));
  }
}

function* signOut() {
  yield put(authLoading('pending'));
  try {
    yield call(AuthService.signOut);
    yield put(authSetUser(null));
  } catch (error) {
    yield put(authError(error.message));
  }
}

export function* authRootSaga() {
  yield takeLatest(doSignin.type, signin);
  yield takeLatest(doSignOut.type, signOut);
  yield takeLatest(doStartSignin.type, startSigninSaga);
}

function* finishSigninSaga({ payload }: FinishSigninAction) {
  yield put(authLoading('pending'));
  try {
    const user: Nullable<OidcUserDto> = yield call(AuthService.finishSignin);

    yield put(authSetUser(user as Nullable<OidcUserModel>));

    user?.state?.cameFromUri && payload.history.replace(user.state.cameFromUri);
  } catch (error) {
    yield put(authError(error.message));
  }
}

export function* finishSigninRootSaga() {
  yield takeLatest(doFinishSignin.type, finishSigninSaga);
}
