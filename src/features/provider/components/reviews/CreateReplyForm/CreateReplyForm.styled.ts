import { Form as FormikForm } from 'formik';
import styled from 'styled-components/macro';

import { Button } from 'components/Buttons';

export const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;

  & > :not(:last-child) {
    margin-bottom: 2.5rem;
  }

  & > :first-child {
    margin-bottom: 1.2rem;
  }
`;

export const SubmitButton = styled(Button)`
  width: 7.6rem;
  height: 3.7rem;

  align-self: flex-end;
`;
