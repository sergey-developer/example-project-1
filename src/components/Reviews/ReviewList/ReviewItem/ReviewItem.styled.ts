import styled, { css } from 'styled-components/macro';

import { Review } from '../Review';

export const reviewItemStyles = css`
  display: flex;

  &:not(:last-child) {
    padding-bottom: 25px;
    margin-bottom: 25px;

    border-bottom: 2px solid ${({ theme }) => theme.colors.wildSand};
  }
`;

export const Container = styled.div`
  flex-direction: column;

  ${reviewItemStyles}
`;

export const RepliesContainer = styled.div`
  margin-top: 15px;
`;

export const Reply = styled(Review)`
  margin-left: 25px;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;
