import { Form as FormikForm } from 'formik';
import styled, { css } from 'styled-components/macro';

import { Button } from 'components/Buttons';
import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 2.4rem;
    box-shadow: 0rem 0rem 0.2rem ${theme.colors.greySeven},
      0rem 0.2rem 2.4rem ${theme.colors.greySeven};
    border-radius: 0.8rem;
  `}
`;

export const Title = styled(Typography).attrs({
  variant: 'body'
})`
  margin-bottom: 1.8rem;
`;

export const Form = styled(FormikForm)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1.2rem;
  ${mediaQueries.greaterThan('md')`
    grid-template-columns: repeat(3, 1fr) 10.6rem;
  `}
`;

export const SubmitBtn = styled(Button)`
  max-width: 10.6rem;
`;
