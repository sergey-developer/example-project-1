import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  getProviderLocationsRootSaga,
  providerLocationsReducer,
  reducerName
} from 'state/ducks/providerLocations';

const useProviderLocationsSlice = () => {
  useInjectSaga({ key: reducerName, saga: getProviderLocationsRootSaga });
  useInjectReducer({ key: reducerName, reducer: providerLocationsReducer });
};

export default useProviderLocationsSlice;
