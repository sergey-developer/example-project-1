import { Nullable } from '../../common';
import { Address } from '../Address';

export type InsuranceSubdivision = {
  id: Nullable<string>;
  code: number;
  name: Nullable<string>;
  regionId: Nullable<string>;
  categoryId: number;
  address: Address;
  insuranceId: Nullable<string>;
};
