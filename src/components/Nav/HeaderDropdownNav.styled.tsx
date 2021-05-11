import { NavLink as Link } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';

import { ArrowIcon } from 'components/Icons';
import mediaQueries from 'styles/media-queries';

import { HeaderDropdownNavProps } from './HeaderDropdownNav';

export const Container = styled.li`
  position: relative;
`;

export const NavWrapper = styled.div<{ $open: boolean }>`
  ${({ theme, $open }) => css`
    position: absolute;
    z-index: 5;
    left: -1rem;
    top: 4rem;
    width: 24.8rem;
    background-color: ${theme.colors.white};
    box-shadow: 0 20px 30px ${theme.colors.greyFor};
    border-radius: 0 0 5px 5px;
    transition: transform 0.26s ease;
    transform: scaleY(0);
    transform-origin: top;
    ${$open &&
    css`
      transform: scaleY(1);
    `}
  `}
`;

export const NavList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const NavItem = styled.li`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 3.9rem;
    border-bottom: 1px solid ${theme.colors.periwinkleGray};

    &:last-child {
      border: none;
    }
  `}
`;

export const NavLink = styled(Link)`
  padding: 1rem 2rem;
  display: block;

  &.active > span {
    ${({ theme }) => css`
      color: ${theme.colors.warn};
    `}
  }
`;

export const CreateNewLink = styled.div`
  ${({ theme }) => css`
    padding: 1rem 2rem;
    cursor: pointer;
    background-color: ${theme.colors.lightGreen};
  `}
`;

export const ToggleMenuButton = styled(ArrowIcon).attrs<
  Pick<HeaderDropdownNavProps, 'isActive'>
>(({ isActive }) => ({
  size: 'small',
  color: isActive ? 'warn' : 'glacier'
}))<Pick<HeaderDropdownNavProps, 'isActive'> & { $open?: boolean }>`
  transition: all 0.3s;
  margin-left: 0.6rem;

  ${({ $open }) =>
    $open &&
    css`
      transform: rotate(180deg);
    `}
`;

export const ItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const TextWrapper = styled.span<Pick<HeaderDropdownNavProps, 'isActive'>>`
  ${({ theme, isActive }) => css`
    ${isActive
      ? css`
          & span {
            color: ${theme.colors.warn};
          }

          &:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 0.3rem;
            background-color: ${theme.colors.warn};
            bottom: -1.2rem;
            ${mediaQueries.greaterThan('md')`
              bottom: -1.7rem;
            `}
          }
        `
      : ''}
  `}
`;
