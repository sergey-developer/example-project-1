import React, { forwardRef } from 'react';
import { NonceProvider } from 'react-select';
import styled, { css } from 'styled-components/macro';

import { shadeColor } from 'shared/utils/styles';

type BaseButtonTypes = keyof typeof variants;

type BaseButtonSize = 'small' | 'normal';
interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant?: BaseButtonTypes;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  spaceRight?: number;
  spaceBottom?: number;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  $size?: BaseButtonSize;
  displayNode?: boolean;
}

const variants = {
  default: css`
    ${({ theme }) => css`
      background: ${theme.colors.glacier};
      color: ${theme.colors.white};
      &:hover {
        background: ${shadeColor(theme.colors.glacier, 10)};
      }
      &:active {
        background: ${shadeColor(theme.colors.glacier, -10)};
      }
      &:disabled,
      &[disabled='disabled'] {
        background-color: ${theme.colors.periwinkleGrayTwo};
        color: ${theme.colors.white};
      }
    `}
  `,
  primary: css`
    ${({ theme }) => css`
      background: ${theme.colors.lightGreen};
      color: ${theme.colors.white};
      &:hover {
        background: ${shadeColor(theme.colors.lightGreen, 10)};
      }
      &:active {
        background: ${shadeColor(theme.colors.lightGreen, -10)};
      }
      &:disabled,
      &[disabled='disabled'] {
        background-color: ${theme.colors.jaggedIce};
        color: ${theme.colors.white};
      }
    `}
  `,
  light: css`
    ${({ theme }) => css`
      background: ${theme.colors.catskillWhite};
      color: ${theme.colors.waikawaGray};
      &:hover {
        background: ${shadeColor(theme.colors.catskillWhite, 5)};
      }
      &:active {
        background: ${shadeColor(theme.colors.catskillWhite, -10)};
      }
    `}
  `,
  round: css`
    ${({ theme }) => css`
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 50%;
      padding: 0;
      background-color: ${theme.colors.greyFive};
    `}
  `,
  roundMedium: css`
    ${({ theme }) => css`
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      padding: 0;
      background-color: ${theme.colors.glacier};
    `}
  `,

  additional: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.whiteLilacTwo};
      color: ${theme.colors.danube};
      ${css(theme.fonts.h5)}
      &:hover {
        background-color: ${theme.colors.danube};
        color: ${theme.colors.whiteLilacTwo};
      }
      &:active {
        background-color: ${theme.colors.sanMarino};
        color: ${theme.colors.white};
      }
      &:disabled,
      &[disabled='disabled'] {
        background-color: ${theme.colors.linkWater};
        color: ${theme.colors.spindle};
      }
    `}
  `,
  secondary: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.danube};
      color: ${theme.colors.white};
      &:hover {
        background-color: ${theme.colors.jordyBlue};
        color: ${theme.colors.white};
      }
      &:active {
        background-color: ${theme.colors.sanMarino};
        color: ${theme.colors.white};
      }
      &:disabled,
      &[disabled='disabled'] {
        background-color: ${theme.colors.periwinkleGrayTwo};
        color: ${theme.colors.white};
      }
    `}
  `,
  label: css`
    ${({ theme }) => css`
      color: ${theme.colors.glacier};
      text-decoration: underline;
    `}
  `,
  warn: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.warn};
      color: ${theme.colors.white};
      &:hover {
        background: ${shadeColor(theme.colors.warn, 80)};
      }
      &:active {
        background: ${shadeColor(theme.colors.warn, -10)};
      }
    `}
  `
};

export const ButtonElement = styled.button<ButtonProps>`
  ${({
    theme,
    variant,
    fullWidth,
    $size,
    spaceBottom,
    spaceRight,
    displayNode
  }) => css`
    padding: 1.2rem 2.5rem;
    border-radius: ${theme.common.inputBorderRadius};
    ${spaceBottom &&
    css`
      margin-bottom: ${spaceBottom}rem;
    `}
    ${spaceRight &&
    css`
      margin-right: ${spaceRight}rem;
    `}
    ${fullWidth &&
    css`
      width: 100%;
    `}
    transition: all 0.3s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    ${variant ? variants[variant] : variants.default}
    ${$size === 'small' &&
    css`
      padding: 0.8rem;
    `}
    ${displayNode &&
    css`
      display: none;
    `}
  `}
`;

const IconWrapper = styled.span<{
  withLabel?: boolean;
  endIcon?: boolean;
}>`
  line-height: 0;
  ${({ withLabel, endIcon }) =>
    withLabel &&
    css`
      ${endIcon ? 'margin-left: 1rem' : 'margin-right: 1rem'};
    `}
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, children, $size = 'normal', endIcon, ...rest }, ref) => {
    return (
      //@ts-ignore
      <ButtonElement $size={$size} ref={ref} {...rest}>
        {icon && <IconWrapper withLabel={!!children}>{icon}</IconWrapper>}
        {children && children}
        {endIcon && (
          <IconWrapper withLabel={!!children} endIcon>
            {endIcon}
          </IconWrapper>
        )}
      </ButtonElement>
    );
  }
);
