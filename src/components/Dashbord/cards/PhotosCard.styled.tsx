import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';

export const PhotosList = styled.div`
  display: flex;
  margin-bottom: 2.4rem;
`;

export const PhotoItem = styled.div`
  width: 20%;
  position: relative;
  border-radius: 0.4rem;
  margin-right: 1.2rem;
  &:last-child {
    margin-right: 0;
  }
  &:after {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

export const Image = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const PhotoInfo = styled.div`
  ${({ theme }) => css`
    position: absolute;
    border-radius: 0.4rem;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: ${theme.colors.greyThree};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `}
`;

export const PhotoCount = styled(Typography).attrs({
  color: 'white'
})`
  font-size: clamp(2.4rem, 1.9775rem + 1.1268vw, 3.6rem);
  line-height: clamp(2.4rem, 1.9775rem + 1.1268vw, 3.6rem);
`;

export const PhotoLabel = styled(Typography).attrs({
  color: 'white'
})``;

export const EmptyTitle = styled(Typography).attrs({
  variant: 'h5'
})`
  margin-bottom: 0.8rem;
`;

export const EmptyAdvice = styled(Typography).attrs({
  variant: 'body4',
  color: 'grayChateau'
})`
  margin-bottom: 2.4rem;
`;
