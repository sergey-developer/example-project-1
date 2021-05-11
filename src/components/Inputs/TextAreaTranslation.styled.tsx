import styled from 'styled-components/macro';

import { TextAreaInput } from './TextAreaInput';

export const Wrapper = styled.div``;

export const TextArea = styled(TextAreaInput).attrs({
  height: 16.7
})`
  width: 60rem;
  margin-right: 2rem;
`;

export const Row = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  padding: 0.2rem;
`;

export const LangSelectW = styled.div`
  margin-right: 2.5rem;
  margin-top: 1.2rem;
`;
