import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';

import { SidebarIcon } from 'components/Icons';
import { Typography } from 'components/Typography';

export const Container = styled.div``;

export const SidebarNavigationList = styled.ul`
  list-style: none;
`;

export const SidebarNavigationItem = styled.li``;

export const SidebarNavigationLink = styled(NavLink)<{ soon?: boolean }>`
  ${({ theme, soon }) => css`
    display: block;
    padding: 1rem 1.2rem;
    color: ${theme.colors.glacier};
    display: flex;
    align-items: center;
    border-radius: 5px;
    transition: all 0.3s;
    position: relative;
    &:hover {
      background-color: ${theme.colors.greyEleven};
      & > .nav-label {
        color: ${theme.colors.glacier};
      }
      & > svg > path {
        fill: ${theme.colors.glacier};
      }
    }
    &.active {
      background-color: ${theme.colors.glacier};
      & > .nav-label {
        color: ${theme.colors.white};
      }
      & > svg > path {
        fill: ${theme.colors.white};
      }
    }

    ${soon &&
    css`
      && {
        background-color: ${theme.colors.whiteLilacTwo};
        & > .nav-label {
          color: ${theme.colors.grayChateau};
        }
        & > svg > path {
          fill: ${theme.colors.grayChateau};
        }
      }
    `}
  `}
`;

export const SidebarNavigationIcon = styled(SidebarIcon)`
  margin-right: 0.8rem;
`;

export const SidebarNavigationLabel = styled(Typography).attrs({
  variant: 'h5',
  color: 'glacier'
})`
  line-height: 1.68rem;
`;
