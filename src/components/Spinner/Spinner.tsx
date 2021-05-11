import React from 'react';
import SpinnerMaterial from 'react-spinner-material';

import { Container } from './Spinner.styled';

type SpinnerSize = 'sm' | 'md' | 'lg';

const sizes: Record<SpinnerSize, number> = {
  sm: 20,
  md: 40,
  lg: 60
};

export type SpinnerProps = {
  size: SpinnerSize;
  fullwidth?: boolean;
  overScreen?: boolean;
};

const color = '#333';
const stroke = 2;

const Spinner: React.FC<SpinnerProps> = ({
  size,
  fullwidth,
  overScreen = false
}) => {
  const spinner = (
    <SpinnerMaterial visible radius={sizes[size]} color={color} stroke={stroke} />
  );

  return fullwidth || overScreen ? (
    <Container overScreen={overScreen}>{spinner}</Container>
  ) : (
    spinner
  );
};

export default Spinner;
