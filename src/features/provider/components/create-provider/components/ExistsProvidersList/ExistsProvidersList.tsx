import React from 'react';
import { useTranslation } from 'react-i18next';

import { MAIN_SITE_URL } from 'config/common';
import { makeLocationAddress } from 'features/provider/utils';
import { ExistProviderProfileFull } from 'state/ducks/createProvider';

import {
  ActionWrapper,
  AlreadyClaimedLabel,
  ClaimProfileBtn,
  InfoWrapper,
  LocationName,
  LocationValue,
  Name,
  ProviderItem,
  ProvidersList
} from './ExistsProvidersList.styled';

interface ExistsProvidersListProps {
  existsProviders: ExistProviderProfileFull[];
  className?: string;
}

const ExistsProvidersList: React.FC<ExistsProvidersListProps> = ({
  className,
  existsProviders
}) => {
  const [translation] = useTranslation('provider-pages');

  const t = (key: string) => translation(`createProviderPage.${key}`);

  const handleGoBlankPage = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <ProvidersList className={className}>
      {existsProviders.map(item => {
        const mainUnitId = item?.activeProfile?.mainUnitId;

        const defaultLocation = item?.activeProfile?.locations?.find(
          location => location?.unitId === mainUnitId
        );

        const handleClaimBtn = () => {
          handleGoBlankPage(
            `${MAIN_SITE_URL}/claim-provider/${item.id}?profileId=${item.activeProfileId}&locationId=${defaultLocation?.id}&categoryId=1`
          );
        };
        return (
          <ProviderItem key={item?.id}>
            <InfoWrapper>
              <Name>{item?.name}</Name>
              <LocationName>{defaultLocation?.title}</LocationName>
              <LocationValue>
                {makeLocationAddress(defaultLocation?.address)}
              </LocationValue>
            </InfoWrapper>
            <ActionWrapper>
              {item?.isOwnerExists ? (
                <AlreadyClaimedLabel>{t('alreadyClaimedLabel')}</AlreadyClaimedLabel>
              ) : (
                <ClaimProfileBtn onClick={handleClaimBtn}>
                  {t('claimProfileBtnLabel')}
                </ClaimProfileBtn>
              )}
            </ActionWrapper>
          </ProviderItem>
        );
      })}
    </ProvidersList>
  );
};

export default ExistsProvidersList;
