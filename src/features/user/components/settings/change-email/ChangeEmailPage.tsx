import { Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { PageWrapper } from 'components/PageWrapper';
import { Typography } from 'components/Typography';

import {
  ChangeEmailButton,
  ChangeEmailForm,
  EmailInput,
  FormRow,
  VerificationLinkInfo
} from './ChangeEmailPage.styled';

export type ChangeEmailFormValues = {
  email: string;
};

type ChangeEmailPageProps = {
  currentEmail: string;
  initialFormValues: ChangeEmailFormValues;
  onSubmit: (
    values: ChangeEmailFormValues,
    formikHelpers: FormikHelpers<ChangeEmailFormValues>
  ) => Promise<void>;
};

const ChangeEmailPage: React.FC<ChangeEmailPageProps> = ({
  currentEmail,
  initialFormValues,
  onSubmit
}) => {
  const [translation] = useTranslation('user-pages');
  const t = (key: string, options?: any) =>
    translation(`changeEmailPage.${key}`, options);

  return (
    <PageWrapper title={t('title')}>
      <Typography variant='label' color='grayChateau'>
        {t('subTitle', { currentEmail })}
      </Typography>

      <Formik onSubmit={onSubmit} initialValues={initialFormValues}>
        {({
          values,
          errors,
          touched,
          status,
          isSubmitting,
          resetForm: formikResetForm,
          handleChange
        }: FormikProps<ChangeEmailFormValues>) => {
          const resetForm = () => {
            formikResetForm({ values: initialFormValues });
          };

          return (
            <ChangeEmailForm>
              <FormRow>
                <EmailInput
                  name='email'
                  placeholder={
                    status?.submittedEmail ? status.submittedEmail : t('emailLabel')
                  }
                  value={values.email}
                  onChange={handleChange}
                  errorMessage={errors.email && touched.email ? errors.email : null}
                  disabled={!!status?.submittedEmail}
                />

                {!status?.submittedEmail && (
                  <ChangeEmailButton
                    variant='primary'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    {t('changeEmailLabel')}
                  </ChangeEmailButton>
                )}
              </FormRow>

              {status?.submittedEmail && (
                <VerificationLinkInfo
                  tag='span'
                  variant='caption'
                  color='grayChateau'
                >
                  <Trans
                    i18nKey='user-pages:changeEmailPage.linkSendInfoMessage'
                    components={[
                      <Typography
                        tag='span'
                        variant='caption'
                        color='glacier'
                        cursor='pointer'
                        onClick={resetForm}
                      />
                    ]}
                  />
                </VerificationLinkInfo>
              )}
            </ChangeEmailForm>
          );
        }}
      </Formik>
    </PageWrapper>
  );
};

export default ChangeEmailPage;
