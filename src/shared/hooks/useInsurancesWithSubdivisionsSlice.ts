import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  insuranceWithSubdivisionsReducer,
  name as insurancesReducerName,
  insurancesWithSubdivisionsRootSaga
} from 'state/ducks/insuranceWithSubdivisions';

const useInsurancesWithSubdivisionsSlice = () => {
  useInjectReducer({
    key: insurancesReducerName,
    reducer: insuranceWithSubdivisionsReducer
  });
  useInjectSaga({
    key: insurancesReducerName,
    saga: insurancesWithSubdivisionsRootSaga
  });
};

export default useInsurancesWithSubdivisionsSlice;
