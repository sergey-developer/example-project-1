import styled, { css } from 'styled-components/macro';

import { CheckBoxIcon } from 'components/Icons';
import { Typography } from 'components/Typography';

export const Container = styled.div``;

export const RadioList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

export const RadioItem = styled.li`
  margin-right: 2rem;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
`;

export const RadioBullet = styled.div<{
  $check?: boolean;
}>`
  ${({ theme, $check }) => css`
    transition: all 0.3s;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 0.2rem solid ${theme.colors.glacier};
    margin-right: 1rem;
    ${$check &&
    css`
      background-color: ${theme.colors.warn};
      box-shadow: inset 0 0 0 0.2rem white;
      border: 0.2rem solid ${theme.colors.warn};
    `}
  `}
`;

export const RadioLabel = styled(Typography).attrs({
  tag: 'span'
})``;

export const CheckIcon = styled(CheckBoxIcon)`
  margin-right: 1rem;
`;
