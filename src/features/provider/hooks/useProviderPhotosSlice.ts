import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  providerEditPhotoReducer,
  providerEditPhotoRootSaga,
  name as reducerName
} from 'state/ducks/providerPhotos';

const useProviderPhotosSlice = () => {
  useInjectSaga({ key: reducerName, saga: providerEditPhotoRootSaga });

  useInjectReducer({ key: reducerName, reducer: providerEditPhotoReducer });
};

export default useProviderPhotosSlice;
