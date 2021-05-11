import React from 'react';

import { ReactComponent as OutlinedStarIcon } from 'assets/icons/OutlinedStarIcon.svg';
import { ReactComponent as StarIcon } from 'assets/icons/StarIcon.svg';

import { Container, RatingItem } from './Rating.styled';

type RatingProps = {
  value: number;
  className?: string;
};

const starsAmount = 5;
const initialStars = Array(starsAmount).fill(undefined);

const mapStars = (
  Star: React.JSXElementConstructor<{}>,
  index: number
): React.ReactElement => (
  <RatingItem key={index}>
    <Star />
  </RatingItem>
);

const Rating: React.FC<RatingProps> = ({ value = 0, className }) => {
  const filledStars = [...initialStars].fill(StarIcon);
  const emptyStars = filledStars.splice(value).fill(OutlinedStarIcon);

  return (
    <Container className={className}>
      {filledStars.map(mapStars)}

      {emptyStars.map(mapStars)}
    </Container>
  );
};

export default React.memo(Rating);
