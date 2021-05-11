import styled from 'styled-components/macro';

import mediaQueries from 'styles/media-queries';

export const SelectContainer = styled.div`
  width: 18rem;

  ${mediaQueries.lessThan('sm')`
    width: 100%;
  `}
`;
