import { Formik, FormikProps } from 'formik';
import React from 'react';
import { TFunction, useTranslation } from 'react-i18next';

import { TextAreaInput, TextInput } from 'components/Inputs';
import { Typography } from 'components/Typography';

import { Form, SubmitButton } from './CreateReplyForm.styled';

type CreateReplyFormProps = {
  onSubmit: (values: FormValues) => void;
};

export type FormValues = typeof initialValues;

const initialValues = {
  fullName: '',
  comment: ''
};

const validateForm = (values: FormValues, t: TFunction): Partial<FormValues> => {
  const errors: Partial<FormValues> = {};

  if (!values.fullName) errors.fullName = t('errors.fullNameRequired');

  if (!values.comment) errors.comment = t('errors.commentRequired');

  return errors;
};

const CreateReplyForm: React.FC<CreateReplyFormProps> = ({ onSubmit }) => {
  const [translate] = useTranslation('provider-reviews');
  const t = (path: string) => translate(`modals.createReply.form.${path}`);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => validateForm(values, t)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        isSubmitting
      }: FormikProps<FormValues>) => (
        <Form>
          <Typography tag='h6' variant='body'>
            {t('title')}
          </Typography>

          <TextInput
            placeholder={t('fields.fullNamePlaceholder')}
            name='fullName'
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={
              errors.fullName && touched.fullName ? errors.fullName : null
            }
          />

          <TextAreaInput
            placeholder={t('fields.commentPlaceholder')}
            height={11.4}
            name='comment'
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.comment && touched.comment ? errors.comment : null}
          />

          <SubmitButton type='submit' disabled={!isValid || isSubmitting}>
            {t('submitBtn')}
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateReplyForm;
