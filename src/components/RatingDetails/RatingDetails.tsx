import React from 'react';

import {
  RatingItem,
  RatingList,
  RatingValue,
  StarIcon
} from './RatingDetails.styled';

interface RatingDetailsProps {
  className?: string;
}

const RatingDetails: React.FC<RatingDetailsProps> = ({ className }) => {
  const items = Array(5).fill(null);
  return (
    <RatingList className={className}>
      {items.map((_, index) => (
        <RatingItem key={index}>
          <StarIcon />
          <RatingValue $percent={35} />
        </RatingItem>
      ))}
    </RatingList>
  );
};

export default React.memo(RatingDetails);
