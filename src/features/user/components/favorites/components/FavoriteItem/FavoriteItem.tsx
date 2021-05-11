import React from 'react';

import { CheckBox } from 'components/CheckBox';
import { Typography } from 'components/Typography';

import {
  AcceptPatientsLabel,
  AvatarImage,
  AvatarWrapper,
  BodyContainer,
  CategoryLabel,
  Container,
  DeleteCheckBox,
  Description,
  FavoriteBtn,
  Header,
  Name,
  NameWrapper,
  RateIcon,
  RateWrapper,
  SpeakLang
} from './FavoriteItem.styled';

interface FavoriteItemProps {
  className?: string;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ className }) => {
  return (
    <Container className={className}>
      <DeleteCheckBox />
      <Header>
        <AvatarWrapper>
          <FavoriteBtn />
          <AvatarImage src='http://placekitten.com/g/200/200' />
        </AvatarWrapper>
        <NameWrapper>
          <Name spacingBottom={1}>Dr. name</Name>

          <AcceptPatientsLabel>Accepting new patients</AcceptPatientsLabel>
        </NameWrapper>
        <RateWrapper>
          <RateIcon />
          <Typography tag='span' color='greyThree'>
            5.0
          </Typography>
          <Typography tag='span' spacingLeft={0.6} color='glacier'>
            (27)
          </Typography>
        </RateWrapper>
      </Header>
      <BodyContainer>
        <CategoryLabel>Health Care</CategoryLabel>
        <Description>
          Dentistry, also known as dental medicine and oral medicine, is a branch of
          medicine that consists of the study.
        </Description>
        <SpeakLang>We speak: English, Spanish,</SpeakLang>
      </BodyContainer>
    </Container>
  );
};

export default FavoriteItem;
