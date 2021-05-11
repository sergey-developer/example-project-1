import { BaseReviewsApi } from 'shared/services';
import {
  GetAllUserReviewsFilter as BaseGetAllUserReviewsFilter,
  ReviewDataResponseDto,
  UpdateReviewRequestDto,
  UserReviewsResponseDto
} from 'shared/types/generate';

export type GetAllUserReviewsFilter = BaseGetAllUserReviewsFilter & {
  Search?: string;
};

class UserReviewsApi extends BaseReviewsApi {
  private static instance: UserReviewsApi;

  public static getInstance(): UserReviewsApi {
    if (!UserReviewsApi.instance) {
      UserReviewsApi.instance = new UserReviewsApi();
    }

    return UserReviewsApi.instance;
  }

  private constructor() {
    super();
  }

  public getAll = async (
    filter: GetAllUserReviewsFilter = {}
  ): Promise<UserReviewsResponseDto> => {
    const theFilter: GetAllUserReviewsFilter = {
      IncludeDeleted: false,
      ...filter
    };

    const url = this.generatePath('MyReviews', theFilter);

    try {
      const response = await this.api.get<UserReviewsResponseDto>(url);
      return response.data;
    } catch {
      throw new Error(`Could not get user's reviews`);
    }
  };

  public deleteOne = async (reviewId: string): Promise<boolean> => {
    try {
      const url = this.generatePath(`Review/${reviewId}`);
      const response = await this.api.delete(url);
      return !!response.data;
    } catch {
      throw new Error(`Could not delete user's review by review id: ${reviewId}`);
    }
  };

  public updateOne = async (
    reviewId: string,
    updates: UpdateReviewRequestDto
  ): Promise<ReviewDataResponseDto> => {
    try {
      const url = this.generatePath(`Review/${reviewId}`);
      const response = await this.api.patch<ReviewDataResponseDto>(url, updates);
      return response.data;
    } catch {
      throw new Error(`Could not update user's review by review id: ${reviewId}`);
    }
  };
}

export default UserReviewsApi.getInstance();
