import styled, { css } from 'styled-components/macro';

import mediaQueries from 'styles/media-queries';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 103rem;

  ${mediaQueries.greaterThan('md')`
    flex-direction: row;
    justify-content: space-between;

  `}
`;

export const Column = styled.div`
  width: 100%;
  ${mediaQueries.greaterThan('md')`
      max-width: 48%;
  `}
`;
