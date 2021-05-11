import React from 'react';

import { ArrowIcon } from '../Icons';
import { Button, Container } from './GoBackButton.styled';

type GoBackButtonProps = {
  onClick: () => void;
};

const GoBackButton: React.FC<GoBackButtonProps> = ({ onClick, children }) => {
  return (
    <Container>
      <ArrowIcon onClick={onClick} color='glacier' direction='left' />

      <Button onClick={onClick}>{children}</Button>
    </Container>
  );
};

export default GoBackButton;
