import styled from 'styled-components/macro';

import mediaQueries from '../../../styles/media-queries';
import { TextInput } from '../../Inputs';

export const Input = styled(TextInput).attrs({ variant: 'subTitleTwo' })`
  max-width: 30rem;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 3rem;

  & > :not(:last-child) {
    margin-right: 2.5rem;
  }

  ${mediaQueries.lessThan('sm')`
    flex-direction: column;
    
    & > .reviews-toolbar__select-sort {
      width: 100%;
    }
    
    ${Input} {
      max-width: unset;
      
      margin-right: 0;
      margin-bottom: 1.5rem;
    }
  `}
`;
