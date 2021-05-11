import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  directoryReducer,
  name as directoryReducerName,
  directoryRootSaga
} from 'state/ducks/directory';

export const useDirectorySlice = () => {
  useInjectReducer({
    key: directoryReducerName,
    reducer: directoryReducer
  });

  useInjectSaga({
    key: directoryReducerName,
    saga: directoryRootSaga
  });
};
