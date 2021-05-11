import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { ProviderReviewsApi } from 'features/provider/services';
import { ProviderReviewsResponseDto } from 'shared/types/generate';

import {
  CreateProviderReplyAction,
  DeleteProviderReplyAction,
  EditProviderReplyAction,
  GetAllProviderReviewsAction
} from './actionTypes';
import {
  createProviderReply,
  createProviderReplyError,
  createProviderReplyLoading,
  createProviderReplySuccess,
  deleteProviderReply,
  deleteProviderReplyError,
  deleteProviderReplyLoading,
  deleteProviderReplySuccess,
  editProviderReply,
  editProviderReplyError,
  editProviderReplyLoading,
  editProviderReplySuccess,
  getProviderReviews,
  getProviderReviewsError,
  getProviderReviewsLoading,
  getProviderReviewsSuccess
} from './providerReviewsSlice';

function* getAllProviderReviewsSaga({ payload }: GetAllProviderReviewsAction) {
  yield put(getProviderReviewsLoading('pending'));
  try {
    const response: ProviderReviewsResponseDto = yield call(
      ProviderReviewsApi.getAll,
      payload.providerId,
      payload.filter
    );
    yield put(getProviderReviewsSuccess(response.reviews));
  } catch (error) {
    yield put(getProviderReviewsError(error.message));
  }
}

function* deleteOneProviderReplySaga({
  payload: reviewId
}: DeleteProviderReplyAction) {
  yield put(deleteProviderReplyLoading('pending'));
  try {
    // yield call(ProviderReviewsApi.deleteOne, reviewId);
    yield put(deleteProviderReplySuccess(reviewId));
  } catch (error) {
    yield put(deleteProviderReplyError(error.message));
  }
}

function* editProviderReplySaga({ payload }: EditProviderReplyAction) {
  yield put(editProviderReplyLoading('pending'));
  try {
    yield call(ProviderReviewsApi.updateReply, payload.reviewId, payload.updates);
    yield put(editProviderReplySuccess(payload));
  } catch (error) {
    yield put(editProviderReplyError(error.message));
  }
}

function* createProviderReplySaga({ payload }: CreateProviderReplyAction) {
  yield put(createProviderReplyLoading('pending'));
  try {
    yield call(ProviderReviewsApi.createReply, payload.reviewId, payload.reply);
    yield put(createProviderReplySuccess(payload));
  } catch (error) {
    yield put(createProviderReplyError(error.message));
  }
}

export function* providerReviewsRootSaga() {
  yield takeLatest(getProviderReviews.type, getAllProviderReviewsSaga);
  yield takeLatest(createProviderReply.type, createProviderReplySaga);
  yield takeEvery(deleteProviderReply.type, deleteOneProviderReplySaga);
  yield takeLatest(editProviderReply.type, editProviderReplySaga);
}
