import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ProviderDto } from 'features/provider/types';
import { ErrorAction, LoadingAction, LoadingStatus, Nullable } from 'shared/types';

export type ProviderState = {
  data: Nullable<ProviderDto>;
  loading: LoadingStatus;
  error: Nullable<string>;
};

export type GetProviderByIdAction = PayloadAction<ProviderDto['id']>;

const providerInitialState = {
  data: null,
  loading: 'idle',
  error: null
} as ProviderState;

const providerSlice = createSlice({
  name: 'provider',
  initialState: providerInitialState,
  reducers: {
    doGetProvider(state, action: GetProviderByIdAction) {},
    providerLoading(state, action: LoadingAction) {
      state.data = null;
      state.loading = action.payload;
      state.error = null;
    },
    getProviderSuccess(state, action: PayloadAction<ProviderDto>) {
      state.data = action.payload;
      state.loading = 'finished';
      state.error = null;
    },
    getProviderError(state, action: ErrorAction) {
      state.data = null;
      state.loading = 'finished';
      state.error = action.payload;
    }
  }
});

/**
 * name should be used in the "selectors" and "useInjectReducer"
 */
export const { name } = providerSlice;

export const {
  doGetProvider,
  providerLoading,
  getProviderSuccess,
  getProviderError
} = providerSlice.actions;

export default providerSlice.reducer;
