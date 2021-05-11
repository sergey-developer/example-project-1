import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { UserReviewsApi } from 'features/user/services';
import {
  ReviewDataResponseDto,
  UserReviewsResponseDto
} from 'shared/types/generate';

import {
  DeleteUserReviewAction,
  EditUserReviewAction,
  GetAllUserReviewsAction
} from './actionTypes';
import {
  deleteUserReview,
  deleteUserReviewError,
  deleteUserReviewLoading,
  deleteUserReviewSuccess,
  editUserReview,
  editUserReviewError,
  editUserReviewLoading,
  editUserReviewSuccess,
  getUserReviews,
  getUserReviewsError,
  getUserReviewsLoading,
  getUserReviewsSuccess
} from './userReviewsSlice';

function* getAllUserReviewsSaga({ payload: filter }: GetAllUserReviewsAction) {
  yield put(getUserReviewsLoading('pending'));
  try {
    const response: UserReviewsResponseDto = yield call(
      UserReviewsApi.getAll,
      filter
    );
    yield put(getUserReviewsSuccess(response.reviews));
  } catch (error) {
    yield put(getUserReviewsError(error.message));
  }
}

function* deleteOneUserReviewSaga({ payload: reviewId }: DeleteUserReviewAction) {
  yield put(deleteUserReviewLoading('pending'));
  try {
    yield call(UserReviewsApi.deleteOne, reviewId);
    yield put(deleteUserReviewSuccess(reviewId));
  } catch (error) {
    yield put(deleteUserReviewError(error.message));
  }
}

function* editOneUserReviewSaga({ payload }: EditUserReviewAction) {
  yield put(editUserReviewLoading('pending'));
  try {
    const updatedReview: ReviewDataResponseDto = yield call(
      UserReviewsApi.updateOne,
      payload.reviewId,
      payload.updates
    );
    yield put(editUserReviewSuccess(updatedReview));
  } catch (error) {
    yield put(editUserReviewError(error.message));
  }
}

export function* userReviewsRootSaga() {
  yield takeLatest(getUserReviews.type, getAllUserReviewsSaga);
  yield takeEvery(deleteUserReview.type, deleteOneUserReviewSaga);
  yield takeLatest(editUserReview.type, editOneUserReviewSaga);
}
