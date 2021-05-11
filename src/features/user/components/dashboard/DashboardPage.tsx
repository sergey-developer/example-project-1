import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActivityCard,
  FavoriteCard,
  FillInfoCard,
  InviteCard,
  ReviewsCard
} from 'components/Dashbord/cards';
import { PageWrapper } from 'components/PageWrapper';

import { Column, Container } from './DashboardPage.styled';

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  const [t] = useTranslation('user-pages');
  return (
    <PageWrapper title={t('dashboardPage.title')}>
      <Container>
        <Column>
          <ReviewsCard />

          <InviteCard />

          <FavoriteCard />
        </Column>

        <Column>
          <FillInfoCard />

          <ActivityCard />
        </Column>
      </Container>
    </PageWrapper>
  );
};

export default DashboardPage;
