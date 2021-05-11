import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Buttons';

import { Container, Title } from './Common.styled';
import { Info } from './InviteCard.styled';

interface InviteCardProps {
  className?: string;
}

const InviteCard: React.FC<InviteCardProps> = ({ className }) => {
  const [translation] = useTranslation('dashboard');

  const t = (key: string) => translation(`inviteCard.${key}`);
  return (
    <Container className={className}>
      <Title>{t('title')}</Title>
      <Info>{t('info')}</Info>

      <Button variant='additional'>{t('referalLinkLabel')}</Button>
    </Container>
  );
};

export default InviteCard;
