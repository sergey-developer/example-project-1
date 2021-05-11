import { Nullable } from '../../common';

export type SelectedInsuranceModel = {
  insuranceId: Nullable<string>;
  subdivisionId: Nullable<string>;
  insuranceName?: Nullable<string>;
  subdivisionName?: Nullable<string>;
};
