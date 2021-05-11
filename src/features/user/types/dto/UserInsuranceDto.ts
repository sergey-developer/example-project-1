import { Nullable } from 'shared/types';

export type UserInsuranceDto = Readonly<{
  insuranceId: Nullable<string>;
  subdivisionId: Nullable<string>;
}>;
