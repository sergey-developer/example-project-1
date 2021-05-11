import { Nullable } from '../../common';
import { SpecialtyStatusDto } from '../../dto/SpecialtyDto';

export type Specialty = {
  id: number;
  text: Nullable<string>;
  status: SpecialtyStatusDto;
  categoryId: number;
};
