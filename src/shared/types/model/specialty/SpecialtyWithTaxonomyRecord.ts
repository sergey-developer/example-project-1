import { Nullable } from '../../common';

export type DirectoryRecordStatus = 0 | 1 | 2 | 3;

export type SpecialtyWithTaxonomyRecord = {
  id: number;
  text: Nullable<string>;
  status: DirectoryRecordStatus;
  categoryId: number;
  taxonomyCodes: Nullable<string[]>;
};
