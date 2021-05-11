import { Nullable } from 'shared/types';

import { UserInsuranceModel } from './UserInsuranceModel';

export type UserPersonalInfoModel = {
  fullName: string;
  zipCode: Nullable<string>;
  country: Nullable<string>;
  avatarUrl: Nullable<string>;
  dateOfBirth: string;
  insurances: UserInsuranceModel[];
  email: string;
  phone: string;
};
