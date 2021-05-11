import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useToggle from 'react-use/lib/useToggle';

import { Button } from 'components/Buttons';
import { BaseAcceptModal } from 'components/Modals';
import { PageWrapper } from 'components/PageWrapper';
import { Select, SelectOptionType } from 'components/Select';
import { MultiSelectSearchOption } from 'components/Select/MultiSelectSearch';
import { SORT_ENUM } from 'shared/constants';
import { Nullable } from 'shared/types';
import { ProfileLocationAttributesDto } from 'shared/types/generate';
import { secToTime } from 'shared/utils';
import { ViewProviderLocationsState } from 'state/ducks/providerLocations';
import { DeleteProviderLocationPayload } from 'state/ducks/providerLocations/actionTypes';

import { AcceptNewPatientsEnum, weekDays } from '../../constants';
import { makeLocationAddress } from '../../utils';
import { useInModerationModal } from '../common/modals';
import { DeleteLocationAccept } from './DeleteLocationAccept';
import LocationCard from './LocationCard/LocationCard';
import LocationEditModal, {
  LocationEditInitialValues
} from './LocationEditModal/LocationEditModal';
import { dataConverter } from './LocationEditModal/util/convertFunction';
import { SelectContainer } from './LocationsPage.styled';
import { SetMainLocation } from './SetMainLocation';

type LocationsPageProps = {
  langOptions: MultiSelectSearchOption[];
  profileWatPublish: boolean;
  locations: ViewProviderLocationsState['data'];
  mainUnitId: ViewProviderLocationsState['meta']['mainUnitId'];
  editLocationId: Nullable<string>;
  providerRegionId?: Nullable<string>;
  onAddNewLocation: () => void;
  onCloseEditLocationModal: () => void;
  onSubmitLocationEdit: (
    locationId: string,
    values: LocationEditInitialValues
  ) => void;
  profileId: ViewProviderLocationsState['meta']['profileId'];
  providerId: ViewProviderLocationsState['meta']['providerId'];
  onDelete: (payload: DeleteProviderLocationPayload) => void;
  onEdit: (locationId: string) => void;
  onSetMainLocation: () => void;
  openSetMainLocation: boolean;
  onOpenSetMainLocationModal: (locationId: string) => void;
  onCloseSetMainLocationDialog: () => void;
};

const sortingOptions: SelectOptionType[] = [
  { label: 'City (a-z)', value: SORT_ENUM.ASC },
  { label: 'City (z-a)', value: SORT_ENUM.DESC }
];

