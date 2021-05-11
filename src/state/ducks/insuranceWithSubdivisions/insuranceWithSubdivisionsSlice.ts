import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus, Nullable } from 'shared/types';
import { InsuranceWithSubdivision } from 'shared/types/model/insurance/InsuranceWithSubdivisions';

import { RootState } from '../../store';
import {
  GetInsurancesByCategoryIdRequestAction,
  GetInsurancesErrorAction,
  GetInsurancesSuccessAction
} from './actionTypes';

export type InsurancesWithSubdivisionsState = {
  date: InsuranceWithSubdivision[];
  loading: LoadingStatus;
  error: Nullable<string>;
};

const insurancesWithSubdivisionsInitialState: InsurancesWithSubdivisionsState = {
  date: [],
  loading: 'idle',
  error: null
};

const insurancesWithSubdivision = createSlice({
  name: 'insurancesWithSubdivision',
  initialState: insurancesWithSubdivisionsInitialState,
  reducers: {
    getInsurancesByCategoryIdRequest(
      state,
      actions: GetInsurancesByCategoryIdRequestAction
    ) {
      state.loading = 'pending';
    },
    getInsurancesSuccess(state, action: GetInsurancesSuccessAction) {
      state.loading = 'finished';
      state.date = action.payload.insurances;
    },
    getInsurancesError(state, action: GetInsurancesErrorAction) {
      state.error = action.payload.message;
      state.loading = 'finished';
    }
  }
});

export type InsurancesWithSubdivisionsRootState = RootState &
  Record<
    'insurancesWithSubdivision',
    ReturnType<typeof insurancesWithSubdivision.reducer>
  >;

export const { name } = insurancesWithSubdivision;

export const {
  getInsurancesByCategoryIdRequest,
  getInsurancesSuccess,
  getInsurancesError
} = insurancesWithSubdivision.actions;

export default insurancesWithSubdivision.reducer;
