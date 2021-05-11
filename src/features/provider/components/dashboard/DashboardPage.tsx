import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActivityCard,
  FillInfoCard,
  IntegrationCard,
  InviteCard,
  PhotosCard,
  ProfileUrlCard,
  ReviewsCard,
  StatisticCard
} from 'components/Dashbord/cards';
import { PageWrapper } from 'components/PageWrapper';
import { ProfileGalleryModel } from 'features/provider/types';

import { Column, Container } from './DashboardPage.styled';

interface DashboardPageProps {
  gallery: ProfileGalleryModel[];
  providerId?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ gallery, providerId }) => {
  const [t] = useTranslation('provider-pages');
  return (
    <PageWrapper title={t('dashboardPage.title')}>
      <Container>
        <Column>
          <ReviewsCard />

          <IntegrationCard />

          <PhotosCard gallery={gallery} providerId={providerId} />

          <InviteCard />
        </Column>

        <Column>
          <StatisticCard />

          <FillInfoCard />

          <ActivityCard />

          <ProfileUrlCard />
        </Column>
      </Container>
    </PageWrapper>
  );
};

export default DashboardPage;
