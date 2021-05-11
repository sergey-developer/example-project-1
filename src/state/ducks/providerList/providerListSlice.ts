import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { OidcUserModel } from 'features/auth/types';
import { ProviderDto } from 'features/provider/types';
import { ErrorAction, LoadingAction, LoadingStatus, Nullable } from 'shared/types';

export type ProviderListState = {
  data: Nullable<ProviderDto[]>;
  loading: LoadingStatus;
  error: Nullable<string>;
};

export type GetProviderListByUserIdAction = PayloadAction<
  OidcUserModel['profile']['sub']
>;

const providerListInitialState = {
  data: null,
  loading: 'idle',
  error: null
} as ProviderListState;

const providerListSlice = createSlice({
  name: 'providerList',
  initialState: providerListInitialState,
  reducers: {
    doGetProviderList(state, action: GetProviderListByUserIdAction) {},
    providerListLoading(state, action: LoadingAction) {
      state.data = null;
      state.loading = action.payload;
      state.error = null;
    },
    getProviderListSuccess(state, action: PayloadAction<ProviderDto[]>) {
      state.data = action.payload;
      state.loading = 'finished';
      state.error = null;
    },
    getProviderListError(state, action: ErrorAction) {
      state.data = null;
      state.loading = 'finished';
      state.error = action.payload;
    }
  }
});

/**
 * name should be used in the "selectors" and "useInjectReducer"
 */
export const { name } = providerListSlice;

export const {
  doGetProviderList,
  providerListLoading,
  getProviderListSuccess,
  getProviderListError
} = providerListSlice.actions;

export default providerListSlice.reducer;
