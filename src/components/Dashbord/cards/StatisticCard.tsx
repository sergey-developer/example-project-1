import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container, Title } from './Common.styled';
import {
  StatisticItem,
  StatisticLabel,
  StatisticList,
  StatisticValue
} from './StatisticCard.styled';

interface StatisticCardProps {
  className?: string;
}

const items = [
  {
    label: 'profileOpenLabel',
    value: 4.89
  },
  {
    label: 'averageTimeLabel',
    value: `26 min`
  },
  {
    label: 'linkClickLabel',
    value: 266
  },
  {
    label: 'displayedProfileLabel',
    value: 36
  }
];

const StatisticCard: React.FC<StatisticCardProps> = ({ className }) => {
  const [translation] = useTranslation('dashboard');

  const t = (key: string) => translation(`statisticCard.${key}`);

  return (
    <Container className={className}>
      <Title>{t('title')}</Title>
      <StatisticList>
        {items.map(item => (
          <StatisticItem key={item.value}>
            <StatisticLabel>{t(item.label)}</StatisticLabel>
            <StatisticValue>{item.value}</StatisticValue>
          </StatisticItem>
        ))}
      </StatisticList>
    </Container>
  );
};

export default StatisticCard;
