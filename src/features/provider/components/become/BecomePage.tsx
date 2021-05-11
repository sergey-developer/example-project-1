import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Button } from 'components/Buttons';
import { PageWrapper } from 'components/PageWrapper';
import { MAIN_SITE_URL } from 'config/common';
import { ROUTES } from 'shared/constants';

import { ActionsWrapper } from './BecomePage.styled';

interface BecomePageProps {}

const BecomePage: React.FC<BecomePageProps> = ({}) => {
  const history = useHistory();

  const [translation] = useTranslation('provider-pages');
  const t = (key: string) => translation(`becomeProviderPage.${key}`);

  //TODO
  const handleGoCatalog = () => {
    //@ts-ignore
    window.location = MAIN_SITE_URL;
  };

  const handleClick = () => {
    history.push(ROUTES.PROVIDER_CREATE);
  };
  return (
    <PageWrapper title={t('title')} subTitle={t('subTitle')}>
      <ActionsWrapper>
        <Button onClick={handleGoCatalog} spaceRight={0.7}>
          {t('findProfileBtnLabel')}
        </Button>
        <Button onClick={handleClick} variant='primary'>
          {t('createProfileBtnLabel')}
        </Button>
      </ActionsWrapper>
    </PageWrapper>
  );
};

export default BecomePage;
