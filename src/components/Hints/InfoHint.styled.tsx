import { ArrowContainer } from 'react-tiny-popover';
import styled, { css } from 'styled-components/macro';

import { InfoIcon as Icon } from 'components/Icons';
import { Typography } from 'components/Typography';

export const Container = styled.div``;

export const InfoIcon = styled(Icon)`
  cursor: pointer;
`;

export const ArrowHintContainer = styled(ArrowContainer)``;

export const HintContainer = styled(Typography).attrs({
  tag: 'div',
  variant: 'hint'
})`
  ${({ theme }) => css`
    padding: 0.7rem;
    background-color: ${theme.colors.rollingStone};
    border-radius: 0.3rem;
    color: ${theme.colors.white};
  `}
`;
