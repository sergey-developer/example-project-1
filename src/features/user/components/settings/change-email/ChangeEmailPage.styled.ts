import { Form } from 'formik';
import styled from 'styled-components/macro';

import { Button } from 'components/Buttons';
import { TextInput } from 'components/Inputs';
import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

export const ChangeEmailForm = styled(Form)`
  display: flex;
  flex-direction: column;

  width: 42.8rem;

  margin-top: 3.2rem;

  ${mediaQueries.lessThan('sm')`
    width: 100%;
  `}
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  ${mediaQueries.lessThan('sm')`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export const EmailInput = styled(TextInput)`
  ${mediaQueries.lessThan('sm')`
     margin-bottom: 1.5rem;
  `}

  ${mediaQueries.greaterThan('sm')`
     flex: 2;
     width: auto;
     margin-right: 1.2rem;
  `}
`;

export const ChangeEmailButton = styled(Button)`
  ${mediaQueries.lessThan('sm')`
     width: 100%;
  `}
`;

export const VerificationLinkInfo = styled(Typography)`
  width: 27rem;

  margin-top: 0.5rem;
`;
