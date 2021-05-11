import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Buttons';
import { TextInput } from 'components/Inputs';

import { Container, Form, SubmitBtn, Title } from './AddReferralsForm.styled';

interface AddReferralsFormProps {
  className?: string;
}

const AddReferralsForm: React.FC<AddReferralsFormProps> = ({ className }) => {
  const [translation] = useTranslation('provider-pages');
  const t = (key: string) => translation(`referralsPage.addReferralsForm.${key}`);

  return (
    <Container className={className}>
      <Title>{t('title')}</Title>
      <Formik
        initialValues={{
          name: ''
        }}
        onSubmit={console.log}
      >
        {({ values, handleChange, errors }) => (
          <Form>
            <TextInput placeholder={t('nameInput.placeholder')} />
            <TextInput placeholder={t('lastNameInput.placeholder')} />
            <TextInput placeholder={t('emailInput.placeholder')} />

            <SubmitBtn type='submit'>{t('submitBtnLabel')}</SubmitBtn>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddReferralsForm;
