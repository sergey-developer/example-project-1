import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const RatingItem = styled.span`
  &:not(:last-child) {
    margin-right: 0.2rem;
  }
`;
