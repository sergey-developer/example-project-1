import { PayloadAction } from '@reduxjs/toolkit';

import { InsuranceWithSubdivision } from 'shared/types/model/insurance';

export type GetInsurancesByCategoryIdRequestPayload = {
  categoryId: number;
};

export type GetInsurancesByCategoryIdRequestAction = PayloadAction<GetInsurancesByCategoryIdRequestPayload>;

export type GetInsurancesSuccessPayload = {
  insurances: InsuranceWithSubdivision[];
};

export type GetInsurancesSuccessAction = PayloadAction<GetInsurancesSuccessPayload>;

export type GetInsurancesErrorPayload = {
  message: string;
};

export type GetInsurancesErrorAction = PayloadAction<GetInsurancesErrorPayload>;
