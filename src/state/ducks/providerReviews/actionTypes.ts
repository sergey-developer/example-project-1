import { PayloadAction } from '@reduxjs/toolkit';

import { GetAllProviderReviewsFilter } from 'features/provider/services/ProviderReviewsApi';
import {
  CreateReplyRequestDto,
  ProviderReviewsResponseDto
} from 'shared/types/generate';

export type GetAllProviderReviewsAction = PayloadAction<{
  providerId: string;
  filter?: GetAllProviderReviewsFilter;
}>;
export type GetProviderReviewsSuccessAction = PayloadAction<
  ProviderReviewsResponseDto['reviews']
>;

type CreateProviderReplyPayload = {
  reviewId: string;
  reply: CreateReplyRequestDto;
};
export type CreateProviderReplyAction = PayloadAction<CreateProviderReplyPayload>;
export type CreateProviderReplySuccessAction = PayloadAction<CreateProviderReplyPayload>;

export type DeleteProviderReplyAction = PayloadAction<string>;
export type DeleteProviderReplySuccessAction = PayloadAction<string>;

type EditProviderReplyPayload = {
  reviewId: string;
  updates: Pick<CreateReplyRequestDto, 'comment'>;
};
export type EditProviderReplyAction = PayloadAction<EditProviderReplyPayload>;
export type EditProviderReplySuccessAction = PayloadAction<EditProviderReplyPayload>;
