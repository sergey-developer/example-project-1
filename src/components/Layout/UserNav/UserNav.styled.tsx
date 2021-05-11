import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';

import { AvatarImage as BaseAvatar } from 'components/Avatar';
import { ArrowIcon } from 'components/Icons';
import mediaQueries from 'styles/media-queries';

import { Typography } from '../../Typography';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Avatar = styled(BaseAvatar)`
  margin-right: 1rem;
`;

export const OpenCloseMenuButton = styled(ArrowIcon)<{ $open?: boolean }>`
  transition: all 0.3s;
  ${({ $open }) =>
    $open &&
    css`
      transform: rotate(180deg);
    `}
`;

export const UserName = styled(Typography).attrs({
  variant: 'body3',
  color: 'glacier',
  tag: 'span'
})`
  margin-right: 1rem;
  display: none;

  ${mediaQueries.greaterThan('md')`
    display: block;
  `}
`;

export const ProfileMenuWrapper = styled.div<{ $open?: boolean }>`
  ${({ theme, $open }) => css`
    position: absolute;
    bottom: -13.4rem;
    right: -1rem;
    z-index: 4;
    min-width: 15rem;
    background-color: ${theme.colors.white};
    box-shadow: 0 2rem 3rem ${theme.colors.greyFor};
    border-radius: 0.8rem;
    transition: transform 0.26s ease;
    transform: scaleY(0);
    transform-origin: top;
    ${$open &&
    css`
      transform: scaleY(1);
    `}
  `}
`;

export const ProfileMenuList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ProfileMenuItem = styled.li`
  ${({ theme }) => css`
    border-bottom: 0.1rem solid ${theme.colors.periwinkleGray};
    &:last-child {
      border: none;
    }
  `}
`;

export const ProfileMenuLink = styled(NavLink)`
  ${({ theme }) => css`
    display: block;
    padding: 1rem 2rem;

    &.active span {
      color: ${theme.colors.warn};
    }
  `}
`;
