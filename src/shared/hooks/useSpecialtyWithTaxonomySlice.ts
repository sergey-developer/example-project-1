import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  specialtiesWithTaxonomyReducer,
  name as specialtiesWithTaxonomyReducerName,
  specialtiesWithTaxonomyRootSaga
} from 'state/ducks/specialtyWithTaxonomy';

const useSpecialtyWithTaxonomySlice = () => {
  useInjectSaga({
    key: specialtiesWithTaxonomyReducerName,
    saga: specialtiesWithTaxonomyRootSaga
  });
  useInjectReducer({
    key: specialtiesWithTaxonomyReducerName,
    reducer: specialtiesWithTaxonomyReducer
  });
};

export default useSpecialtyWithTaxonomySlice;
