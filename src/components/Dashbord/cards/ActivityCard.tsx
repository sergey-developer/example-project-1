import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActivityDate,
  ActivityItem,
  ActivityLabel,
  ActivityList
} from './ActivityCard.styled';
import { Container, Title } from './Common.styled';

interface ActivityCardProps {
  className?: string;
}

const activityList = [
  {
    name: 'Moderator rejects update. Reason: "Obscene language in the description"'
  },
  {
    name: 'Anna B updated location'
  },
  {
    name: 'Moderator approves update'
  },
  {
    name: 'Anna B updated Profile information'
  }
];

const ActivityCard: React.FC<ActivityCardProps> = ({ className }) => {
  const [translation] = useTranslation('dashboard');

  const t = (key: string) => translation(`activityCard.${key}`);

  return (
    <Container className={className}>
      <Title>{t('title')}</Title>
      <ActivityList>
        {activityList.map(item => (
          <ActivityItem key={item.name}>
            <ActivityLabel>{item.name}</ActivityLabel>
            <ActivityDate>{`24.02.2021`}</ActivityDate>
          </ActivityItem>
        ))}
      </ActivityList>
    </Container>
  );
};

export default ActivityCard;
