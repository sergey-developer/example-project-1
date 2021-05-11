import React from 'react';

import { ReactComponent as MessageIcon } from 'assets/icons/MessageIcon.svg';

import { Typography } from '../Typography';
import { Container } from './EmptyState.styled';

type EmptyStateProps = {
  message: string;
  className?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({ message, className }) => {
  return (
    <Container className={className}>
      <MessageIcon width='56px' height='56px' />

      <Typography tag='span' variant='body' color='grayChateau'>
        {message}
      </Typography>
    </Container>
  );
};

export default EmptyState;
