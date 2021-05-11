import React from 'react';
import { useTranslation } from 'react-i18next';

import CircleProgress from 'components/CircleProgress';
import { PlusIcon } from 'components/Icons';
import { Typography } from 'components/Typography';

import { Container, Title } from './Common.styled';
import {
  ImproiveItem,
  ImproiveItemLabel,
  ImproiveLabel,
  ImproiveList,
  ProfileProgressW,
  ProgressLabel
} from './FillInfoCard.styled';

interface FillInfoCardProps {
  className?: string;
}

const improiveItems = [
  {
    label: 'addAwardsLabel'
  },
  {
    label: 'addWorkingLabel'
  },
  {
    label: 'addSocialLink'
  },
  {
    label: 'addServices'
  }
];

const FillInfoCard: React.FC<FillInfoCardProps> = ({ className }) => {
  const [translation] = useTranslation('dashboard');
  const t = (key: string) => translation(`fillInfoCard.${key}`);

  return (
    <Container className={className}>
      <Title>{t('title')}</Title>
      <ProfileProgressW>
        <CircleProgress percent={30} className='percent-diagram' />

        <ProgressLabel>{t('profileFillLabel')}</ProgressLabel>
      </ProfileProgressW>

      <ImproiveLabel>{t('improiveLabel')}</ImproiveLabel>
      <ImproiveList>
        {improiveItems.map(item => (
          <ImproiveItem key={item.label}>
            <PlusIcon className='icon' color='glacier' />
            <ImproiveItemLabel>{t(`improiveItems.${item.label}`)}</ImproiveItemLabel>
          </ImproiveItem>
        ))}
      </ImproiveList>
    </Container>
  );
};

export default FillInfoCard;
