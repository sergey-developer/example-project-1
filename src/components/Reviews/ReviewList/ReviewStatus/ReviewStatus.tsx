import React from 'react';

import { Typography } from 'components/Typography';

import { ReviewListItemStatusUnion } from '../types';
import { Container } from './ReviewStatus.styled';

export type ReviewStatusProps = {
  status: ReviewListItemStatusUnion;
  children: string;
  className?: string;
};

const ReviewStatus: React.FC<ReviewStatusProps> = ({
  status,
  className,
  children
}) => {
  return (
    <Container className={className} status={status}>
      <Typography color='white' variant='caption'>
        {children}
      </Typography>
    </Container>
  );
};

export default ReviewStatus;
