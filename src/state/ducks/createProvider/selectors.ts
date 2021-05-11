import { name as reducerName } from './createProviderSlice';
import { CreateProviderState } from './state';

export const createProviderStateSelector = (state: any): CreateProviderState =>
  state[reducerName];

export const createProviderStepSelector = (state: any) =>
  createProviderStateSelector(state)?.step;

export const createProviderErrorsSelector = (state: any) =>
  createProviderStateSelector(state).errors;

export const createProviderLocationSelector = (state: any) =>
  createProviderStateSelector(state)?.data?.geoPoint;

export const createProviderCategorySelector = (state: any) =>
  createProviderStateSelector(state)?.data?.categoryId;

export const similarNameProviderProfilesSelector = (state: any) =>
  createProviderStateSelector(state)?.similarNameProviderProfiles;
