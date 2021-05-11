import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import {
  providerEditPhotoReducer,
  name as providerEditPhotoReducerReducerName
} from 'state/ducks/providerPhotos';
import {
  name as personalInfoReducerName,
  userPersonalInfoReducer
} from 'state/ducks/userPersonalInfo';

import { authReducer, name as authReducerName } from './ducks/auth';
import {
  createProviderReducer,
  name as createProviderReducerName
} from './ducks/createProvider';
import { directoryReducer, name as directoryReducerName } from './ducks/directory';
import {
  insuranceWithSubdivisionsReducer,
  name as insuranceWithSubdivisionsReducerName
} from './ducks/insuranceWithSubdivisions';
import { providerReducer, name as providerReducerName } from './ducks/provider';
import {
  providerEditProfileReducer,
  name as providerEditProfileReducerName
} from './ducks/providerEditProfile';
import {
  providerListReducer,
  name as providerListReducerName
} from './ducks/providerList';
import {
  providerReviewsReducer,
  name as providerReviewsReducerName
} from './ducks/providerReviews';
import {
  specialtiesWithTaxonomyReducer,
  name as specialtiesWithTaxonomyReducerName
} from './ducks/specialtyWithTaxonomy';
import {
  userReviewsReducer,
  name as userReviewsReducerName
} from './ducks/userReviews';

const getRootReducerCreator = (history: History) => (injectedReducers = {}) => {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    [authReducerName]: authReducer,
    [providerReducerName]: providerReducer,
    [directoryReducerName]: directoryReducer,
    [userReviewsReducerName]: userReviewsReducer,
    [providerReviewsReducerName]: providerReviewsReducer,
    [personalInfoReducerName]: userPersonalInfoReducer,
    [providerListReducerName]: providerListReducer,
    [providerEditProfileReducerName]: providerEditProfileReducer,
    [specialtiesWithTaxonomyReducerName]: specialtiesWithTaxonomyReducer,
    [insuranceWithSubdivisionsReducerName]: insuranceWithSubdivisionsReducer,
    [createProviderReducerName]: createProviderReducer,
    [providerEditPhotoReducerReducerName]: providerEditPhotoReducer,
    ...injectedReducers
  });

  return rootReducer;
};

export default getRootReducerCreator;
