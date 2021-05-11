import { createSlice } from '@reduxjs/toolkit';

import { ErrorAction, LoadingAction, LoadingStatus, Nullable } from 'shared/types';
import { ProviderReviewsResponseDto } from 'shared/types/generate';

import {
  CreateProviderReplyAction,
  CreateProviderReplySuccessAction,
  DeleteProviderReplyAction,
  DeleteProviderReplySuccessAction,
  EditProviderReplyAction,
  EditProviderReplySuccessAction,
  GetAllProviderReviewsAction,
  GetProviderReviewsSuccessAction
} from './actionTypes';

export type ProviderReviewsState = {
  data: Nullable<ProviderReviewsResponseDto['reviews']>;
  loading: LoadingStatus;
  error: Nullable<string>;
};

const initialState = {
  data: null,
  loading: 'idle',
  error: null
} as ProviderReviewsState;

const providerReviewsSlice = createSlice({
  name: 'providerReviews',
  initialState,
  reducers: {
    getProviderReviews(state, action: GetAllProviderReviewsAction) {},
    getProviderReviewsLoading(state, action: LoadingAction) {
      state.loading = action.payload;
    },
    getProviderReviewsSuccess(state, action: GetProviderReviewsSuccessAction) {
      state.data = action.payload;
      state.loading = 'finished';
      state.error = null;
    },
    getProviderReviewsError(state, action: ErrorAction) {
      state.data = null;
      state.loading = 'finished';
      state.error = action.payload;
    },

    createProviderReply(state, action: CreateProviderReplyAction) {},
    createProviderReplyLoading(state, action: LoadingAction) {
      state.loading = action.payload;
    },
    createProviderReplySuccess(
      state,
      { payload }: CreateProviderReplySuccessAction
    ) {
      if (state.data) {
        state.data = state.data.map(review => {
          if (review.id === payload.reviewId) {
            review.reply = payload.reply;
          }

          return review;
        });
      }
      state.loading = 'finished';
      state.error = null;
    },
    createProviderReplyError(state, action: ErrorAction) {
      state.loading = 'finished';
      state.error = action.payload;
    },

    deleteProviderReply(state, action: DeleteProviderReplyAction) {},
    deleteProviderReplyLoading(state, action: LoadingAction) {
      state.loading = action.payload;
    },
    deleteProviderReplySuccess(state, action: DeleteProviderReplySuccessAction) {
      if (state.data) {
        state.data = state.data.filter(review => review.id !== action.payload);
      }
      state.loading = 'finished';
      state.error = null;
    },
    deleteProviderReplyError(state, action: ErrorAction) {
      state.loading = 'finished';
      state.error = action.payload;
    },

    editProviderReply(state, action: EditProviderReplyAction) {},
    editProviderReplyLoading(state, action: LoadingAction) {
      state.loading = action.payload;
    },
    editProviderReplySuccess(state, { payload }: EditProviderReplySuccessAction) {
      if (state.data) {
        state.data = state.data.map(review => {
          if (review.id === payload.reviewId) {
            review.reply = { ...review.reply, ...payload.updates };
          }

          return review;
        });
      }
      state.loading = 'finished';
      state.error = null;
    },
    editProviderReplyError(state, action: ErrorAction) {
      state.loading = 'finished';
      state.error = action.payload;
    }
  }
});

export const name = providerReviewsSlice.name;

export const {
  getProviderReviews,
  getProviderReviewsLoading,
  getProviderReviewsSuccess,
  getProviderReviewsError,
  deleteProviderReply,
  deleteProviderReplyLoading,
  deleteProviderReplySuccess,
  deleteProviderReplyError,
  editProviderReply,
  editProviderReplyLoading,
  editProviderReplySuccess,
  editProviderReplyError,
  createProviderReply,
  createProviderReplyLoading,
  createProviderReplySuccess,
  createProviderReplyError
} = providerReviewsSlice.actions;

export default providerReviewsSlice.reducer;
