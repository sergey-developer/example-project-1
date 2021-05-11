import React from 'react';

import { Checkmark, Container, Input } from './Checkbox.styled';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ className, ...props }) => {
  return (
    <Container className={className}>
      <Input type='checkbox' {...props} />

      <Checkmark />
    </Container>
  );
};

export default Checkbox;
