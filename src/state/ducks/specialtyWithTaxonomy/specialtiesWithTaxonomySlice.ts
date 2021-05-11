import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus, Nullable } from 'shared/types';
import { SpecialtyWithTaxonomyRecord } from 'shared/types/model/specialty/SpecialtyWithTaxonomyRecord';

import {
  GetSpecialtiesByIdsAction,
  GetSpecialtiesErrorAction,
  GetSpecialtiesSuccessAction
} from './actionTypes';

export type SpecialtiesWithTaxonomyState = {
  data: SpecialtyWithTaxonomyRecord[];
  loading: LoadingStatus;
  error: Nullable<string>;
};

const specialtiesWithTaxonomyInitialState: SpecialtiesWithTaxonomyState = {
  data: [],
  loading: 'idle',
  error: null
};

const specialtiesWithTaxonomySlice = createSlice({
  name: 'specialtiesWithTaxonomy',
  initialState: specialtiesWithTaxonomyInitialState,
  reducers: {
    getSpecialtiesByCategoryIdRequest(state, actions: GetSpecialtiesByIdsAction) {
      state.loading = 'pending';
    },
    getSpecialtiesSuccess(state, action: GetSpecialtiesSuccessAction) {
      state.data = action.payload.specialties;
      state.loading = 'finished';
    },
    getSpecialtiesError(state, action: GetSpecialtiesErrorAction) {
      state.error = action.payload.error;
      state.loading = 'finished';
    }
  }
});

export const { name } = specialtiesWithTaxonomySlice;

export const {
  getSpecialtiesByCategoryIdRequest,
  getSpecialtiesSuccess,
  getSpecialtiesError
} = specialtiesWithTaxonomySlice.actions;

export default specialtiesWithTaxonomySlice.reducer;
