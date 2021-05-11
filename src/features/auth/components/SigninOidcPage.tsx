import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { doFinishSignin } from 'state/ducks/auth';
import { useAppDispatch } from 'state/store';

import { useFinishSigninSaga } from '../hooks';

const SigninOidcPage: React.FC = () => {
  const [t] = useTranslation('auth');

  useFinishSigninSaga();
  const dispatch = useAppDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(doFinishSignin({ history }));
  }, []);

  return <div>{t('signingProcess')}</div>;
};

export default SigninOidcPage;
