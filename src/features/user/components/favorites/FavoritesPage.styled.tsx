import styled, { css } from 'styled-components/macro';

import { FavoriteItem as Favorite } from './components/FavoriteItem';

export const FavoriteList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, 34rem);
  grid-gap: 2.4rem;
  justify-content: center;
`;

export const FavoriteListItem = styled.li``;

export const FavoriteItem = styled(Favorite)``;
