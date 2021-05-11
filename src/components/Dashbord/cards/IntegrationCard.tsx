import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Container, StyledLink, Title } from './Common.styled';
import {
  ServiceAction,
  ServiceInfo,
  ServiceItem,
  ServiceList,
  ServiceTitle,
  ServiceW
} from './IntegrationCard.styled';

interface IntegrationCardProps {
  className?: string;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ className }) => {
  const [translation] = useTranslation('dashboard');

  const t = (key: string, options?: any) =>
    translation(`integrationCard.${key}`, options);

  const items = (t('integrationServices', { returnObjects: true }) as unknown) as {
    name: string;
    info: string;
  }[];

  return (
    <Container className={className}>
      <Title>{t('title')}</Title>

      <ServiceList>
        {items.map(item => (
          <ServiceItem key={item.name}>
            <ServiceW>
              <ServiceTitle>{item.name}</ServiceTitle>

              <ServiceInfo>{item.info}</ServiceInfo>
            </ServiceW>

            <ServiceAction disabled>{t('addedLabel')}</ServiceAction>
          </ServiceItem>
        ))}
      </ServiceList>

      <Link to='/' component={StyledLink}>
        {t('showAllLabel')}
      </Link>
    </Container>
  );
};

export default IntegrationCard;
