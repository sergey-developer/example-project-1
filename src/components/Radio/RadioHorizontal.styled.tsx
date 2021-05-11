import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';

export const Container = styled.div``;

export const RadioList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
`;

export const RadioItem = styled.li`
  margin-right: 2.4rem;
`;

export const RadioLabel = styled(Typography).attrs({
  tag: 'label',
  variant: 'label',
  color: 'greySix'
})`
  display: block;
  padding: 1.2rem 1.2rem 1.2rem 3rem;
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
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const RadioInput = styled.input.attrs({
  type: 'radio'
})`
  ${({ theme }) => css`
    display: none;

    &:checked + label:after {
      border-color: ${theme.colors.glacier};
      background-color: ${theme.colors.glacier};
      box-shadow: inset 0rem 0rem 0rem 0.2rem ${theme.colors.white};
    }
    &:checked + label {
      color: ${theme.colors.glacier};
    }
  `}
`;
