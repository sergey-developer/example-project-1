import { HashLink as Link } from 'react-router-hash-link';
import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/Typography';
import { EditProviderStatusEnum } from 'features/provider/types';

export const Container = styled.div<{ status?: EditProviderStatusEnum }>`
  ${({ theme, status }) => css`
    background-color: ${theme.colors.wildSand};
    ${status === EditProviderStatusEnum.UpdateInProgress &&
    css`
      background-color: ${theme.colors.serenade};
    `}
  `}
`;

export const PublicActionWrapper = styled.div`
  ${({ theme }) => css`
    height: 5rem;
    display: flex;
    align-items: center;
    padding: 0 3rem;
    justify-content: space-between;
  `}
`;

export const PublicActionMessage = styled(Typography).attrs({
  color: 'greySix',
  variant: 'subTitleTwo'
})``;

export const PublicActionBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  & .publish-btn {
    margin-left: 2rem;
  }
`;

export const Label = styled.div`
  ${({ theme }) => css`
    margin-right: 1rem;
    background-color: ${theme.colors.sunshade};
    padding: 0.4rem 0.8rem;
    border-radius: 5rem;
    color: ${theme.colors.white};
    margin-left: auto;
    ${css(theme.fonts.subTitleTwo)}
  `}
`;

export const ErrorWrapper = styled.div`
  padding: 1rem 2rem;
`;

export const ErrorTitle = styled(Typography).attrs({
  variant: 'body'
})`
  margin-bottom: 1.2rem;
`;

export const ErrorList = styled.ul`
  padding-left: 2rem;
`;

export const ErrorItem = styled.li``;

export const ErrorLabel = styled(Typography).attrs({
  tag: 'span',
  variant: 'subTitleTwo'
})``;

export const LinkStyled = styled(Link)`
  ${({ theme }) => css`
    ${css(theme.fonts.subTitleTwo)}
    color: ${theme.colors.glacier}
  `}
`;
