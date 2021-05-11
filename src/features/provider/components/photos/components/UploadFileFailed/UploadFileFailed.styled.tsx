import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

export const Title = styled(Typography).attrs({
  variant: 'h2Two'
})`
  margin-bottom: 3.6rem;
`;

export const ErrorList = styled.ul`
  list-style: none;
  margin-bottom: 3.6rem;
`;

export const ErrorItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2rem;
  ${mediaQueries.lessThan('md')`
    flex-direction: column;
    margin-bottom: 2.4rem;
  `}
  &:last-child {
    margin-bottom: 0;
  }
`;

export const FileName = styled(Typography).attrs({
  variant: 'label',
  color: 'greySix'
})`
  ${mediaQueries.lessThan('md')`
    margin-bottom: 0.8rem;
 `}
`;

export const ErrorText = styled(Typography).attrs({
  color: 'warn'
})``;

export const ActionWrapper = styled.div`
  display: flex;
`;
