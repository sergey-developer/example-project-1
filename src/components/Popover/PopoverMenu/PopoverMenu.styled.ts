import styled from 'styled-components/macro';

export const ContentContainer = styled.div`
  //width: max-content;

  padding: 1.5rem;

  background: white;
  box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.15);

  border-radius: 5px;
`;

export const ContentItem = styled.div`
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;
