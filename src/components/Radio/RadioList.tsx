import { nanoid } from '@reduxjs/toolkit';
import React from 'react';

import { Nullable } from 'shared/types';

import {
  Container,
  OptionItem,
  OptionList,
  RadioInput,
  RadioLabel
} from './RadioList.styled';

interface RadioListProps {
  className?: string;
  items: {
    label?: Nullable<string>;
    value?: string | number;
  }[];
  name: string;
  value: Nullable<string | number>;
  onSelect: (value: string | number) => void;
}

const RadioList: React.FC<RadioListProps> = ({
  className,
  onSelect,
  items = [],
  name,
  value
}) => {
  const handleSelect = (value?: string | number) => () => {
    value && onSelect(value);
  };

  return (
    <Container className={className}>
      <OptionList>
        {items.map(item => {
          const id = nanoid();
          return (
            <OptionItem key={item.label}>
              <RadioInput
                id={id}
                name={name}
                value={item.value}
                checked={value === item.value}
                onChange={e => onSelect(e.target.value)}
              />
              <RadioLabel htmlFor={id}>{item.label}</RadioLabel>
            </OptionItem>
          );
        })}
      </OptionList>
    </Container>
  );
};

export default RadioList;
