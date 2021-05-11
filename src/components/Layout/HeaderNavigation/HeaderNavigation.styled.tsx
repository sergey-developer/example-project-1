import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';

export const Container = styled.nav``;

export const NavigationList = styled.ul`
  display: flex;
  align-items: center;

  margin: 0;
  padding: 1.5rem 1.8rem 1rem 1.8rem;

  list-style: none;
`;

export const NavigationItem = styled.li`
  margin-right: 2.6rem;
`;

export const NavigationLink = styled(NavLink)<{ $mod?: boolean }>`
  ${({ theme, $mod }) => css`
    display: block;
    font-size: 1.4rem;
    line-height: 142%;
    padding-bottom: 0.3rem;
    position: relative;

    &.active:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 0.3rem;
      background-color: ${theme.colors.warn};
      bottom: -1rem;
      ${!$mod && 'bottom: -1.4rem;'}
    }

    &.active span {
      color: ${theme.colors.warn};
    }
  `}
`;
