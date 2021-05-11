import { Nullable } from '../common';

export type InsuranceDto = {
  id: Nullable<string>;
  code: number;
  name: Nullable<string>;
  regionId: Nullable<string>;
  categoryId: number;
  description: Nullable<string>;
  officialName: Nullable<string>;
};
