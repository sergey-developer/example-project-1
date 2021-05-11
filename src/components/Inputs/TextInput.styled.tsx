import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';
import { ColorType, VariantTypography } from 'styles/theme';

export type TextInputSize = 'small' | 'medium' | 'tiny';

export const Wrapper = styled.div<{ $spaceBottom?: number }>`
  ${({ theme, $spaceBottom }) => css`
    width: 100%;
    border-radius: ${theme.common.inputBorderRadius};
    transition: all 0.3s;
    position: relative;
    margin-bottom: ${$spaceBottom || 0}rem;
  `}
`;

export const Input = styled.input<{
  $size: TextInputSize;
  $color?: ColorType;
  $optionOpen?: boolean;
  withIcon?: boolean;
  hasError?: boolean;
}>`
  ${({ theme, $size, $color, $optionOpen, withIcon, hasError }) => css`
    width: 100%;
    height: 4.6rem;
    padding: 0 1.5rem;
    border: 1px solid ${theme.colors.grayChateau};
    border-radius: ${theme.common.inputBorderRadius};
    outline: none;
    ${$optionOpen &&
    css`
      border-bottom-left-radius: 0rem;
      border-bottom-right-radius: 0rem;
    `}
    ${$color &&
    css`
      color: ${theme.colors[$color]};
    `}

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
    ${$size === 'tiny' &&
    css`
      padding: 0.7rem 1rem;
      height: auto;
    `}
    ${withIcon &&
    css`
      padding-left: 4.5rem;
    `}
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
  $size: TextInputSize;
  $disabled?: boolean;
  $variant?: VariantTypography;
  withIcon?: boolean;
}>`
  ${({ theme, $size, $disabled, $variant = 'h6', withIcon }) => css`
    width: 100%;
    height: 4.6rem;
    display: flex;
    align-items: center;
    padding: 1.5rem;
    border: 1px solid transparent;
    border-radius: ${theme.common.inputBorderRadius};
    white-space: nowrap;
    overflow: hidden;
    &:hover {
      border: 1px solid ${theme.colors.grayChateau};
    }
    text-overflow: ellipsis;

    ${css(theme.fonts[$variant])}

    ${$size === 'small' &&
    css`
      height: 4rem;
      padding: 1.1rem 1.5rem;
    `}

    ${$size === 'tiny' &&
    css`
      padding: 0.7rem 1.2rem;
      height: auto;
    `}
    
    ${$disabled &&
    css`
      background: ${theme.colors.wildSand};
      color: ${theme.colors.hitGray};

      &:hover {
        border: 1px solid transparent;
      }
    `}

    ${withIcon &&
    css`
      padding-left: 4.5rem;
    `}
  `}
`;

export const AutoCompleteList = styled.ul`
  ${({ theme }) => css`
    position: absolute;
    z-index: 3;
    list-style: none;
    background: gray;
    width: 100%;
    max-height: 30rem;
    overflow-y: scroll;
    box-shadow: 0rem 0.6rem 1.2rem ${theme.colors.greySeven};
    border-radius: 0rem 0rem 0.5rem 0.5rem;
  `}
`;

export const AutoCompleteItem = styled(Typography).attrs({
  as: 'li',
  variant: 'subTitleTwo'
})`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    padding: 1.2rem 1.5rem;
    background-color: ${theme.colors.white};
    transition: all 0.1s;
    cursor: pointer;
    &:hover {
      background-color: ${theme.colors.iron};
    }
  `}
`;

export const IconContainer = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ position }) => (position === 'left' ? 'left: 0' : 'right: 0')};

  display: flex;
  align-items: center;
  justify-content: center;

  width: 4.5rem;
`;

export const ErrorMessage = styled.div`
  /* position: absolute; */
  /* bottom: -1.7rem;
  left: 0; */
`;
