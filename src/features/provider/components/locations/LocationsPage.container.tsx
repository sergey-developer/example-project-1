import { nanoid } from '@reduxjs/toolkit';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Spinner } from 'components/Spinner';
import { SocialIndexEnum } from 'features/provider/constants';
import { EditProviderStatusEnum } from 'features/provider/types';
import { ProfileSocialLinkDto, ProfileWorkingHoursDto } from 'shared/types/generate';
import { AcceptingNewPatientsStatus } from 'shared/types/model/common/AcceptingNewPatientsStatus';
import { SystemDayOfWeek } from 'shared/types/model/common/SystemDayOfWeek';
import { DayName, dayToIndex } from 'shared/utils';
import { directorySimpleLanguagesSelector } from 'state/ducks/directory';
import { providerSelector } from 'state/ducks/provider';
import { providerEditProfileStateSelector } from 'state/ducks/providerEditProfile';
import {
  addNewLocationOpenModal,
  addOrEditLocationRequest,
  closeEditLocationModal,
  closeSetMainLocationModal,
  doDeleteProviderLocation,
  doGetProviderLocations,
  editProviderLocationIdStateSelector,
  newMainLocationIdSelector,
  openLocationEditModal,
  openSetMainLocationModal,
  setMainLocationRequest,
  viewProviderLocationsStateSelector
} from 'state/ducks/providerLocations';
import { DeleteProviderLocationPayload } from 'state/ducks/providerLocations/actionTypes';
import { useAppDispatch } from 'state/store';

import { useProviderLocationsSlice } from '../../hooks';
import { LocationEditInitialValues } from './LocationEditModal/LocationEditModal';
import LocationsPage from './LocationsPage';

const LocationsPageContainer: React.FC = () => {
  useProviderLocationsSlice();
  const dispatch = useAppDispatch();

  const providerState = useSelector(providerSelector);
  const provider = providerState.data;
  const providerRegionId = provider?.regionId;

  const locationsState = useSelector(viewProviderLocationsStateSelector);
  const editLocationId = useSelector(editProviderLocationIdStateSelector);
  const newMainLocationId = useSelector(newMainLocationIdSelector);
  const openSetMainLocation = !!newMainLocationId;
  const languagesList = useSelector(directorySimpleLanguagesSelector);

  const profile = useSelector(providerEditProfileStateSelector);

  const isProfileWatPublish =
    profile?.data?.providerStatus === EditProviderStatusEnum.UpdateInProgress;

  const langOptions = useMemo(
    () =>
      languagesList.map(lang => ({
        label: lang.text,
        value: lang.id,
        id: lang.id
      })),
    [languagesList]
  );

  React.useEffect(() => {
    if (provider) {
      dispatch(
        doGetProviderLocations({
          profileId: provider.activeProfileId,
          providerId: provider.id
        })
      );
    }
  }, [provider]);

  const handleAddNewLocation = () => {
    dispatch(addNewLocationOpenModal());
  };

  const handleCloseAddNewLocation = () => {
    dispatch(closeEditLocationModal());
  };

  const handleCreateOrEditLocation = (
    locationId: string,
    values: LocationEditInitialValues
  ) => {
    //TODO Refactor this!!!
    const {
      socialLinks: socialLinksValues,
      workingHours: workingHoursValues,
      acceptingNewPatients: acceptingNewPatientsValue,
      ...rest
    } = values;

    const socialLinks: ProfileSocialLinkDto[] = Object.keys(
      socialLinksValues
    ).reduce((acc, value) => {
      acc.push({
        //@ts-ignore
        socialType: SocialIndexEnum[
          value as keyof typeof socialLinksValues
        ] as number,
        //@ts-ignore
        url: socialLinksValues[value]
      });
      return acc;
    }, []);

    const workingHours: ProfileWorkingHoursDto[] = Object.keys(
      workingHoursValues
    ).reduce((acc, key) => {
      const currentDay = workingHoursValues[(key as unknown) as SystemDayOfWeek];

      if (currentDay?.checked) {
        acc.push({
          //@ts-ignore
          day: +((key as unknown) as SystemDayOfWeek),
          from: currentDay.from,
          to: currentDay.to
        });
      }
      return acc;
    }, [] as ProfileWorkingHoursDto[]);

    if (provider?.activeProfileId && provider?.id) {
      dispatch(
        addOrEditLocationRequest({
          locationId,
          profileId: provider.activeProfileId,
          providerId: provider.id,
          target: {
            ...rest,
            acceptingNewPatients:
              acceptingNewPatientsValue === undefined
                ? AcceptingNewPatientsStatus.Undefined
                : acceptingNewPatientsValue
                ? AcceptingNewPatientsStatus.Accept
                : AcceptingNewPatientsStatus.NotAccept,
            workingHours,
            socialLinks
          }
        })
      );
    }
  };

  const handleDelete = (payload: DeleteProviderLocationPayload) => {
    dispatch(doDeleteProviderLocation(payload));
  };

  const handleEdit = (locationId: string) => {
    dispatch(
      openLocationEditModal({
        locationId
      })
    );
  };

  const handleSetMainLocation = () => {
    if (provider?.activeProfileId && provider?.id && newMainLocationId) {
      dispatch(
        setMainLocationRequest({
          locationId: newMainLocationId,
          profileId: provider.activeProfileId,
          providerId: provider.id
        })
      );
    }
  };

  const handleOpenSetMainLocationModal = (locationId: string) => {
    dispatch(
      openSetMainLocationModal({
        locationId
      })
    );
  };

  const handleCloseSetMainLocationDialog = () => {
    dispatch(closeSetMainLocationModal());
  };

  if (locationsState.loading !== 'finished') {
    return <Spinner size='lg' fullwidth />;
  }

  return (
    <LocationsPage
      langOptions={langOptions}
      locations={locationsState.data || []}
      mainUnitId={locationsState.meta.mainUnitId}
      profileId={locationsState.meta.profileId}
      providerId={locationsState.meta.providerId}
      providerRegionId={providerRegionId}
      editLocationId={editLocationId}
      profileWatPublish={isProfileWatPublish}
      onAddNewLocation={handleAddNewLocation}
      onCloseEditLocationModal={handleCloseAddNewLocation}
      onSubmitLocationEdit={handleCreateOrEditLocation}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onSetMainLocation={handleSetMainLocation}
      openSetMainLocation={openSetMainLocation}
      onOpenSetMainLocationModal={handleOpenSetMainLocationModal}
      onCloseSetMainLocationDialog={handleCloseSetMainLocationDialog}
    />
  );
};

export default LocationsPageContainer;
