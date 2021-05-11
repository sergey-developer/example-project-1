import { nanoid } from '@reduxjs/toolkit';
import React from 'react';

import {
  Container,
  RadioInput,
  RadioItem,
  RadioLabel,
  RadioList
} from './RadioHorizontal.styled';

type ItemType = {
  label: string;
  value: string | number;
};

interface RadioHorizontalProps {
  className?: string;
  items: ItemType[];
  name: string;
  onChange?: (value: { [key: string]: string }) => void;
  value?: any;
}

const RadioHorizontal: React.FC<RadioHorizontalProps> = ({
  className,
  items = [],
  name,
  onChange = () => {},
  value
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      [name]: e?.target?.value
    });
  };

  return (
    <Container className={className}>
      <RadioList>
        {items.map(item => {
          const id = nanoid();

          return (
            <RadioItem key={item.label}>
              <RadioInput
                name={name}
                id={id}
                value={item.value}
                onChange={handleChange}
                checked={item.value === value}
              />
              <RadioLabel htmlFor={id}>{item.label}</RadioLabel>
            </RadioItem>
          );
        })}
      </RadioList>
    </Container>
  );
};

export default RadioHorizontal;
