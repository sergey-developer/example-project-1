import React from 'react';

import { Review } from '../Review';
import { ReviewItem } from '../ReviewItem';
import { SelectableReview } from '../SelectableReview';
import { ReviewListItem } from '../types';
import { ReviewListContainer } from './ReviewList.styled';

export type ReviewListProps = {
  reviews: ReviewListItem[];
  isSelectable?: boolean;
  onSelect?: (review: ReviewListItem, isSelected: boolean) => void;
  showAllMessage?: (hasInitialHeight: boolean) => string;
  ratingMessage?: (rating: number) => string | null;
  maxWidth?: string;
  className?: string;
};

const ReviewList: React.FC<ReviewListProps> = ({
  reviews = [],
  isSelectable = false,
  onSelect,
  showAllMessage,
  ratingMessage,
  maxWidth,
  className
}) => {
  const handleSelect = (review: ReviewListItem) => (isSelected: boolean) => {
    !!onSelect && onSelect(review, isSelected);
  };

  const renderReviewItem = (review: ReviewListItem): React.ReactElement => (
    <ReviewItem
      key={review.id}
      replies={review.replies}
      showAllMessage={showAllMessage}
      ratingMessage={ratingMessage}
    >
      <Review
        comment={review.comment}
        date={review.date}
        avatarSrc={review.avatarSrc}
        rating={review.rating}
        name={review.name}
        status={review.status}
        statusText={review.statusText}
        actions={review.actions}
        showAllMessage={showAllMessage}
        ratingMessage={ratingMessage}
      />
    </ReviewItem>
  );

  if (!reviews.length) return null;

  return (
    <ReviewListContainer className={className} $maxWidth={maxWidth}>
      {reviews.map((review, index) =>
        isSelectable ? (
          <SelectableReview
            key={review.id || index}
            canSelect
            onSelect={handleSelect(review)}
          >
            {renderReviewItem(review)}
          </SelectableReview>
        ) : (
          renderReviewItem(review)
        )
      )}
    </ReviewListContainer>
  );
};

export default React.memo(ReviewList);
