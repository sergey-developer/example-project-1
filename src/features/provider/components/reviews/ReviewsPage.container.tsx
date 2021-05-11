import React from 'react';
import { useSelector } from 'react-redux';

import { CreateReplyRequestDto, ReviewsSortOrderUnion } from 'shared/types/generate';
import { providerEditProfileDataSelector } from 'state/ducks/providerEditProfile';
import {
  createProviderReply,
  editProviderReply,
  getProviderReviews,
  providerReviewsStateSelector
} from 'state/ducks/providerReviews';
import { useAppDispatch } from 'state/store';

import { GetAllProviderReviewsFilter } from '../../services/ProviderReviewsApi';
import ReviewsPage from './ReviewsPage';

const ReviewsPageContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const providerProfile = useSelector(providerEditProfileDataSelector);
  const reviewsState = useSelector(providerReviewsStateSelector);

  const providerId = providerProfile.providerId;

  const [filter, setFilter] = React.useState<GetAllProviderReviewsFilter>({
    Order: 0,
    Count: 10
  });

  React.useEffect(() => {
    if (providerId) {
      dispatch(getProviderReviews({ providerId, filter }));
    }
  }, [filter, providerId]);

  const handleCreateReply = (reviewId: string, reply: CreateReplyRequestDto) => {
    dispatch(createProviderReply({ reviewId, reply }));
  };

  const handleEditReply = (reviewId: string, comment: string) => {
    dispatch(editProviderReply({ reviewId, updates: { comment } }));
  };

  const handleDeleteReply = () => {};

  const handleSearch = (value: string) => {
    setFilter(prevFilter => {
      const { Search, ...filterWithoutSearch } = prevFilter;

      if (value.length) {
        const filterWithSearch = { ...filterWithoutSearch, Search: value.trim() };
        return filterWithSearch;
      } else {
        return filterWithoutSearch;
      }
    });
  };

  const handleSort = (value: ReviewsSortOrderUnion) => {
    setFilter(prevFilter => ({ ...prevFilter, Order: value }));
  };

  return (
    <ReviewsPage
      filter={filter}
      reviews={reviewsState.data}
      loading={reviewsState.loading}
      error={reviewsState.error}
      onCreateReply={handleCreateReply}
      onEditReply={handleEditReply}
      onDeleteReply={handleDeleteReply}
      onSearch={handleSearch}
      onSort={handleSort}
    />
  );
};

export default ReviewsPageContainer;
