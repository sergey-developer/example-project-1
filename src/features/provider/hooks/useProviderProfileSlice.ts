import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  getProviderProfileSaga,
  providerProfileReducer,
  name as reducerName
} from 'state/ducks/providerProfile';

const useProviderProfileSlice = () => {
  useInjectSaga({ key: reducerName, saga: getProviderProfileSaga });
  useInjectReducer({ key: reducerName, reducer: providerProfileReducer });
};

export default useProviderProfileSlice;
