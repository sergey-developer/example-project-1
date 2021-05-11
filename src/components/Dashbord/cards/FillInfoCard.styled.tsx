import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';

export const ProfileProgressW = styled.div`
  ${({ theme }) => css`
    display: flex;
    padding: 1.6rem;
    align-items: center;
    border: 1px solid ${theme.colors.wildSand};
    border-radius: 1.2rem;
    margin-bottom: 2.4rem;
    & > .percent-diagram {
      width: 7.2rem;
      height: 7.2rem;
      margin-right: 2.4rem;
    }
  `}
`;

export const ProgressLabel = styled(Typography).attrs({
  variant: 'h3Two'
})``;

export const ImproiveLabel = styled(Typography).attrs({
  variant: 'body'
})`
  margin-bottom: 1.6rem;
`;

export const ImproiveList = styled.ul`
  list-style: none;
`;

export const ImproiveItem = styled.li`
  margin-bottom: 1.2rem;
  &:last-child {
    margin-bottom: 0;
  }
  & > .icon {
    margin-right: 0.8rem;
  }
`;

export const ImproiveItemLabel = styled(Typography).attrs({
  tag: 'span',
  variant: 'label',
  color: 'glacier'
})``;
