import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Buttons';

import { Container, Title } from './Common.styled';
import {
  Actions,
  RatingContainer,
  RatingDetailsStyled,
  RatingStars,
  RatingValue,
  RatingValueW,
  ReviewContainer,
  ReviewItem,
  ReviewsCount
} from './ReviewsCard.styled';

interface ReviewsCardProps {
  className?: string;
}

const ReviewsCard: React.FC<ReviewsCardProps> = ({ className }) => {
  const [translation] = useTranslation('dashboard');
  const t = (key: string, options?: any) =>
    translation(`reviewAndRatingCard.${key}`, options);

  return (
    <Container className={className}>
      <Title>{t('title')}</Title>
      <RatingContainer>
        <RatingValueW>
          <RatingValue>4,89</RatingValue>
          <RatingStars value={5} />
          <ReviewsCount>{t('reviewsLabel', { count: 162 })}</ReviewsCount>
        </RatingValueW>
        <RatingDetailsStyled />
      </RatingContainer>

      <ReviewContainer>
        <ReviewItem
          comment={
            'Laoreet volutpat leo gravida elementum in duis nec nulla ullamcorper. Egestas suscipit at vitae cursus iaculis. Enim malesuada amet cursus risus facilisis convallis. Augue feug...'
          }
          name={'Allison Rosser'}
          rating={4}
          date={`26.02.2021`}
          maxHeight={200}
          avatarSrc='http://placekitten.com/200/200'
        />
        <Actions>
          <Button $size='small' spaceRight={1.2}>
            {t('replyBtnLabel')}
          </Button>
          <Button $size='small' variant='additional'>
            {t('skipBtnLabel')}
          </Button>
        </Actions>
      </ReviewContainer>
    </Container>
  );
};

export default ReviewsCard;
