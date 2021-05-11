import React from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router';
import { Link, useHistory } from 'react-router-dom';

import { ProfileGalleryModel } from 'features/provider/types';
import { ROUTES } from 'shared/constants';

import { Container, StyledLink, Title } from './Common.styled';
import {
  EmptyAdvice,
  EmptyTitle,
  Image,
  PhotoCount,
  PhotoInfo,
  PhotoItem,
  PhotoLabel,
  PhotosList
} from './PhotosCard.styled';

interface PhotosCardProps {
  className?: string;
  gallery: ProfileGalleryModel[];
  providerId?: string;
}

const PhotosCard: React.FC<PhotosCardProps> = ({
  className,
  gallery,
  providerId
}) => {
  const [translation] = useTranslation('dashboard');
  let history = useHistory();

  const t = (key: string) => translation(`photosCard.${key}`);

  const isGalleryNotEmpty = !!gallery.length;

  const items = gallery.length > 4 ? gallery.slice(0, 4) : gallery;

  const galleryLink = generatePath(ROUTES.PROVIDER_PHOTOS, {
    id: providerId
  });

  const handleGoGallery = () => {
    history.push(galleryLink);
  };

  return (
    <Container className={className}>
      <Title>{t('title')}</Title>

      {isGalleryNotEmpty ? (
        <PhotosList>
          {items.map((item, index) => (
            <PhotoItem key={item.photoUrl}>
              <Image src={item.photoUrl || ''} />
              {gallery.length > 4 && index === 3 && (
                <PhotoInfo onClick={handleGoGallery}>
                  <PhotoCount>{gallery.length - 4}</PhotoCount>

                  <PhotoLabel>{t('moreLabel')}</PhotoLabel>
                </PhotoInfo>
              )}
            </PhotoItem>
          ))}
        </PhotosList>
      ) : (
        <>
          <EmptyTitle>{t('emptyTitle')}</EmptyTitle>

          <EmptyAdvice>{t('emptyAdvice')}</EmptyAdvice>
        </>
      )}

      <Link to={galleryLink} component={StyledLink}>
        {t('allPhotoLabel')}
      </Link>
    </Container>
  );
};

export default PhotosCard;
