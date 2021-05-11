import { InsuranceDto } from './InsuranceDto';
import { InsuranceSubdivisionDto } from './InsuranceSubdivisionDto';

export type InsuranceWithSubdivisionDto = {
  insurance: InsuranceDto;
  insuranceSubdivision: InsuranceSubdivisionDto[];
};
