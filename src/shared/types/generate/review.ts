/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ExampleProjectReviewsCommonCommandAddReviewRequestBody {
  /** @format int32 */
  score?: number;
  comment?: string | null;
  reviewer?: string | null;
  photos?: string[] | null;
}

export interface ExampleProjectReviewsCommonCommandApproveReviewRequestBody {
  reviewIds?: string[] | null;
  comment?: string | null;
}

export interface ExampleProjectReviewsCommonCommandDeclineReviewRequestBody {
  reviewIds?: string[] | null;
  comment?: string | null;
}

export interface ExampleProjectReviewsCommonCommandReplyRequestBody {
  replier?: string | null;
  comment?: string | null;
}

export interface ExampleProjectReviewsCommonCommandUpdateReviewRequestBody {
  /** @format int32 */
  score?: number;
  comment?: string | null;
  reviewer?: string | null;
  photos?: string[] | null;
}

/**
 * 0 = Newest, 1 = Oldest, 2 = WithReply, 3 = WithoutReply, 4 = HighestRating, 5 = LowestRating
 * @format int32
 */
export type ExampleProjectReviewsCommonCommonReviewOrderEnum = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * 0 = Pended, 1 = Approved, 2 = Declined, 3 = Removed
 * @format int32
 */
export type ExampleProjectReviewsCommonCommonReviewStatus = 0 | 1 | 2 | 3;

export interface ExampleProjectReviewsCommonResponseAddReviewCommandResponse {
  reviewId?: string | null;

  /** 0 = Pended, 1 = Approved, 2 = Declined, 3 = Removed */
  status?: ExampleProjectReviewsCommonCommonReviewStatus;
}

export interface ExampleProjectReviewsCommonResponseApprovedReviewResponse {
  reviewId?: string | null;

  /** 0 = Pended, 1 = Approved, 2 = Declined, 3 = Removed */
  status?: ExampleProjectReviewsCommonCommonReviewStatus;
}

export interface ExampleProjectReviewsCommonResponseApproveReviewResponse {
  reviewId?: string | null;

  /** 0 = Pended, 1 = Approved, 2 = Declined, 3 = Removed */
  status?: ExampleProjectReviewsCommonCommonReviewStatus;
}

export interface ExampleProjectReviewsCommonResponseApproveReviewsResponse {
  approvedReviews?: ExampleProjectReviewsCommonResponseApprovedReviewResponse[] | null;
}

export interface ExampleProjectReviewsCommonResponseDeclinedReviewResponse {
  reviewId?: string | null;

  /** 0 = Pended, 1 = Approved, 2 = Declined, 3 = Removed */
  status?: ExampleProjectReviewsCommonCommonReviewStatus;
}

export interface ExampleProjectReviewsCommonResponseDeclineReviewResponse {
  reviewId?: string | null;

  /** 0 = Pended, 1 = Approved, 2 = Declined, 3 = Removed */
  status?: ExampleProjectReviewsCommonCommonReviewStatus;
}

export interface ExampleProjectReviewsCommonResponseDeclineReviewsResponse {
  declinedReviews?: ExampleProjectReviewsCommonResponseDeclinedReviewResponse[] | null;
}

export interface ExampleProjectReviewsCommonResponseDeleteReviewResponse {
  /** 0 = Pended, 1 = Approved, 2 = Declined, 3 = Removed */
  status?: ExampleProjectReviewsCommonCommonReviewStatus;
}

export interface ExampleProjectReviewsCommonResponseFindReviewResponse {
  /** @format int64 */
  total?: number;
  items?: ExampleProjectReviewsCommonResponseReviewDetailResponse[] | null;
}

export interface ExampleProjectReviewsCommonResponseModerateResponse {
  /** @format date-time */
  date?: string;
  userId?: string | null;
  message?: string | null;
}

export interface ExampleProjectReviewsCommonResponseMyReviewsResponse {
  /** @format int64 */
  totalCountOfReviews?: number;
  reviews?: ExampleProjectReviewsCommonResponseReviewDetailResponse[] | null;
}

export interface ExampleProjectReviewsCommonResponseProviderReviewsResponse {
  /** @format double */
  overallScore?: number;

  /** @format int64 */
  totalNumberOfReviews?: number;
  reviewsCountByScore?:
    | ExampleProjectReviewsCommonResponseReviewCountByScoreResponse[]
    | null;
  reviews?: ExampleProjectReviewsCommonResponseReviewDataResponse[] | null;
}

export interface ExampleProjectReviewsCommonResponseProviderScoreResponse {
  /** @format double */
  averageScore?: number;

  /** @format int64 */
  reviewCount?: number;
}

export interface ExampleProjectReviewsCommonResponseReplyResponse {
  comment?: string | null;
  replier?: string | null;

  /** @format date-time */
  date?: string;
  userId?: string | null;
}

export interface ExampleProjectReviewsCommonResponseReplyToReviewResponse {
  reviewId?: string | null;

  /** 0 = Pended, 1 = Approved, 2 = Declined, 3 = Removed */
  status?: ExampleProjectReviewsCommonCommonReviewStatus;
}

export interface ExampleProjectReviewsCommonResponseReviewCountByScoreResponse {
  /** @format double */
  score?: number;

  /** @format int32 */
  numberOfReviews?: number;
}

export interface ExampleProjectReviewsCommonResponseReviewDataResponse {
  id?: string | null;

  /** @format date-time */
  date?: string;

  /** @format double */
  score?: number;
  reviewer?: string | null;
  comment?: string | null;
  photos?: string[] | null;
  reply?: ExampleProjectReviewsCommonResponseReplyResponse;
}

export interface ExampleProjectReviewsCommonResponseReviewDetailResponse {
  id?: string | null;
  providerId?: string | null;
  unitId?: string | null;
  userId?: string | null;
  reviewer?: string | null;

  /** @format double */
  score?: number;
  comment?: string | null;
  photos?: string[] | null;

  /** @format date-time */
  date?: string;

  /** 0 = Pended, 1 = Approved, 2 = Declined, 3 = Removed */
  status?: ExampleProjectReviewsCommonCommonReviewStatus;
  reply?: ExampleProjectReviewsCommonResponseReplyResponse;
  moderate?: ExampleProjectReviewsCommonResponseModerateResponse;
}

export interface ReviewsGetReviewsForPendedApprovedStatusParams {
  /** @format int32 */
  Skip?: number;

  /** @format int32 */
  Count?: number;
  providerId: string;
  unitId: string;
}

export interface ReviewsGetReviewsBetweenSpecifiedDatesParams {
  FromDate?: string;
  ToDate?: string;
  SearchString?: string;

  /** 0 = Pended, 1 = Approved, 2 = Declined, 3 = Removed */
  Status?: ExampleProjectReviewsCommonCommonReviewStatus;

  /** @format int32 */
  Skip?: number;

  /** @format int32 */
  Count?: number;
}

export interface ReviewsApproveReviewParams {
  Comment?: string;
  reviewId: string;
}

export interface ReviewsDeclineReviewParams {
  Comment?: string;
  reviewId: string;
}

export interface ReviewsGetReviewsByUserParams {
  /** 0 = Newest, 1 = Oldest, 2 = WithReply, 3 = WithoutReply, 4 = HighestRating, 5 = LowestRating */
  Order?: ExampleProjectReviewsCommonCommonReviewOrderEnum;
  IncludeDeleted?: boolean;

  /** @format int32 */
  Skip?: number;

  /** @format int32 */
  Count?: number;
}
