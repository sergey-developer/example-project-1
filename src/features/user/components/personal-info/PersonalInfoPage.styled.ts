import styled from 'styled-components/macro';

import { AvatarEditable } from 'components/Avatar';
import mediaQueries from 'styles/media-queries';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${mediaQueries.lessThan('sm')`
    flex-direction: column;
    align-items: center;
  `}
`;

export const Avatar = styled(AvatarEditable)`
  min-width: 180px;
  margin-bottom: 2rem;
`;

export const ContentContainer = styled.div`
  width: 100%;
  margin-left: 4rem;

  ${mediaQueries.lessThan('sm')`
    margin-left: 0;
  `}
`;

export const Row = styled.div<{ $marginBottom?: number }>`
  display: flex;
  ${({ $marginBottom }) => `
    margin-bottom: ${$marginBottom}rem;  
  `}
`;

export const InfoLabel = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
`;

export const InfoValue = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : '29%')};

  ${mediaQueries.lessThan('md')`
    width: 70%;
  `}

  ${mediaQueries.between('md', 'lg')`
    width: 60%;
  `}
`;
