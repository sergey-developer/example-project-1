import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Buttons';
import { PageWrapper } from 'components/PageWrapper';

import { FavoriteFilter } from './components/FavoriteFilter';
import {
  FavoriteItem,
  FavoriteList,
  FavoriteListItem
} from './FavoritesPage.styled';

interface FavoritesPageProps {}

const FavoritesPage: React.FC<FavoritesPageProps> = ({}) => {
  const [t] = useTranslation('user-favorites');
  const testItems = new Array(8).fill(null);
  return (
    <PageWrapper
      maxWidth={106.8}
      title={t('pageTitle')}
      button={<Button variant='primary'>{t('selectFavoritesBtn')}</Button>}
    >
      <FavoriteFilter />

      <FavoriteList>
        {testItems.map((item, index) => (
          <FavoriteListItem key={index}>
            <FavoriteItem />
          </FavoriteListItem>
        ))}
      </FavoriteList>
    </PageWrapper>
  );
};

export default FavoritesPage;
