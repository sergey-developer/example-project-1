import { BaseReviewsApi } from 'shared/services';
import {
  GetAllUserReviewsFilter as BaseGetAllProviderReviewsFilter,
  CreateReplyRequestDto,
  ProviderReviewsResponseDto,
  ReplyToReviewResponseDto
} from 'shared/types/generate';

// TODO: import GetAllProviderReviewsFilter instead of GetAllUserReviewsFilter when the type will be added to swagger

export type GetAllProviderReviewsFilter = BaseGetAllProviderReviewsFilter & {
  Search?: string;
};

class ProviderReviewsApi extends BaseReviewsApi {
  private static instance: ProviderReviewsApi;

  public static getInstance(): ProviderReviewsApi {
    if (!ProviderReviewsApi.instance) {
      ProviderReviewsApi.instance = new ProviderReviewsApi();
    }

    return ProviderReviewsApi.instance;
  }

  private constructor() {
    super();
  }

  public getAll = async (
    providerId: string,
    filter?: GetAllProviderReviewsFilter
  ): Promise<ProviderReviewsResponseDto> => {
    const url = this.generatePath(`Provider/${providerId}`, filter);

    try {
      const response = await this.api.get<ProviderReviewsResponseDto>(url);
      return response.data;
    } catch {
      throw new Error(`Could not get provider's reviews`);
    }
  };

  public createReply = async (
    reviewId: string,
    reply: CreateReplyRequestDto
  ): Promise<ReplyToReviewResponseDto> => {
    const url = this.generatePath(`ReplyToReview/${reviewId}`);
    try {
      const response = await this.api.post<ReplyToReviewResponseDto>(url, reply);
      return response.data;
    } catch {
      throw new Error(`Could not send provider's reply`);
    }
  };

  public updateReply = async (
    reviewId: string,
    updates: CreateReplyRequestDto
  ): Promise<ReplyToReviewResponseDto> => {
    try {
      return this.createReply(reviewId, updates);
    } catch (error) {
      throw new Error(`Could not update provider's reply`);
    }
  };
}

export default ProviderReviewsApi.getInstance();
