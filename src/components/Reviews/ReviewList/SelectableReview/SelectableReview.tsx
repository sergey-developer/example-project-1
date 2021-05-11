import React from 'react';

import Checkbox from '../Checkbox/Checkbox';
import { CheckboxContainer, Container } from './SelectableReview.styled';

type SelectableReviewProps = {
  canSelect: boolean;
  children: React.ReactElement;
  onSelect: (isSelected: boolean) => void;
};

const SelectableReview: React.FC<SelectableReviewProps> = ({
  canSelect,
  onSelect,
  children
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelect && onSelect(event.target.checked);
  };

  return canSelect ? (
    <Container>
      <CheckboxContainer>
        <Checkbox onChange={handleSelect} />
      </CheckboxContainer>

      {children}
    </Container>
  ) : (
    children
  );
};

export default SelectableReview;
