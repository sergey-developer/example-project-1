import React from 'react';
import styled, { css } from 'styled-components/macro';

import { ColorType, VariantTypography } from 'styles/theme';

export interface TypographyProps {
  variant?: VariantTypography;
  tag?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'a'
    | 'div'
    | 'li'
    | 'label';
  align?: 'left' | 'center' | 'right';
  color?: ColorType;
  spacingBottom?: number;
  spacingLeft?: number;
  cursor?: 'pointer' | 'default';
  className?: string;
  marginButton?: number;
  noWrap?: boolean;
  onClick?: (e: any) => void;
  leftIcon?: React.ReactNode;
  htmlFor?: string;
  id?: string;
}

const Container = styled.div<{ $cursor: TypographyProps['cursor'] }>`
  display: flex;
  align-items: center;

  ${({ $cursor }) => $cursor === 'pointer' && 'cursor: pointer;'}
`;

const Text = styled.p<
  Omit<TypographyProps, 'color' | 'cursor'> & {
    $color: TypographyProps['color'];
    $cursor: TypographyProps['cursor'];
    $iconPosition?: 'left' | 'right';
  }
>`
  ${({
    theme,
    variant,
    $color,
    $cursor,
    marginButton,
    noWrap,
    $iconPosition,
    spacingBottom,
    align,
    spacingLeft
  }) => css`
    ${(() => {
      const fontVariant =
        variant && theme.fonts[variant] ? theme.fonts[variant] : {};
      return css({ ...theme.fonts.default, ...fontVariant });
    })()}

    color: ${$color ? theme.colors[$color] : theme.colors.black};

    overflow: hidden;
    text-overflow: ellipsis;

    ${$iconPosition === 'left' ? 'margin-left: 1rem;' : ''}

    ${marginButton &&
    css`
      margin-bottom: ${marginButton}rem;
    `}

    ${spacingLeft &&
    css`
      margin-left: ${spacingLeft}rem;
    `}
    
    ${noWrap &&
    css`
      white-space: nowrap;
    `}
    ${spacingBottom &&
    css`
      margin-bottom: ${spacingBottom}rem;
    `}
    
    ${$cursor === 'pointer' && 'cursor: pointer;'}

    ${align &&
    css`
      text-align: ${align};
    `}
  `}
`;

export const Typography: React.FC<TypographyProps> = ({
  children,
  tag = 'div',
  color,
  leftIcon,
  cursor,
  className,
  id,
  ...props
}) => {
  const textComponent = (
    <Text
      id={id}
      as={tag}
      $color={color}
      $iconPosition={!!leftIcon ? 'left' : undefined}
      $cursor={cursor}
      className={!leftIcon ? className : ''}
      {...props}
    >
      {children}
    </Text>
  );

  if (!leftIcon) {
    return textComponent;
  }

  return (
    <Container className={className} $cursor={cursor} id={id}>
      {leftIcon}

      {textComponent}
    </Container>
  );
};
