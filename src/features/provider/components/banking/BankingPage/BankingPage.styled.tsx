import styled, { css } from 'styled-components/macro';

import { InputWithLabel } from 'components/InputWithLabel';
import mediaQueries from 'styles/media-queries';

export const InputWithLabelStyled = styled(InputWithLabel)`
  margin-bottom: 2rem;
  ${mediaQueries.greaterThan('md')`
    margin-bottom: 1rem;
    &  input {
      max-width: 30rem;
    }
  `}
`;
