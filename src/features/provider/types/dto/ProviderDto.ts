import { Nullable } from 'shared/types';

import { ProviderProfileLookupItemDto } from './ProviderProfileDto';

type ProviderStatus = 1 | 2 | 3 | 4;

export type ProviderDto = {
  id: string;
  name: Nullable<string>;
  categoryId: number;
  version: number;
  activeProfileId: Nullable<string>;
  createdUtc: string;
  createdBy: Nullable<string>;
  updatedUtc: string;
  updatedBy: Nullable<string>;
  status: ProviderStatus;
  batchId: Nullable<string>;
  regionId: Nullable<string>;
  externalId: Nullable<string>;
  profiles: Nullable<ProviderProfileLookupItemDto[]>;
  isOwnerExists: boolean;
};
