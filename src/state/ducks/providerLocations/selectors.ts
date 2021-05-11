import { Nullable } from 'shared/types';

import {
  EditProviderLocationsState,
  ProviderLocationsRootState,
  ViewProviderLocationsState
} from './providerLocationsSlice';

const viewProviderLocationsStateSelector = (
  state: ProviderLocationsRootState
): ViewProviderLocationsState => state.providerLocations.view;

const editProviderLocationsStateSelector = (
  state: ProviderLocationsRootState
): EditProviderLocationsState => state.providerLocations.edit;

const editProviderLocationIdStateSelector = (
  state: ProviderLocationsRootState
): Nullable<string> => state.providerLocations.edit.locationEditId;

const newMainLocationIdSelector = (
  state: ProviderLocationsRootState
): Nullable<string> => state?.providerLocations?.edit?.setMainLocationId;
export {
  viewProviderLocationsStateSelector,
  editProviderLocationsStateSelector,
  editProviderLocationIdStateSelector,
  newMainLocationIdSelector
};
