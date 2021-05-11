import { RootState } from '../../store';
import { ProviderReviewsState } from './providerReviewsSlice';

const providerReviewsStateSelector = (state: RootState): ProviderReviewsState =>
  state.providerReviews;

export { providerReviewsStateSelector };
