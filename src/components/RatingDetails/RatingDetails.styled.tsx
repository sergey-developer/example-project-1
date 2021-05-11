import styled, { css } from 'styled-components/macro';

import { ReactComponent as Star } from 'assets/icons/StarIcon.svg';

export const RatingList = styled.ul`
  width: 100%;
  list-style: none;
  counter-reset: itemCount;
  display: flex;
  flex-direction: column-reverse;
`;

export const RatingItem = styled.li`
  ${({ theme }) => css`
    width: 100%;
    position: relative;
    padding: 0.4rem 0;
    padding-left: 3.1rem;
    margin-bottom: 0.8rem;
    &:last-child {
      margin-bottom: none;
    }
    &:before {
      counter-increment: itemCount;
      content: counter(itemCount);
      position: absolute;
      left: 0;
      ${css(theme.fonts.hint)}
      color: ${theme.colors.grayChateau};
      top: 50%;
      transform: translateY(-50%);
    }
  `}
`;

export const StarIcon = styled(Star)`
  position: absolute;
  left: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  ${({ theme }) => css`
    fill: ${theme.colors.grayChateau};
  `}
`;

export const RatingValue = styled.div<{ $percent?: number }>`
  ${({ theme, $percent }) => css`
    width: 100%;
    height: 0.6rem;
    background-color: ${theme.colors.wildSand};
    border-radius: 0.3rem;
    position: relative;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${$percent}%;
      background-color: ${theme.colors.sunshade};
      border-radius: 0.3rem;
    }
  `}
`;
