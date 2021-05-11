import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

export const StatisticList = styled.ul`
  list-style: none;
  ${mediaQueries.greaterThan('lg')`
    display: flex;  
    flex-wrap: wrap;
  `}
`;

export const StatisticItem = styled.li`
  ${({ theme }) => css`
    margin-bottom: 0.8rem;
    padding-bottom: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:last-child {
      margin-bottom: none;
    }
    ${mediaQueries.greaterThan('lg')`
      border-bottom: 0.1rem solid ${theme.colors.wildSand};
      flex-basis: 50%;
      &:nth-child(odd){
        border-right: 0.1rem solid ${theme.colors.wildSand};
       }
      &:nth-child(even){
        padding-left: 1.2rem;
      }
      &:nth-child(1), &:nth-child(2){
        margin-bottom: 2.4rem;
      }
    `}
  `}
`;

export const StatisticLabel = styled(Typography).attrs({
  variant: 'h5',
  color: 'grayChateau'
})``;

export const StatisticValue = styled(Typography).attrs({
  variant: 'h1Two'
})``;
