import React from 'react';
import { useTranslation } from 'react-i18next';

import { ProviderDto } from 'features/provider/types';
import { Nullable } from 'shared/types';

import { Avatar, Container, Label, Title } from './ProviderInfo.styled';

interface ProviderInfoProps {
  name: ProviderDto['name'];
  className?: string;
  avatarUrl?: Nullable<string>;
}

export const ProviderInfo: React.FC<ProviderInfoProps> = ({
  className,
  name,
  avatarUrl
}) => {
  const [t] = useTranslation('common');

  return (
    <Container className={className}>
      <Avatar src={avatarUrl || ''} />

      <Label tag='span' variant='caption' color='greyThree'>
        {t('labels.provider')}
      </Label>

      <Title tag='span' variant='h6'>
        {name}
      </Title>
    </Container>
  );
};