const LocationsPage: React.FC<LocationsPageProps> = ({
  locations: baseLocations = [],
  mainUnitId,
  editLocationId,
  onAddNewLocation,
  onCloseEditLocationModal,
  onSubmitLocationEdit,
  onDelete,
  onEdit,
  profileId,
  providerId,
  onSetMainLocation,
  langOptions,
  openSetMainLocation,
  onOpenSetMainLocationModal,
  onCloseSetMainLocationDialog,
  profileWatPublish,
  providerRegionId
}) => {
  const { i18n, t: translation } = useTranslation('provider-pages');
  const t = (key: string) => translation(`locationsPage.${key}`);
  const { openOnModerationModal } = useInModerationModal();
  const [deletionHint, toggleDeletionHint] = useToggle(false);
  const openDeletionHintModal = () => toggleDeletionHint(true);
  const closeDeletionHintModal = () => toggleDeletionHint(false);

  const [locations, setLocations] = useState(() => {
    return baseLocations ? baseLocations.filter(l => !!l.target?.address?.city) : [];
  });
  const [deleteLocationId, setDeleteLocation] = useState<string | null>(null);

  const handleCloseDeleteLocationModal = () => setDeleteLocation(null);

  const handleSortLocations = (option: Nullable<SelectOptionType>) => {
    if (!locations.length || !option) return;

    const sortedLocations = [...locations].sort((a, b) => {
      if (!a.target?.address?.city || !b.target?.address?.city) return 0;

      const cityAInLowerCase = a.target.address.city.toLocaleLowerCase();
      const cityBInLowerCase = b.target.address.city.toLocaleLowerCase();

      const sortValue =
        option.value === SORT_ENUM.ASC
          ? cityAInLowerCase.localeCompare(cityBInLowerCase, i18n.language)
          : cityBInLowerCase.localeCompare(cityAInLowerCase, i18n.language);

      return sortValue !== -1 && sortValue !== 1 ? 0 : sortValue;
    });

    setLocations(sortedLocations);
  };

  const handleDeleteLocation = () => {
    handleCloseDeleteLocationModal();
    deleteLocationId &&
      onDelete({
        id: deleteLocationId,
        profileId: profileId,
        providerId: providerId
      });
  };
  const editLocations: ProfileLocationAttributesDto | undefined = locations?.find(
    location => location.id === editLocationId
  )?.target;

  const initialValues = editLocations && dataConverter(editLocations);

  const langMap = React.useMemo(
    () =>
      langOptions.reduce((acc, item) => {
        if (item.value) {
          acc.set(item.value, item);
        }
        return acc;
      }, new Map<string, typeof langOptions[0]>()),
    [langOptions]
  );

  return (
    <PageWrapper
      title={t('title')}
      button={
        !profileWatPublish && (
          <Button onClick={onAddNewLocation}>{t('addLocationBtnLabel')}</Button>
        )
      }
    >
      {editLocationId && !profileWatPublish && (
        <LocationEditModal
          providerRegionId={providerRegionId}
          langOptions={langOptions}
          initialValues={initialValues}
          open={!!editLocationId}
          onClose={onCloseEditLocationModal}
          onSubmit={onSubmitLocationEdit}
          locationId={editLocationId}
          onSetMainLocation={() => {
            onCloseEditLocationModal();
            onOpenSetMainLocationModal(editLocationId);
          }}
        />
      )}

      <DeleteLocationAccept
        open={!!deleteLocationId}
        onClose={handleCloseDeleteLocationModal}
        onAccept={handleDeleteLocation}
      />

      {deletionHint && (
        <BaseAcceptModal
          maxWidth={60}
          open={deletionHint}
          title={t('noDeleteHint')}
          onClose={closeDeletionHintModal}
          action={
            <Button variant='primary' onClick={closeDeletionHintModal}>
              {t('okBtnLabel')}
            </Button>
          }
        />
      )}

      <SetMainLocation
        open={openSetMainLocation}
        onClose={onCloseSetMainLocationDialog}
        onAccept={onSetMainLocation}
      />

      <SelectContainer>
        <Select
          placeholder={t('sortByLabel')}
          options={sortingOptions}
          onChange={handleSortLocations}
        />
      </SelectContainer>

      {locations?.length ? (
        locations.map((location, index) => {
          if (!location.target) return null;

          const address = makeLocationAddress(location.target.address);
          const isAddressAsTitle = !location.target.title && !!address;

          const isAcceptNewPatients = location.target.acceptingNewPatients
            ? AcceptNewPatientsEnum[location.target.acceptingNewPatients]
            : null;

          const languages =
            (location.target.languages?.map(
              lang => langMap.get(lang)?.label
            ) as string[])?.filter(lang => !!lang) || [];

          // TODO: refactor working hours
          const workingHours = location.target.workingHours!;

          let workingHoursInSunday = workingHours.find(h => h.day === 0);
          if (workingHoursInSunday) {
            workingHoursInSunday = { ...workingHoursInSunday };
            // @ts-ignore
            workingHoursInSunday.day = weekDays[workingHoursInSunday.day];
            // @ts-ignore
            workingHoursInSunday.from = secToTime(workingHoursInSunday.from);
            // @ts-ignore
            workingHoursInSunday.to = secToTime(workingHoursInSunday.to);
          }

          let workingHoursInSaturday = workingHours?.find(h => h.day === 6);
          if (workingHoursInSaturday) {
            workingHoursInSaturday = { ...workingHoursInSaturday };
            // @ts-ignore
            workingHoursInSaturday.day = weekDays[workingHoursInSaturday.day];
            // @ts-ignore
            workingHoursInSaturday.from = secToTime(workingHoursInSaturday.from);
            // @ts-ignore
            workingHoursInSaturday.to = secToTime(workingHoursInSaturday.to);
          }
          const workingHoursInWeekdays =
            workingHours
              ?.filter(h => h.day !== 0 && h.day !== 6)
              ?.reduce<any>((acc, h, index, arr) => {
                if (h.from && h.to && index === 0) {
                  // @ts-ignore
                  acc.day = `${weekDays[h.day]}`;
                  acc.from = secToTime(h.from!);
                  acc.to = secToTime(h.to!);
                }
                if (h.from && h.to && index === arr.length - 1) {
                  // @ts-ignore
                  acc.day += ` — ${weekDays[h.day]}`;
                  acc.from = secToTime(h.from!);
                  acc.to = secToTime(h.to!);
                }
                return acc;
              }, {}) || [];

          const workingHoursResult = [];

          Object.keys(workingHoursInWeekdays).length &&
            workingHoursResult.push(workingHoursInWeekdays);

          workingHoursInSaturday && workingHoursResult.push(workingHoursInSaturday);
          workingHoursInSunday && workingHoursResult.push(workingHoursInSunday);

          return (
            <LocationCard
              key={index}
              fax={location.target?.fax}
              phone={location.target?.phone}
              title={isAddressAsTitle ? address : location.target.title}
              address={isAddressAsTitle ? null : address}
              languages={languages}
              addressNote={location.target.address?.address2}
              isMainLocation={location.target.unitId === mainUnitId}
              isAcceptNewPatients={isAcceptNewPatients}
              socialLinks={location.target?.socialLinks || []}
              workingHours={workingHoursResult?.filter(
                workingHour => workingHour.day && workingHour.from && workingHour.to
              )}
              onDelete={() => {
                profileWatPublish
                  ? openOnModerationModal()
                  : locations.length === 1
                  ? openDeletionHintModal()
                  : location?.id && setDeleteLocation(location.id);
              }}
              onEdit={() => {
                profileWatPublish
                  ? openOnModerationModal()
                  : location?.id && onEdit(location.id);
              }}
              onSetMainLocation={() => {
                profileWatPublish
                  ? openOnModerationModal()
                  : location?.target?.unitId &&
                    onOpenSetMainLocationModal(location?.target?.unitId);
              }}
            />
          );
        })
      ) : (
        <div>{t('noLocationLabel')}</div>
      )}
    </PageWrapper>
  );
};

export default LocationsPage;
