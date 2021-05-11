import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

export const Container = styled.div`
  padding: 0 2rem;
  ${mediaQueries.greaterThan('md')`
    padding-bottom: 5rem;
  `}
`;

export const StepsList = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  max-width: 101.6rem;
  margin: 0 auto;
  ${mediaQueries.greaterThan('md')`
    flex-wrap: no-wrap;
    justify-content: space-between;
  `};
`;

export const StepItem = styled.li`
  display: flex;
  align-items: center;
  width: 50%;
  margin-bottom: 2.4rem;
  ${mediaQueries.greaterThan('md')`
    width: auto;
    position: relative;
    margin-bottom: 0;
  `}
`;
export const IconContainer = styled.div<{ active?: boolean; done?: boolean }>`
  ${({ theme, active, done }) => css`
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${theme.colors.whiteLilacTwo};
    margin-right: 1.2rem;
    ${active &&
    css`
      background-color: ${theme.colors.glacier};
      & path {
        fill: ${theme.colors.white};
      }
    `}
    ${done &&
    css`
      background-color: ${theme.colors.lightGreen};
    `}
    ${mediaQueries.greaterThan('md')`
      margin-right: 0;
    `}
  `}
`;

export const StepInfoW = styled.div`
  ${mediaQueries.greaterThan('md')`
    position: absolute;
    bottom: -100%;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    text-align: center;
  `}
`;

export const StepCount = styled(Typography).attrs({
  variant: 'caption',
  color: 'grayChateau'
})`
  line-height: 1.44rem;
`;

export const StepLabel = styled(Typography).attrs({
  variant: 'h5'
})``;

export const Delimiter = styled.div<{ active?: boolean; done?: boolean }>`
  ${({ theme, active, done }) => css`
    ${active
      ? css`
          background-color: ${theme.colors.glacier};
        `
      : css`
          background-color: ${theme.colors.whiteLilacTwo};
        `}
    ${done &&
    css`
      background-color: ${theme.colors.lightGreen};
    `}
  `}
  display: none;
  flex-grow: 1;
  margin: auto 1.2rem;
  height: 0.8rem;
  border-radius: 0.5rem;
  ${mediaQueries.greaterThan('md')`
    display: block;
  `}
`;
