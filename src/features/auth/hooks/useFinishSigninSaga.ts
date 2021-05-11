import { SagaInjectionModes, useInjectSaga } from 'redux-injectors';

import { finishSigninRootSaga } from 'state/ducks/auth';

const useFinishSigninSaga = () => {
  useInjectSaga({
    key: 'finishSigninSaga',
    saga: finishSigninRootSaga,
    mode: SagaInjectionModes.RESTART_ON_REMOUNT
  });
};

export default useFinishSigninSaga;
