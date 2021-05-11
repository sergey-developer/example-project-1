import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';

export const FavoriteList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2.4rem;
`;

export const FavoriteItem = styled.li`
  ${({ theme }) => css`
    padding: 1.2rem;
    padding-left: 5.7rem;
    position: relative;
    min-height: 6rem;
    margin-bottom: 0.8rem;
    border: 0.1rem solid ${theme.colors.wildSand};
    border-radius: 1.2rem;
    &:last-child {
      margin-bottom: 0;
    }
  `}
`;

export const FavoriteAvatar = styled.img`
  border-radius: 50%;
  width: 3.6rem;
  height: 3.6rem;
  object-fit: cover;
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
`;

export const FavoriteName = styled(Typography).attrs({
  variant: 'body'
})`
  line-height: 1.92rem;
  margin-bottom: 0.4rem;
`;

export const FavoritePost = styled(Typography).attrs({
  variant: 'body4',
  color: 'greySix'
})`
  margin-bottom: 0.4rem;
`;

export const FavoriteAddress = styled(Typography).attrs({
  variant: 'hint',
  color: 'grayChateau'
})``;
