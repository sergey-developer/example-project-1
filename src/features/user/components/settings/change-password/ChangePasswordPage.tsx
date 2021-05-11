import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as EyeIcon } from 'assets/icons/EyeIcon.svg';
import { ReactComponent as EyeInvisibleIcon } from 'assets/icons/EyeInvisibleIcon.svg';
import { Button } from 'components/Buttons';
import { TextInput } from 'components/Inputs';
import { BaseAcceptModal } from 'components/Modals';
import { PageWrapper } from 'components/PageWrapper';

import {
  ChangePasswordButtonWrapper,
  FormCol,
  FormRow
} from './ChangePasswordPage.styled';

export type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmedPassword: string;
};

type ChangePasswordPageProps = {
  initialFormValues: ChangePasswordFormValues;
  validateForm: (
    t: (key: string) => string
  ) => (values: ChangePasswordFormValues) => Partial<ChangePasswordFormValues>;
  onSubmit: (
    formValues: ChangePasswordFormValues,
    formikHelpers: FormikHelpers<ChangePasswordFormValues>
  ) => void;
  modalOpened: boolean;
  closeModal: () => void;
};

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = ({
  initialFormValues,
  validateForm,
  onSubmit,
  modalOpened,
  closeModal
}) => {
  const [visiblePasswords, setVisiblePasswords] = React.useState<string[]>([]);
  const [translation] = useTranslation('user-pages');

  const t = (key: string) => translation(`changePasswordPage.${key}`);

  const toggleShowPassword = (
    passwordName: keyof ChangePasswordFormValues
  ) => () => {
    setVisiblePasswords(passwordNames => {
      return passwordNames.includes(passwordName)
        ? passwordNames.filter(name => name !== passwordName)
        : [...passwordNames, passwordName];
    });
  };

  const checkPasswordVisible = (passwordName: keyof ChangePasswordFormValues) => {
    return visiblePasswords.includes(passwordName);
  };

  const getInputIcon = (passwordName: keyof ChangePasswordFormValues) => {
    const Icon = checkPasswordVisible(passwordName) ? EyeIcon : EyeInvisibleIcon;
    return <Icon onClick={toggleShowPassword(passwordName)} />;
  };

  const getInputType = (passwordName: keyof ChangePasswordFormValues) => {
    return checkPasswordVisible(passwordName) ? 'text' : 'password';
  };

  return (
    <PageWrapper title={t('title')}>
      {modalOpened && (
        <BaseAcceptModal
          open={modalOpened}
          onClose={closeModal}
          title={t('acceptMessage')}
        />
      )}

      <Formik
        initialValues={initialFormValues}
        onSubmit={onSubmit}
        validate={validateForm(t)}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
          handleChange,
          handleBlur
        }: FormikProps<ChangePasswordFormValues>) => (
          <Form>
            <FormRow>
              <FormCol>{t('currentPasswordField.label')}</FormCol>
              <FormCol>
                <TextInput
                  name='currentPassword'
                  placeholder={t('currentPasswordField.placeholder')}
                  type={getInputType('currentPassword')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.currentPassword}
                  rightIcon={getInputIcon('currentPassword')}
                  errorMessage={
                    errors.currentPassword && touched.currentPassword
                      ? errors.currentPassword
                      : null
                  }
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>{t('newPasswordField.label')}</FormCol>
              <FormCol>
                <TextInput
                  name='newPassword'
                  placeholder={t('newPasswordField.placeholder')}
                  type={getInputType('newPassword')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newPassword}
                  rightIcon={getInputIcon('newPassword')}
                  errorMessage={
                    errors.newPassword && touched.newPassword
                      ? errors.newPassword
                      : null
                  }
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <FormCol>{t('confirmPassword.label')}</FormCol>
              <FormCol>
                <TextInput
                  name='confirmedPassword'
                  placeholder={t('confirmPassword.placeholder')}
                  type={getInputType('confirmedPassword')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmedPassword}
                  rightIcon={getInputIcon('confirmedPassword')}
                  errorMessage={
                    errors.confirmedPassword && touched.confirmedPassword
                      ? errors.confirmedPassword
                      : null
                  }
                />
              </FormCol>
            </FormRow>

            <FormRow>
              <ChangePasswordButtonWrapper>
                <Button
                  variant='primary'
                  type='submit'
                  disabled={!isValid || isSubmitting}
                >
                  {t('changePasswordBtnLabel')}
                </Button>
              </ChangePasswordButtonWrapper>
            </FormRow>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default ChangePasswordPage;
