import React, { useState } from 'react';

import {
  CheckIcon,
  Container,
  RadioBullet,
  RadioItem,
  RadioLabel,
  RadioList
} from './RadioBtnEdit.styled';

interface RadioBtnEditProps {
  className?: string;
  edit?: boolean;
  value?: boolean;
  labels: string[];
  onChange?: (value: boolean) => void;
}

export const RadioBtnEdit: React.FC<RadioBtnEditProps> = ({
  className,
  edit,
  labels,
  value,
  onChange = () => {}
}) => {
  const [select, setSelect] = useState<number | null>(0);

  const setSelectItem = (id: number) => () => {
    onChange(!!id);
  };

  return (
    <Container className={className}>
      {edit ? (
        <RadioList>
          {labels.map((item, index) => {
            return (
              <RadioItem key={index} onClick={setSelectItem(index)}>
                <RadioBullet $check={value === !!index} />
                <RadioLabel>{item}</RadioLabel>
              </RadioItem>
            );
          })}
        </RadioList>
      ) : (
        <>
          {select !== null && (
            <RadioItem>
              <CheckIcon />
              <RadioLabel>{select !== null && labels[select]}</RadioLabel>
            </RadioItem>
          )}
        </>
      )}
    </Container>
  );
};
