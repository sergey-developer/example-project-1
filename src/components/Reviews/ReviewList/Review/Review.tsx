import React from 'react';

import { Typography } from '../../../Typography';
import { ReviewDetails } from '../ReviewDetails';
import { ReviewListProps } from '../ReviewList/ReviewList';
import { ReviewListItem } from '../types';
import {
  ActionsContainer,
  Header,
  HeaderRightSide,
  InnerContainer,
  OuterContainer,
  RatingMessage,
  ReviewComment,
  ShowAll,
  Wrapper
} from './Review.styled';

type ReviewKindUnion = 'review' | 'reply';

export type ReviewProps = Pick<ReviewListProps, 'ratingMessage' | 'showAllMessage'> &
  Pick<
    ReviewListItem,
    | 'comment'
    | 'name'
    | 'avatarSrc'
    | 'date'
    | 'rating'
    | 'status'
    | 'statusText'
    | 'actions'
  > & {
    kind?: ReviewKindUnion;
    maxHeight?: number;
    className?: string;
  };

const Review: React.FC<ReviewProps> = ({
  kind = 'review',
  comment,
  name,
  rating,
  ratingMessage,
  date,
  avatarSrc,
  status,
  statusText,
  actions = [],
  maxHeight: initialMaxHeight = 180,
  showAllMessage,
  className
}) => {
  const innerContainerRef = React.useRef<HTMLDivElement>(null);
  const [hasInitialHeight, setHasInitialHeight] = React.useState(false);
  const [maxHeight, setMaxHeight] = React.useState(initialMaxHeight);

  const hasActions = !!actions?.length;
  const isReplyKind = kind === 'reply';

  let theRatingMessage: string | null = null;
  const shouldDisplayRatingMessage = !!ratingMessage && typeof rating === 'number';
  if (shouldDisplayRatingMessage) {
    theRatingMessage = ratingMessage!(rating as number);
  }
  const hasRatingMessage = !!theRatingMessage;

  const shouldDisplayShowAll =
    !!innerContainerRef.current &&
    innerContainerRef.current.clientHeight > initialMaxHeight &&
    !!showAllMessage;

  const toggleMaxHeight = () => {
    if (innerContainerRef.current) {
      const innerContainerHeight = innerContainerRef.current.clientHeight;

      if (innerContainerHeight > maxHeight) {
        setHasInitialHeight(false);
        setMaxHeight(innerContainerHeight);
      } else if (innerContainerHeight === maxHeight) {
        setMaxHeight(initialMaxHeight);
        setHasInitialHeight(true);
      }
    }
  };

  React.useEffect(() => {
    toggleMaxHeight();
  }, [innerContainerRef.current]);

  return (
    <Wrapper className={className} kind={kind}>
      <OuterContainer $maxHeight={shouldDisplayShowAll ? maxHeight : undefined}>
        <InnerContainer ref={innerContainerRef}>
          <Header>
            {isReplyKind ? (
              <ReviewDetails name={name} />
            ) : (
              <ReviewDetails
                name={name}
                rating={rating}
                date={date}
                avatarSrc={avatarSrc}
                status={status}
                statusText={statusText}
              />
            )}

            {hasRatingMessage || hasActions || isReplyKind ? (
              <HeaderRightSide>
                {hasRatingMessage && (
                  <RatingMessage>{theRatingMessage}</RatingMessage>
                )}

                {isReplyKind && (
                  <Typography tag='span' variant='subTitleTwo' color='grayChateau'>
                    {date}
                  </Typography>
                )}

                {hasActions && (
                  <ActionsContainer>
                    {React.Children.map(actions, action => action)}
                  </ActionsContainer>
                )}
              </HeaderRightSide>
            ) : null}
          </Header>

          <ReviewComment>{comment}</ReviewComment>
        </InnerContainer>
      </OuterContainer>

      {shouldDisplayShowAll && (
        <ShowAll onClick={toggleMaxHeight}>
          {showAllMessage!(hasInitialHeight)}
        </ShowAll>
      )}
    </Wrapper>
  );
};

export default React.memo(Review);
