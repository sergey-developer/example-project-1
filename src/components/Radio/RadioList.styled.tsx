import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';

export const Container = styled.div``;

export const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const OptionItem = styled.li`
  ${({ theme }) => css`
    border-bottom: 0.1rem solid ${theme.colors.wildSand};
    &:last-child {
      border: none;
    }
  `}
`;

export const RadioLabel = styled(Typography).attrs({
  tag: 'label',
  variant: 'label',
  color: 'greySix'
})`
  display: block;
  padding: 1.2rem 3rem 1.2rem 0;
  position: relative;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    border: 0.2rem solid;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const RadioInput = styled.input.attrs({
  type: 'radio'
})`
  display: none;

  &:checked + label:after {
    ${({ theme }) => css`
      border-color: ${theme.colors.glacier};
      background-color: ${theme.colors.glacier};
      box-shadow: inset 0rem 0rem 0rem 0.2rem ${theme.colors.white};
    `}
  }
`;
