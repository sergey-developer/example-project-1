import styled, { css } from 'styled-components/macro';

import { EmptyState } from 'components/EmptyState';
import Pagination from 'components/Pagination';

import ReferralsForm from './components/AddReferralsForm';

export const AddReferralsForm = styled(ReferralsForm)`
  margin-bottom: 2.4rem;
`;

export const ReferralsList = styled.ul`
  list-style: none;
`;

export const ReferralsListItem = styled.li`
  margin-bottom: 0.8rem;
  &:last-child {
    margin-bottom: none;
  }
`;

export const ReferralsEmpty = styled(EmptyState)`
  margin-top: 15vh;
`;

export const ReferralsPagination = styled(Pagination)`
  margin-top: 3rem;
`;
