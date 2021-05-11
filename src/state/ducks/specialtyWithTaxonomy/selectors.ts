import {
  SpecialtiesWithTaxonomyState,
  name as reducerName
} from './specialtiesWithTaxonomySlice';

export const specialtiesWithTaxonomySelector = (
  state: any
): SpecialtiesWithTaxonomyState => state[reducerName];
