import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Buttons';

import { Container, Title } from './Common.styled';

interface ProfileUrlCardProps {
  className?: string;
}

const ProfileUrlCard: React.FC<ProfileUrlCardProps> = ({ className }) => {
  const [translation] = useTranslation('dashboard');

  const t = (key: string) => translation(`profileUrlCard.${key}`);

  return (
    <Container className={className}>
      <Title>{t('title')}</Title>
      <Button variant='additional'>{t('buttonLabel')}</Button>
    </Container>
  );
};

export default ProfileUrlCard;
