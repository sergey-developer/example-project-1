import styled, { css } from 'styled-components/macro';

import { Rating } from 'components/Rating';
import { RatingDetails } from 'components/RatingDetails';
import { Review } from 'components/Reviews/ReviewList/Review';
import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  ${mediaQueries.greaterThan('lg')`
    align-items: center;
    flex-direction: row-reverse;
  `}
`;

export const RatingValueW = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
  ${mediaQueries.greaterThan('lg')`
  padding: 0 3.5rem;
`}
`;

export const RatingValue = styled(Typography).attrs({
  variant: 'h1Two'
})`
  text-align: center;
  margin-bottom: 1.6rem;
`;

export const RatingStars = styled(Rating)`
  display: inline-block;
  margin-bottom: 0.4rem;
`;

export const ReviewsCount = styled(Typography).attrs({
  tag: 'span',
  variant: 'caption',
  color: 'grayChateau'
})`
  line-height: 1.4rem;
`;

export const RatingDetailsStyled = styled(RatingDetails)`
  ${mediaQueries.greaterThan('lg')`
  margin-right: 13%;
`}
`;

export const ReviewContainer = styled.div`
  ${({ theme }) => css`
    padding: 1.2rem;
    border: 0.1rem solid ${theme.colors.wildSand};
    border-radius: 1.2rem;
    margin-bottom: 1.6rem;
  `}
`;

export const ReviewItem = styled(Review)`
  margin-bottom: 0.8rem;
`;

export const Actions = styled.div`
  display: flex;
`;
