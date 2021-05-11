import { FormikHelpers } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from 'features/auth/hooks';

import { UsersApi } from '../../../services';
import ChangeEmailPage, { ChangeEmailFormValues } from './ChangeEmailPage';

const initialFormValues: ChangeEmailFormValues = {
  email: ''
};

const ChangeEmailPageContainer: React.FC = () => {
  const { auth } = useAuth();
  const [translation] = useTranslation('user-pages');

  const t = (key: string) => translation(`changeEmailPage.${key}`);

  const handleUpdateEmail = async (
    email: string,
    helpers: FormikHelpers<ChangeEmailFormValues>
  ) => {
    const updateStatus = await UsersApi.updateEmail(email);
    if (!(updateStatus === 200)) throw new Error(t('errors.emailWasNotUpdates'));

    helpers.resetForm({ values: initialFormValues });
    helpers.setStatus({ submittedEmail: email });
  };

  const handleSubmit = async (
    values: ChangeEmailFormValues,
    helpers: FormikHelpers<ChangeEmailFormValues>
  ) => {
    const newEmail = values.email;

    try {
      const emailAvailable = await UsersApi.checkEmailAvailable(newEmail);

      if (emailAvailable) {
        await handleUpdateEmail(newEmail, helpers);
      } else {
        helpers.setFieldError('email', t('errors.emailAlreadyTaken'));
      }
    } catch (error) {
      helpers.setFieldError('email', error.message);
    }
  };

  return (
    <ChangeEmailPage
      currentEmail={auth.user?.profile.email || ''}
      initialFormValues={initialFormValues}
      onSubmit={handleSubmit}
    />
  );
};

export default ChangeEmailPageContainer;
