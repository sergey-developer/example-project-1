import styled, { css } from 'styled-components/macro';

import { Button } from 'components/Buttons';
import { Typography } from 'components/Typography';

import { ProfileCover } from './components/ProfileCover/ProfileCover';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const ProfileEditButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

export const ProfileCoverStyle = styled(ProfileCover)`
  margin-bottom: 3.5rem;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem 0;
`;

export const CellLabel = styled.div<{
  $center?: boolean;
}>`
  ${({ theme, $center }) => css`
    width: 20%;
    padding-top: 1.4rem;
    ${$center &&
    css`
      display: flex;
      align-items: center;
      padding-top: 0;
    `}
  `}
`;

export const LabelText = styled(Typography).attrs({
  variant: 'h6'
})``;

export const SectionTitle = styled(Typography).attrs({
  variant: 'h3'
})`
  ${({ theme }) => css`
    color: ${theme.colors.greyThree};
  `}
`;
export const CellInputName = styled.div`
  width: 100%;
  max-width: 47%;
`;

export const CellMaxWidth = styled.div`
  width: 100%;
  max-width: 80rem;
`;

export const CellCategoryInput = styled.div`
  width: 100%;
  max-width: 30rem;
`;
