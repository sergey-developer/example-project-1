import React from 'react';
import { useSelector } from 'react-redux';

import { useAuth } from 'features/auth/hooks';
import { ReviewsSortOrderUnion } from 'shared/types/generate';
import { userPersonalInfoAvatarSelector } from 'state/ducks/userPersonalInfo';
import {
  deleteUserReview,
  editUserReview,
  getUserReviews,
  userReviewsStateSelector
} from 'state/ducks/userReviews';
import { useAppDispatch } from 'state/store';

import { GetAllUserReviewsFilter } from '../../services';
import ReviewsPage from './ReviewsPage';

const ReviewsPageContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAuth();

  const userAvatarUrl = useSelector(userPersonalInfoAvatarSelector);
  const reviewsState = useSelector(userReviewsStateSelector);

  const [filter, setFilter] = React.useState<GetAllUserReviewsFilter>({
    Order: 0,
    Count: 10
  });

  React.useEffect(() => {
    const userId = auth.user?.profile.sub;
    if (userId) {
      dispatch(getUserReviews(filter));
    }
  }, [filter]);

  const handleDelete = (reviewId: string) => {
    dispatch(deleteUserReview(reviewId));
  };

  const handleEdit = (reviewId: string, comment: string) => {
    dispatch(editUserReview({ reviewId, updates: { comment } }));
  };

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
      userAvatarUrl={userAvatarUrl || ''}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onSearch={handleSearch}
      onSort={handleSort}
    />
  );
};

export default ReviewsPageContainer;
