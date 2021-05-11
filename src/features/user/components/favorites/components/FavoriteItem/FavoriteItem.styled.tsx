import styled, { css } from 'styled-components/macro';

import { ReactComponent as DoneIcon } from 'assets/icons/DoneIcon.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/HeartIcon.svg';
import { ReactComponent as StarIcon } from 'assets/icons/StarIcon.svg';
import { Button } from 'components/Buttons';
import { CheckBox } from 'components/CheckBox';
import { Typography } from 'components/Typography';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 2.1rem 1.5rem 2.9rem;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 2px 24px rgba(0, 0, 0, 0.08);
    border-radius: 0.8rem;
    margin-top: 4.2rem;
    position: relative;
  `}
`;

export const DeleteCheckBox = styled(CheckBox)`
  position: absolute;
  top: -3rem;
  left: 50%;
  transform: translateX(-50%);
  & > label:before {
    ${({ theme }) => css`
      border-color: ${theme.colors.warn};
    `}
  }
`;

export const Header = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  margin-right: 1rem;
`;

export const FavoriteBtn = styled(Button).attrs({
  icon: <HeartIcon />,
  variant: 'round'
})`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.08);
    position: absolute;
    top: -1.3rem;
    left: -0.7rem;
  `}
`;

export const AvatarImage = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
`;

export const NameWrapper = styled.div`
  margin-right: auto;
  display: inline-flex;
  flex-direction: column;
`;

export const Name = styled(Typography).attrs({
  variant: 'body'
})``;

export const AcceptPatientsLabel = styled(Typography).attrs({
  leftIcon: <DoneIcon width='1.8rem' height='1.8rem' />,
  variant: 'hint'
})`
  margin-top: auto;
  & > div {
    margin-left: 0.5rem;
  }
`;

export const RateWrapper = styled.div`
  margin-left: 0.5rem;
  flex-shrink: 0;
`;

export const RateIcon = styled(StarIcon).attrs(({ theme }) => ({
  width: '1.8rem',
  height: '1.8rem',
  fill: theme.colors.warn
}))`
  margin-right: 0.3rem;
`;

export const BodyContainer = styled.div``;

export const CategoryLabel = styled(Typography)`
  margin-bottom: 0.8rem;
`;

export const Description = styled(Typography).attrs({
  variant: 'caption',
  color: 'lynch'
})`
  line-height: 1.8rem;
  margin-bottom: 1.6rem;
`;

export const SpeakLang = styled(Typography).attrs({
  color: 'lynch'
})``;
