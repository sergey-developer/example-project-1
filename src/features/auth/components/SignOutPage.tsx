import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../hooks';

const SignOutPage: React.FC = () => {
  const { signOut } = useAuth();
  const [t] = useTranslation('auth');

  React.useEffect(() => {
    signOut();
  }, []);

  return <div>{t('signOutProcess')}</div>;
};

export default SignOutPage;
