import { createSlice } from '@reduxjs/toolkit';

import { ErrorAction, LoadingAction, LoadingStatus, Nullable } from 'shared/types';
import { UserReviewsResponseDto } from 'shared/types/generate';

import {
  DeleteUserReviewAction,
  DeleteUserReviewSuccessAction,
  EditUserReviewAction,
  EditUserReviewSuccessAction,
  GetAllUserReviewsAction,
  GetUserReviewsSuccessAction
} from './actionTypes';

export type UserReviewsState = {
  data: Nullable<UserReviewsResponseDto['reviews']>;
  loading: LoadingStatus;
  error: Nullable<string>;
};

const initialState = {
  data: null,
  loading: 'idle',
  error: null
} as UserReviewsState;

const userReviewsSlice = createSlice({
  name: 'userReviews',
  initialState,
  reducers: {
    getUserReviews(state, action: GetAllUserReviewsAction) {},
    getUserReviewsLoading(state, action: LoadingAction) {
      state.loading = action.payload;
    },
    getUserReviewsSuccess(state, action: GetUserReviewsSuccessAction) {
      state.data = action.payload;
      state.loading = 'finished';
      state.error = null;
    },
    getUserReviewsError(state, action: ErrorAction) {
      state.data = null;
      state.loading = 'finished';
      state.error = action.payload;
    },
    deleteUserReview(state, action: DeleteUserReviewAction) {},
    deleteUserReviewLoading(state, action: LoadingAction) {
      state.loading = action.payload;
    },
    deleteUserReviewSuccess(state, action: DeleteUserReviewSuccessAction) {
      if (state.data) {
        state.data = state.data.filter(review => review.id !== action.payload);
      }
      state.loading = 'finished';
      state.error = null;
    },
    deleteUserReviewError(state, action: ErrorAction) {
      state.loading = 'finished';
      state.error = action.payload;
    },
    editUserReview(state, action: EditUserReviewAction) {},
    editUserReviewLoading(state, action: LoadingAction) {
      state.loading = action.payload;
    },
    editUserReviewSuccess(state, { payload }: EditUserReviewSuccessAction) {
      if (state.data && payload.id) {
        state.data = state.data.map(review =>
          review.id === payload.id ? payload : review
        );
      }
      state.loading = 'finished';
      state.error = null;
    },
    editUserReviewError(state, action: ErrorAction) {
      state.loading = 'finished';
      state.error = action.payload;
    }
  }
});

export const name = userReviewsSlice.name;

export const {
  getUserReviews,
  getUserReviewsLoading,
  getUserReviewsSuccess,
  getUserReviewsError,
  deleteUserReview,
  deleteUserReviewLoading,
  deleteUserReviewSuccess,
  deleteUserReviewError,
  editUserReview,
  editUserReviewLoading,
  editUserReviewSuccess,
  editUserReviewError
} = userReviewsSlice.actions;

export default userReviewsSlice.reducer;
