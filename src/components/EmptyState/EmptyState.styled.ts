import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > :not(:last-child) {
    margin-bottom: 2.8rem;
  }
`;
