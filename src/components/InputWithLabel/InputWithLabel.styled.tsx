import styled, { css } from 'styled-components/macro';

import { TextInput } from 'components/Inputs';
import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

export const Container = styled.div<{ onlyMobile?: boolean }>`
  ${({ onlyMobile }) => css`
    ${!onlyMobile &&
    mediaQueries.greaterThan('md')`
      display: flex;
      align-items: center;
    `}
  `}
`;

export const Label = styled(Typography).attrs({
  variant: 'h5',
  tag: 'label'
})<{ onlyMobile?: boolean }>`
  ${({ onlyMobile }) => css`
    margin-bottom: 1rem;
    display: block;
    flex-shrink: 0;
    ${!onlyMobile &&
    mediaQueries.greaterThan('md')`
    min-width: 23.6rem;
    margin-bottom: 0;
  `}
  `}
`;

export const Input = styled(TextInput)`
  ${({ theme }) => css`
    max-width: calc(100vw - 5rem);
    & > div {
      color: ${theme.colors.black};
    }
  `}
`;
