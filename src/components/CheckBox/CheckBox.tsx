import React from 'react';
import styled, { css } from 'styled-components/macro';

import { randomString } from 'shared/utils';

const Wrapper = styled.div``;

const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  ${({ theme }) => css`
    position: absolute;
    z-index: -1;
    opacity: 0;

    & + label::before {
      content: '';
      display: inline-block;
      width: 1.8rem;
      height: 1.8rem;
      flex-shrink: 0;
      flex-grow: 0;
      border: 0.1rem solid ${theme.colors.greyNine};
      border-radius: 0.25rem;
      margin-right: 0.7rem;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
    }
    &:checked + label::before {
      border: none;
      background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.675' y='0.675' width='16.65' height='16.65' rx='1.65682' stroke='%23F83F20' stroke-width='1.35'/%3E%3Cpath d='M7.56221 13.4999C7.36775 13.4999 7.18949 13.4377 7.04364 13.2976L3.81886 10.2008C3.52718 9.92065 3.52718 9.48492 3.81886 9.20481C4.11055 8.92469 4.56428 8.92469 4.85597 9.20481L7.57841 11.8036L14.0442 5.60999C14.3359 5.32987 14.7896 5.32987 15.0813 5.60999C15.373 5.8901 15.373 6.32584 15.0813 6.60596L8.09697 13.2976C7.93492 13.4377 7.75667 13.4999 7.56221 13.4999Z' fill='%23F83F20'/%3E%3C/svg%3E%0A");
    }
  `}
`;

const Label = styled.label`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    user-select: none;
    ${css(theme.fonts.subTitleTwo)}
  `}
`;

interface CheckBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
  label?: string | React.ReactNode;
  name?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ className, label, name, ...rest }) => {
  const id = `${name || randomString()}-check-box`;
  return (
    <Wrapper className={className}>
      <Checkbox id={id} {...rest} />
      <Label htmlFor={id}>{label}</Label>
    </Wrapper>
  );
};

export default CheckBox;
