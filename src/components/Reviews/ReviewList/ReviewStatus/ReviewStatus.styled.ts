import styled from 'styled-components/macro';

import { ReviewStatusProps } from './ReviewStatus';

export const Container = styled.div<Pick<ReviewStatusProps, 'status'>>`
  padding: 4px 8px;

  border-radius: 4px;

  ${({ theme, status }) => `
    background-color: ${
      status === 'published'
        ? theme.colors.lightGreen
        : status === 'moderation'
        ? theme.colors.glacier
        : ''
    };
  `}
`;
