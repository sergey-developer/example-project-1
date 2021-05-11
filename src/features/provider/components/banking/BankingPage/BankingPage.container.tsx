import React from 'react';
import { useSelector } from 'react-redux';

import { ProfileLegalModel } from 'features/provider/types';
import {
  providerEditProfileLegalSelector,
  updateLegalInfoRequest
} from 'state/ducks/providerEditProfile';
import { useAppDispatch } from 'state/store';

import BankingPage from './BankingPage';

interface BankingPageContainerProps {}

const BankingPageContainer: React.FC<BankingPageContainerProps> = ({}) => {
  const legalData = useSelector(providerEditProfileLegalSelector);
  const dispatch = useAppDispatch();

  const handleLegalChange = (data: ProfileLegalModel) => {
    dispatch(
      updateLegalInfoRequest({
        legal: {
          ...data
        }
      })
    );
  };

  return <BankingPage legalData={legalData} onLegalChange={handleLegalChange} />;
};

export default BankingPageContainer;
