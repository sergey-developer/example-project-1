import styled, { css } from 'styled-components/macro';

import { Button } from 'components/Buttons';
import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

export const ProvidersList = styled.ul`
  padding: 1.6rem 0;
  list-style: none;
`;

export const ProviderItem = styled.li`
  ${({ theme }) => css`
    display: flex;
    padding: 1.2rem;
    justify-content: space-between;
    background-color: ${theme.colors.whiteLilacTwo};
    border-radius: 0.8rem;
    margin-bottom: 0.5rem;
    &:last-child {
      margin-bottom: 0;
    }
    ${mediaQueries.lessThan('md')`
      flex-direction: column;
    `}
  `}
`;

export const InfoWrapper = styled.div``;

export const Name = styled(Typography).attrs({
  variant: 'body'
})`
  margin-bottom: 0.8rem;
  line-height: 1.92rem;
`;

export const ActionWrapper = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  padding-left: 1rem;
  ${mediaQueries.lessThan('md')`
    padding-left: 0;
    padding-top: 1.2rem;
  `}
`;

export const ClaimProfileBtn = styled(Button).attrs({
  variant: 'primary'
})`
  padding: 0.8rem;
  margin: auto 0;
`;

export const AlreadyClaimedLabel = styled(Typography).attrs({
  variant: 'h5',
  color: 'grayChateau'
})`
  margin: auto 0;
`;

export const LocationName = styled(Typography).attrs({
  variant: 'label',
  color: 'greySix'
})``;

export const LocationValue = styled(Typography).attrs({
  variant: 'label',
  color: 'grayChateau'
})``;
