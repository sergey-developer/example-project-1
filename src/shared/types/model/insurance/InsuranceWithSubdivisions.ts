import { Insurance } from './Insurance';
import { InsuranceSubdivision } from './InsuranceSubdivision';

export type InsuranceWithSubdivision = {
  insurance: Insurance;
  insuranceSubdivision: InsuranceSubdivision[];
};
