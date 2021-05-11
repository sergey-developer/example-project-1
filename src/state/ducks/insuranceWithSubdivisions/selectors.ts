import {
  InsurancesWithSubdivisionsRootState,
  InsurancesWithSubdivisionsState,
  name as reducerName
} from './insuranceWithSubdivisionsSlice';

const insurancesWithSubdivisionsStateSelector = (
  state: InsurancesWithSubdivisionsRootState
): InsurancesWithSubdivisionsState => state[reducerName];

export { insurancesWithSubdivisionsStateSelector };
