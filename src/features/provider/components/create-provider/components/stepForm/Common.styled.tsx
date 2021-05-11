import styled, { css } from 'styled-components/macro';

import { Button } from 'components/Buttons';
import { InputWithLabel } from 'components/InputWithLabel';
import { Typography } from 'components/Typography';
import mediaQueries from 'styles/media-queries';

export const Container = styled.div`
  width: 100%;
  padding: 2.4rem;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 2px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

export const ActionW = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 2.4rem;
`;

export const NextButton = styled(Button)`
  padding-left: 3.7rem;
  padding-right: 3.7rem;
  ${mediaQueries.lessThan('md')`
    width: 100%;
  `}
`;

export const BackButton = styled(Button).attrs({
  variant: 'additional'
})`
  margin-right: 1.2rem;
`;

export const InputLabel = styled(Typography).attrs({
  color: 'waikawaGray',
  variant: 'default',
  tag: 'label'
})`
  margin-bottom: 0.2rem;
  display: block;
  line-height: 1.6rem;
`;

export const FormTitle = styled(Typography).attrs({
  variant: 'body'
})`
  margin-bottom: 2.4rem;
`;

export const InputWithLabelStyled = styled(InputWithLabel)`
  margin-bottom: 2.4rem;
`;

export const SpecialtiesW = styled.div`
  margin-bottom: 1.6rem;
`;

export const SupportContactLabel = styled(Typography).attrs({
  variant: 'h5',
  color: 'grayChateau'
})`
  margin-top: -0.8rem;
  margin-bottom: 1.6rem;
`;

export const SupportContactLink = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.greyNine};
  `}
`;

export const SimilarWrapper = styled.div`
  padding-top: 2.4rem;
`;

export const SimilarTitle = styled(Typography).attrs({
  variant: 'h3Two'
})``;
