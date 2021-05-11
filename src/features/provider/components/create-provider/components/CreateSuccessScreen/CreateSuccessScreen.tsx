import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { generatePath } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';

import { ReactComponent as DoneIcon } from 'assets/icons/steps/DoneIcon.svg';
import { Button } from 'components/Buttons';
import { Typography } from 'components/Typography';
import { useAuth } from 'features/auth/hooks';
import { ROUTES } from 'shared/constants';
import { Nullable } from 'shared/types';
import { doGetProviderList } from 'state/ducks/providerList';
import { useAppDispatch } from 'state/store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4.5rem;
`;

const IconWrapper = styled.div`
  ${({ theme }) => css`
    width: 7.2rem;
    height: 7.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${theme.colors.lightGreen};
    margin-bottom: 2.4rem;
  `}
`;

const SubTitle = styled(Typography)`
  max-width: 80rem;
  text-align: center;
  line-height: 2.72rem;
  margin-bottom: 2.4rem;
`;

const GoProfileBtn = styled(Button)`
  margin: 0 auto;
`;

interface CreateSuccessScreenProps {
  newProviderId: Nullable<string>;
  onResetState: () => void;
}

const CreateSuccessScreen: React.FC<CreateSuccessScreenProps> = ({
  newProviderId,
  onResetState = () => {}
}) => {
  const [translation] = useTranslation('provider-pages');
  const t = (key: string) => translation(`createProviderPage.${key}`);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { auth } = useAuth();

  React.useEffect(() => {
    if (auth.user) {
      dispatch(doGetProviderList(auth.user.profile.sub));
    }
  }, [auth.user]);

  const handleGoProfile = () => {
    newProviderId &&
      history.push(
        generatePath(ROUTES.PROVIDER_DASHBOARD, {
          id: newProviderId
        })
      );
  };

  useEffect(() => onResetState, []);

  return (
    <Container>
      <IconWrapper>
        <DoneIcon width='60' height='60' />
      </IconWrapper>

      <Typography align='center' spacingBottom={0.8} variant='h1' tag='h2'>
        {t('successPageTitle')}
      </Typography>
      <SubTitle variant='label' color='grayChateau'>
        {t('successPageSubtitle')}
      </SubTitle>

      <GoProfileBtn onClick={handleGoProfile}>{t('seeProfileLabel')}</GoProfileBtn>
    </Container>
  );
};

export default CreateSuccessScreen;
