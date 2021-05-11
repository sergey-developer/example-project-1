import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  name as personalInfoReducerName,
  userPersonalInfoReducer,
  userPersonalInfoRootSaga
} from 'state/ducks/userPersonalInfo';

const useUserPersonalInfoSlice = () => {
  useInjectReducer({
    key: personalInfoReducerName,
    reducer: userPersonalInfoReducer
  });
  useInjectSaga({
    key: personalInfoReducerName,
    saga: userPersonalInfoRootSaga
  });
};

export default useUserPersonalInfoSlice;
