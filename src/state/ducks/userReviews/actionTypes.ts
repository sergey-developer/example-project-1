import { PayloadAction } from '@reduxjs/toolkit';

import { GetAllUserReviewsFilter } from 'features/user/services';
import {
  ReviewDataResponseDto,
  UpdateReviewRequestDto,
  UserReviewsResponseDto
} from 'shared/types/generate';

export type GetAllUserReviewsAction = PayloadAction<GetAllUserReviewsFilter>;
export type GetUserReviewsSuccessAction = PayloadAction<
  UserReviewsResponseDto['reviews']
>;

export type DeleteUserReviewAction = PayloadAction<string>;
export type DeleteUserReviewSuccessAction = PayloadAction<string>;

export type EditUserReviewAction = PayloadAction<{
  reviewId: string;
  updates: UpdateReviewRequestDto;
}>;
export type EditUserReviewSuccessAction = PayloadAction<ReviewDataResponseDto>;
