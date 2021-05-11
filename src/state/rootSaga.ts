import { all } from 'redux-saga/effects';

import { authRootSaga } from './ducks/auth';
import { createProviderRootSaga } from './ducks/createProvider';
import { directoryRootSaga } from './ducks/directory';
import { insurancesWithSubdivisionsRootSaga } from './ducks/insuranceWithSubdivisions';
import { getProviderByIdSaga } from './ducks/provider';
import { providerEditProfileRootSaga } from './ducks/providerEditProfile';
import { getProviderListByUserIdRootSaga } from './ducks/providerList';
import { providerEditPhotoRootSaga } from './ducks/providerPhotos';
import { providerReviewsRootSaga } from './ducks/providerReviews';
import { specialtiesWithTaxonomyRootSaga } from './ducks/specialtyWithTaxonomy';
import { userPersonalInfoRootSaga } from './ducks/userPersonalInfo';
import { userReviewsRootSaga } from './ducks/userReviews';

function* rootSaga() {
  yield all([
    getProviderListByUserIdRootSaga(),
    getProviderByIdSaga(),
    providerEditProfileRootSaga(),
    insurancesWithSubdivisionsRootSaga(),
    specialtiesWithTaxonomyRootSaga(),
    directoryRootSaga(),
    userPersonalInfoRootSaga(),
    authRootSaga(),
    createProviderRootSaga(),
    userReviewsRootSaga(),
    providerReviewsRootSaga(),
    providerEditPhotoRootSaga()
  ]);
}

export default rootSaga;
