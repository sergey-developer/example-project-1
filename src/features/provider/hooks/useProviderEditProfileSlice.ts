import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  insuranceWithSubdivisionsReducer,
  name as insurancesReducerName,
  insurancesWithSubdivisionsRootSaga
} from 'state/ducks/insuranceWithSubdivisions';
import {
  providerEditProfileReducer,
  name as providerEditProfileReducerName,
  providerEditProfileRootSaga
} from 'state/ducks/providerEditProfile';
import {
  specialtiesWithTaxonomyReducer,
  name as specialtiesWithTaxonomyReducerName,
  specialtiesWithTaxonomyRootSaga
} from 'state/ducks/specialtyWithTaxonomy';

export const useProviderEditProfileSlice = () => {
  useInjectSaga({
    key: providerEditProfileReducerName,
    saga: providerEditProfileRootSaga
  });
  useInjectSaga({
    key: insurancesReducerName,
    saga: insurancesWithSubdivisionsRootSaga
  });
  useInjectSaga({
    key: specialtiesWithTaxonomyReducerName,
    saga: specialtiesWithTaxonomyRootSaga
  });

  useInjectReducer({
    key: providerEditProfileReducerName,
    reducer: providerEditProfileReducer
  });
  useInjectReducer({
    key: insurancesReducerName,
    reducer: insuranceWithSubdivisionsReducer
  });
  useInjectReducer({
    key: specialtiesWithTaxonomyReducerName,
    reducer: specialtiesWithTaxonomyReducer
  });
};
