import { Nullable } from 'shared/types';

import { UserInsuranceModel } from './UserInsuranceModel';

export type EditUserPersonalInfoModel = Partial<{
  fullName: string;
  zipCode: Nullable<string>;
  country: Nullable<string>;
  avatarUrl: Nullable<string>;
  dateOfBirth: string;
  insurances: UserInsuranceModel[];
  email: string;
  phone: string;
  password: string;
  oldPassword: string;
}>;
