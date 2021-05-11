import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus, Nullable } from 'shared/types';

import {
  GetCategoryListSuccessAction,
  GetSimpleLanguagesSuccessAction
} from './actionTypes';
import { defaultData } from './defaultData';
import { DirectoryData } from './types';

export type DirectoryState = {
  data: DirectoryData;
  loading: LoadingStatus;
  error: Nullable<string>;
};

const directoryInitialState: DirectoryState = {
  data: defaultData,
  loading: 'idle',
  error: null
};

const directorySlice = createSlice({
  name: 'directory',
  initialState: directoryInitialState,
  reducers: {
    getSimpleLanguagesRequest(state) {
      state.loading = 'pending';
    },
    getSimpleLanguagesSuccess(state, action: GetSimpleLanguagesSuccessAction) {
      state.loading = 'finished';
      state.data.simpleLanguages = action.payload.simpleLanguages;
    },

    getCategoryListRequest(state) {},
    getCategoryListSuccess(state, action: GetCategoryListSuccessAction) {
      state.data.categories = action.payload.categories;
    }
  }
});

export const { name } = directorySlice;

export const {
  getSimpleLanguagesRequest,
  getSimpleLanguagesSuccess,

  getCategoryListRequest,
  getCategoryListSuccess
} = directorySlice.actions;

export default directorySlice.reducer;
