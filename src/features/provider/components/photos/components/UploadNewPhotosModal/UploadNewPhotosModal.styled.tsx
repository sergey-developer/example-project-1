import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';

export const Title = styled(Typography).attrs({
  variant: 'h2',
  tag: 'h2'
})`
  margin-bottom: 2.6rem;
`;

export const ActionWrapper = styled.div`
  padding-top: 2rem;
`;
