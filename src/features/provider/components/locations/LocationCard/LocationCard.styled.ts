import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

export const Container = styled.div`
  width: 100%;
  max-width: 81.5rem;
  min-height: 7.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 2rem 2.8rem 2.5rem 2.8rem;

  border: 1px solid #f4f4f4;
  border-radius: 0.8rem;

  background: white;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.08), 0 0.2rem 2.4rem rgba(0, 0, 0, 0.08);

  &:not(:first-child) {
    margin-top: 1.5rem;
  }
`;

export const CardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  margin-bottom: 1rem;

  ${mediaQueries.lessThan('sm')`
    flex-flow: column-reverse;
    align-items: flex-start;
  `}
`;

export const CardTitle = styled.div`
  max-width: 35rem;
  margin-right: 1.5rem;
`;

export const HeaderMetaItem = styled.div`
  &:not(:first-child) {
    margin-left: 2.5rem;

    ${mediaQueries.lessThan('sm')`
      margin-left: 0;
      margin-top: 1.5rem;
    `}
  }
`;

export const HeaderMetaItems = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;

  ${mediaQueries.lessThan('sm')`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export const HeaderMeta = styled.div`
  display: flex;
  align-items: center;

  padding-right: 3rem;

  ${mediaQueries.lessThan('sm')`
    width: 100%;
    justify-content: space-between;
    margin-bottom: 1.2rem;
  `}
`;

export const CardBody = styled.div``;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 1.5rem;
`;

export const Address = styled(Typography)`
  margin-bottom: 0.7rem;
`;

export const AddressNote = styled(Typography)`
  font-size: 1.2rem;
`;

export const Languages = styled.div`
  display: flex;
  align-items: center;
`;

export const LanguageItems = styled.div`
  display: flex;
  margin-left: 1rem;
`;

export const LanguageItem = styled(Typography)`
  ${({ theme }) => css`
    background: ${theme.colors.catskillWhite};
    border-radius: 10rem;
    padding: 0.3rem 1rem;

    &:not(:last-child) {
      margin-right: 0.3rem;
    }
  `}
`;

export const Details = styled.div`
  display: flex;
  margin-top: 2rem;

  ${mediaQueries.lessThan('sm')`
    flex-direction: column;
  `}
`;

export const DetailsItem = styled.div`
  display: flex;
  flex-direction: column;

  border-right: 1px solid #d1daee;

  padding: 0 4rem;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
    border-right: 0;
  }

  ${mediaQueries.lessThan('lg')`
    padding: 0 2.5rem;
  `}

  ${mediaQueries.lessThan('sm')`
    padding: 1.5rem 0;
    
    border-right: 0;
    border-bottom: 1px solid #d1daee;
    
    &:first-child {
      padding-top: 0;
    }
    
    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }
  `}
`;

export const Detail = styled.div<{ $width?: number; $spacing?: 'sm' | 'md' }>`
  ${({ $width, $spacing = 'md' }) => css`
    ${$width && `width: ${$width}rem;`}

    display: flex;
    flex-flow: row wrap;
    align-items: center;

    &:not(:first-child) {
      margin-top: ${$spacing === 'md' ? '1.5' : '1'}rem;
    }
  `}
`;

export const DetailLabel = styled.span`
  display: flex;
  min-width: 7.5rem;
`;

export const SocialLink = styled.a`
  display: flex;

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  margin-top: 1.5rem;
`;

export const ShowContacts = styled(Typography)`
  font-weight: 400;
  line-height: unset;
  cursor: pointer;
`;
