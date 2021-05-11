import { Nullable } from 'shared/types';

import { UserInsuranceDto } from './UserInsuranceDto';

export type UserPersonalInfoDto = Readonly<{
  fullName: Nullable<string>;
  zipCode: Nullable<string>;
  country: Nullable<string>;
  avatarUrl: Nullable<string>;
  dateOfBirth: Nullable<string>;
  insurances: Nullable<UserInsuranceDto[]>;
  email: Nullable<string>;
  phone: Nullable<string>;
}>;
