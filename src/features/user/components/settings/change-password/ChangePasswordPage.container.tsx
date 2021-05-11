import { FormikHelpers } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { UsersApi } from '../../../services';
import ChangePasswordPage, { ChangePasswordFormValues } from './ChangePasswordPage';

const validateForm = (t: (key: string) => string) => (
  values: ChangePasswordFormValues
) => {
  const errors: Partial<ChangePasswordFormValues> = {};

  if (!values.currentPassword) errors.currentPassword = t('errors.requiredField');
  if (!values.newPassword) errors.newPassword = t('errors.requiredField');
  if (!values.confirmedPassword)
    errors.confirmedPassword = t('errors.requiredField');

  if (
    values.newPassword &&
    values.confirmedPassword &&
    values.newPassword !== values.confirmedPassword
  ) {
    errors.newPassword = t('errors.passwordIsNotMatched');
  }

  return errors;
};

const initialFormValues: ChangePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmedPassword: ''
};

const ChangePasswordPageContainer: React.FC = () => {
  const [modalOpened, openModal] = React.useState(false);
  const [t] = useTranslation('user-pages');

  const handleSubmit = async (
    formValues: ChangePasswordFormValues,
    helpers: FormikHelpers<ChangePasswordFormValues>
  ) => {
    try {
      const isValid = await UsersApi.checkPasswordValid(formValues.currentPassword);
      if (isValid) {
        await UsersApi.updateSelfData({
          oldPassword: formValues.currentPassword,
          password: formValues.newPassword
        });

        helpers.resetForm({ values: initialFormValues });
        openModal(true);
      } else {
        helpers.setFieldError(
          'currentPassword',
          t('changePasswordPage.errors.passwordIsNotCorrect')
        );
      }
    } catch (error) {
      // TODO: handle error
      helpers.setFieldError('newPassword', error.message);
    }
  };

  return (
    <ChangePasswordPage
      initialFormValues={initialFormValues}
      validateForm={validateForm}
      onSubmit={handleSubmit}
      modalOpened={modalOpened}
      closeModal={() => openModal(false)}
    />
  );
};

export default ChangePasswordPageContainer;
