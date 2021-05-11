import styled, { css } from 'styled-components/macro';

import { Button } from 'components/Buttons';
import { Typography } from 'components/Typography';

export const ServiceList = styled.ul`
  list-style: none;
  margin-bottom: 0.8rem;
`;

export const ServiceItem = styled.li`
  ${({ theme }) => css`
    padding-bottom: 1.6rem;
    margin-bottom: 1.6rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.1rem solid ${theme.colors.wildSand};
    &:last-child {
      margin-bottom: 0;
      border: none;
    }
  `}
`;

export const ServiceW = styled.div`
  margin-right: 2.4rem;
`;

export const ServiceAction = styled(Button).attrs({
  $size: 'small',
  variant: 'additional'
})`
  align-self: center;
`;

export const ServiceTitle = styled(Typography).attrs({
  variant: 'body'
})`
  margin-bottom: 0.4rem;
`;

export const ServiceInfo = styled(Typography).attrs({
  variant: 'subTitleTwo',
  color: 'grayChateau'
})``;
