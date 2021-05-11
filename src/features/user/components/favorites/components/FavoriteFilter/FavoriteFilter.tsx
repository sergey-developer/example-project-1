import React from 'react';

import { Select } from 'components/Select';

import { Container, SelectFilter } from './FavoriteFilter.styled';

interface FavoriteFilterProps {
  className?: string;
}

const FavoriteFilter: React.FC<FavoriteFilterProps> = ({ className }) => {
  return (
    <Container className={className}>
      <SelectFilter />
      <SelectFilter />
    </Container>
  );
};

export default FavoriteFilter;
