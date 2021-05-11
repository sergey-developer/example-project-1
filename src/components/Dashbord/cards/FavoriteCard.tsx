import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container, Link, Title } from './Common.styled';
import {
  FavoriteAddress,
  FavoriteAvatar,
  FavoriteItem,
  FavoriteList,
  FavoriteName,
  FavoritePost
} from './FavoriteCard.styled';

interface FavoriteCardProps {
  className?: string;
}

const testItem = {
  name: 'Dr. John Smith, MD',
  post: 'Mount Sinai Doctors Ansonia',
  address: '517 Park Ave Brooklyn, NY 11205',
  avatar: 'http://placekitten.com/60/60'
};
const FavoriteCard: React.FC<FavoriteCardProps> = ({ className }) => {
  const [trans] = useTranslation('dashboard');
  const t = (key: string) => trans(`favoriteCard.${key}`);

  const items = new Array(3).fill(testItem) as typeof testItem[];

  return (
    <Container className={className}>
      <Title>{t('title')}</Title>

      <FavoriteList>
        {items?.map((item, index) => (
          <FavoriteItem key={index}>
            <FavoriteAvatar src={item.avatar} alt={item.name} />
            <FavoriteName>{item.name}</FavoriteName>
            <FavoritePost>{item.post}</FavoritePost>
            <FavoriteAddress>{item.address}</FavoriteAddress>
          </FavoriteItem>
        ))}
      </FavoriteList>

      <Link to='/'>{trans('common.seeAllLabel')}</Link>
    </Container>
  );
};

export default FavoriteCard;
