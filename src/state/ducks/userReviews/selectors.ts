import { RootState } from '../../store';
import { UserReviewsState } from './userReviewsSlice';

const userReviewsStateSelector = (state: RootState): UserReviewsState =>
  state.userReviews;

export { userReviewsStateSelector };
