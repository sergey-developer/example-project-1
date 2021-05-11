import styled, { css } from 'styled-components/macro';

import mediaQueries from 'styles/media-queries';

import BaseLanguageSelect from '../../Select/LanguageSelect';
import { HeaderNavigation } from '../HeaderNavigation';
import { UserNav } from '../UserNav';

export const Wrapper = styled.header``;

export const HeaderContainer = styled.div`
  ${({ theme }) => css`
    /* height: ${theme.common.headerHeight}; */
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0.8rem 2rem;

    box-shadow: 0 0.4rem 0.4rem #e6ebf0;

    & .full-logo,
    & .desktop-navigation {
      display: none;
    }

    & .burger-button {
      margin-right: 1.5rem;
    }

    ${mediaQueries.greaterThan('md')`
      & .desktop-navigation {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      & .compact-logo, & .burger-button {
        display: none;
      }
      
      & .full-logo {
        display: block;
      }
    `}
  `}
`;

export const HeaderLeftPart = styled.div`
  display: flex;
  align-items: center;

  ${mediaQueries.greaterThan('md')`
    margin-right: 3rem;
  `}

  ${mediaQueries.greaterThan('lg')`
    margin-right: 5rem;
  `}
`;

export const HeaderMiddlePart = styled.div`
  display: flex;
  align-items: center;
  flex: 4;

  margin-right: 3rem;

  ${mediaQueries.lessThan('lg')`
    margin-right: 1.5rem;
  `}
`;

export const LanguageSelect = styled(BaseLanguageSelect)`
  display: none;
  margin-right: 1.6rem;

  ${mediaQueries.greaterThan('lg')`
    margin-right: 3.2rem;
  `}

  ${mediaQueries.greaterThan('md')`
    display: block;
  `}
`;

export const HeaderRightPart = styled.div`
  display: flex;
  align-items: center;
`;

export const LinkStyled = styled.a``;

export const UserNavStyled = styled(UserNav)`
  margin-right: 2rem;
`;

export const MobileNavigation = styled(HeaderNavigation)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 1.7rem 1rem 0;

  ${mediaQueries.greaterThan('md')`
    display: none;
  `}
`;
