import { Nullable } from '../common';
import { AddressDto } from './AddressDto';

export type InsuranceSubdivisionDto = {
  id: Nullable<string>;
  code: number;
  name: Nullable<string>;
  regionId: Nullable<string>;
  categoryId: number;
  address: AddressDto;
  insuranceId: Nullable<string>;
};
