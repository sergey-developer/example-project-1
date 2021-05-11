import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  getProviderByIdSaga,
  providerReducer,
  name as providerReducerName
} from 'state/ducks/provider';

const useProviderSlice = () => {
  useInjectSaga({ key: providerReducerName, saga: getProviderByIdSaga });
  useInjectReducer({ key: providerReducerName, reducer: providerReducer });
};

export default useProviderSlice;
