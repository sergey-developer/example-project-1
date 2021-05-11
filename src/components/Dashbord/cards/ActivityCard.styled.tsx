import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';

export const ActivityList = styled.ul`
  list-style: none;
  padding-left: 0.5rem;
`;

export const ActivityItem = styled.li`
  ${({ theme }) => css`
    position: relative;
    padding-bottom: 1.6rem;
    padding-left: 2rem;
    border-left: 0.1rem solid ${theme.colors.athensGray};
    &:last-child {
      border: none;
    }
    &:before {
      content: '';
      position: absolute;
      left: -1.05rem;
      top: 0;
      display: block;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: ${theme.colors.grayChateau};
      border: 0.4rem solid ${theme.colors.white};
    }
  `}
`;

export const ActivityLabel = styled(Typography).attrs({
  variant: 'caption'
})``;

export const ActivityDate = styled(Typography).attrs({
  variant: 'caption',
  color: 'grayChateau'
})``;
