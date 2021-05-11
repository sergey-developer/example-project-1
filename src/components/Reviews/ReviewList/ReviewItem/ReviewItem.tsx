import React from 'react';

import { ReviewProps } from '../Review/Review';
import { Container, RepliesContainer, Reply } from './ReviewItem.styled';

type ReviewItemProps = {
  replies: Pick<
    ReviewProps,
    'comment' | 'name' | 'date' | 'actions' | 'avatarSrc'
  >[];
  showAllMessage: ReviewProps['showAllMessage'];
  ratingMessage: ReviewProps['ratingMessage'];
  children: React.ReactElement;
};

const ReviewItem: React.FC<ReviewItemProps> = ({
  replies = [],
  showAllMessage,
  ratingMessage,
  children
}) => {
  return (
    <Container>
      {children}

      {!!replies.length && (
        <RepliesContainer>
          {replies.map((reply, index) => (
            <Reply
              key={index}
              {...reply}
              kind='reply'
              showAllMessage={showAllMessage}
              ratingMessage={ratingMessage}
            />
          ))}
        </RepliesContainer>
      )}
    </Container>
  );
};

export default React.memo(ReviewItem);
