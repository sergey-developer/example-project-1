import { Nullable } from '../common';

export type Address = {
  address1: Nullable<string>;
  address2: Nullable<string>;
  city: Nullable<string>;
  state: Nullable<string>;
  zipCode: Nullable<string>;
  zipCodeFull: Nullable<string>;
  country: Nullable<string>;
};
