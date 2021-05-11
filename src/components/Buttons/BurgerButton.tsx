import React from 'react';
import styled from 'styled-components/macro';

import { BurgerIcon } from 'components/Icons';

const Button = styled.button`
  cursor: pointer;
`;

interface BurgerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const BurgerButton: React.FC<BurgerButtonProps> = ({ ...props }) => {
  return (
    <Button {...props}>
      <BurgerIcon />
    </Button>
  );
};
