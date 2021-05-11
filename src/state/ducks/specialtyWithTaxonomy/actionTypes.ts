import { PayloadAction } from '@reduxjs/toolkit';

import { SpecialtyWithTaxonomyRecordDto } from 'shared/types/dto/SpecialtyWithTaxonomyRecordDto';

export type GetSpecialtiesByIdsPayload = {
  categoryId: number;
};

export type GetSpecialtiesByIdsAction = PayloadAction<GetSpecialtiesByIdsPayload>;

export type GetSpecialtiesSuccessPayload = {
  specialties: SpecialtyWithTaxonomyRecordDto[];
};

export type GetSpecialtiesSuccessAction = PayloadAction<GetSpecialtiesSuccessPayload>;

export type GetSpecialtiesErrorPayload = {
  error: string;
};

export type GetSpecialtiesErrorAction = PayloadAction<GetSpecialtiesErrorPayload>;
