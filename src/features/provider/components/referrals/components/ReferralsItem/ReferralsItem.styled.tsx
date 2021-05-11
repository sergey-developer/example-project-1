import { ArrowContainer } from 'react-tiny-popover';
import styled, { css } from 'styled-components/macro';

import { ReactComponent as EllipsisCircleIcon } from 'assets/icons/EllipsisCircleIcon.svg';
import { Typography } from 'components/Typography';
import { ColorType } from 'styles/theme';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 2.4rem;
    padding-right: 6.7rem;
    position: relative;
    border: 0.1rem solid ${theme.colors.wildSand};
    border-radius: 0.8rem;
  `}
`;

export const Line = styled.div`
  display: flex;
  flex-wrap: wrap;
  &.name {
    margin-bottom: 1.2rem;
  }
`;

export const UserName = styled(Typography).attrs({
  variant: 'body'
})`
  margin-right: auto;
  line-height: 1.92rem;
`;

export const InviteStatusLabel = styled(Typography).attrs({
  tag: 'span',
  variant: 'caption'
})`
  line-height: 1.44rem;
`;

export const EmailLabel = styled(Typography).attrs({
  variant: 'subTitleTwo',
  color: 'grayChateau'
})`
  margin-right: 1.2rem;
`;

export const EmailVale = styled(Typography).attrs({
  variant: 'subTitleTwo'
})``;

export const OptionButton = styled(EllipsisCircleIcon).attrs({
  circleColor: 'greyTwo'
})`
  ${({ theme }) => css`
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    fill: ${theme.colors.greyTwo};
  `}
`;

export const ArrowMenu = styled(ArrowContainer)``;

export const MenuWrapper = styled.ul`
  ${({ theme }) => css`
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 2px 24px rgba(0, 0, 0, 0.08);
    list-style: none;
    padding: 1.5rem;
    border-radius: 5px;
    background-color: ${theme.colors.white};
  `}
`;

export const MenuItem = styled.li<{ $color?: ColorType }>`
  ${({ theme, $color }) => css`
    color: ${$color ? theme.colors[$color] : theme.colors.glacier};
    cursor: pointer;
    margin-bottom: 1.7rem;
    &:last-child {
      margin-bottom: 0;
    }
  `}
`;
