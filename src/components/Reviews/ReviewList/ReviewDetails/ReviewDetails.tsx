import React from 'react';

import { AvatarImage } from 'components/Avatar';

import { Rating } from '../../../Rating';
import { Typography } from '../../../Typography';
import { ReviewProps } from '../Review/Review';
import {
  Container,
  DelimiterDot,
  Details,
  DetailsMeta,
  Name,
  ReviewStatus
} from './ReviewDetails.styled';

type ReviewDetailsProps = Pick<
  ReviewProps,
  'name' | 'rating' | 'date' | 'avatarSrc' | 'status' | 'statusText'
>;

const ReviewDetails: React.FC<ReviewDetailsProps> = ({
  name,
  rating,
  date,
  avatarSrc,
  status,
  statusText
}) => {
  const shouldDisplayRating = typeof rating === 'number';

  return (
    <Container>
      {avatarSrc && <AvatarImage src={avatarSrc} />}

      <Details>
        {status && statusText ? (
          <ReviewStatus status={status}>{statusText}</ReviewStatus>
        ) : null}

        <Name>{name}</Name>

        {shouldDisplayRating || date ? (
          <DetailsMeta>
            {shouldDisplayRating && <Rating value={rating as number} />}

            <DelimiterDot />

            {date && (
              <Typography tag='span' variant='caption' color='grayChateau'>
                {date}
              </Typography>
            )}
          </DetailsMeta>
        ) : null}
      </Details>
    </Container>
  );
};

export default React.memo(ReviewDetails);
