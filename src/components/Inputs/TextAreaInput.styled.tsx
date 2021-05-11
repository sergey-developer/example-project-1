import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';

export const Container = styled.div`
  position: relative;
`;

export const TextArea = styled.textarea<{
  $height?: number;
  hasError?: boolean;
}>`
  ${({ theme, $height, hasError }) => css`
    height: ${$height ?? theme.common.defaultTextAreaHeight}rem;
    resize: none;
    transition: all 0.3s;

    display: flex;
    width: 100%;

    padding: 1.5rem;

    border: 1px solid ${theme.colors.grayChateau};
    border-radius: ${theme.common.inputBorderRadius};

    outline: none;
    box-shadow: unset;
    color: unset;

    &:focus,
    &:active {
      border: 1px solid ${theme.colors.lightGreen};
    }

    &::placeholder {
      color: ${theme.colors.grayChateau};
    }

    ${css(theme.fonts.subTitleTwo)}

    ${hasError &&
    css`
      &,
      &:focus,
      &:active {
        border-color: ${theme.colors.warn};
      }
    `}
  `}
`;

export const Placeholder = styled.div<{
  $height?: number;
}>`
  ${({ theme, $height }) => css`
    min-height: ${$height ?? theme.common.defaultTextAreaHeight}rem;
    border-radius: ${theme.common.inputBorderRadius};
    transition: all 0.3s;
    padding: 1rem 1.5rem;
    color: ${theme.colors.greyThree};
    ${css(theme.fonts.body4)}
    &:hover {
      box-shadow: 0 0 0 1px ${theme.colors.geyser};
    }
  `}
`;

export const ErrorMessage = styled(Typography).attrs({
  variant: 'caption',
  color: 'warn'
})``;
