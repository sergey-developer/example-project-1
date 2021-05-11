import styled, { css } from 'styled-components/macro';

import { ReviewListProps } from './ReviewList';

export const ReviewListContainer = styled.div<{
  $maxWidth: ReviewListProps['maxWidth'];
}>`
  ${({ $maxWidth = '760px' }) => css`
    max-width: ${$maxWidth};

    display: flex;
    flex-direction: column;
  `}
`;
