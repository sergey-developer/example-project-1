import GoogleAutoComplete from 'react-google-autocomplete';
import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';

import { TextInputSize } from './TextInput.styled';

export const AutoCompleteInput = styled(GoogleAutoComplete)<{
  $size: TextInputSize;
  $error: boolean;
}>`
  ${({ theme, $size, $error }) => css`
    width: 100%;
    height: 4.6rem;
    padding: 0 1.5rem;
    border: 1px solid ${theme.colors.grayChateau};
    border-radius: ${theme.common.inputBorderRadius};
    outline: none;

    &:focus,
    &:active {
      border: 1px solid ${theme.colors.lightGreen};
    }

    &::placeholder {
      color: ${theme.colors.grayChateau};
    }

    ${css(theme.fonts.subTitleTwo)}

    ${$size === 'small' &&
    css`
      padding: 1.1rem 1.5rem;
    `}
    ${$error &&
    css`
      &,
      &:focus,
      &:active {
        border-color: ${theme.colors.warn};
      }
    `}
  `}
`;

export const ErrorLabel = styled(Typography).attrs({
  variant: 'subTitle',
  color: 'warn'
})`
  ${({ theme }) => css`
    margin-top: 0.5rem;
  `}
`;
