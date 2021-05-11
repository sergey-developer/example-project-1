import styled from 'styled-components/macro';

import mediaQueries from 'styles/media-queries';

export const FormRow = styled.div`
  width: 53.6rem;

  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-top: 2rem;
  }

  ${mediaQueries.lessThan('sm')`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export const FormCol = styled.div`
  width: 50%;

  ${mediaQueries.lessThan('sm')`
    &:last-child {
      margin-top: 1rem;
    }
  `}
`;

export const ChangePasswordButtonWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;

  margin-top: 1rem;

  ${mediaQueries.lessThan('sm')`
    justify-content: flex-start;
  `}
`;
