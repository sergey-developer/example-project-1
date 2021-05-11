import React from 'react';
import { useTranslation } from 'react-i18next';

import { MAIN_SITE_URL } from 'config/common';
import { makeLocationAddress } from 'features/provider/utils';
import { ProviderProfileDto } from 'shared/types/generate';

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
} from './SimilarProfilesList.styled';

interface SimilarProfilesListProps {
  className?: string;
  profileList: ProviderProfileDto[];
}

const SimilarProfilesList: React.FC<SimilarProfilesListProps> = ({
  className,
  profileList
}) => {
  const [translation] = useTranslation('provider-pages');

  const t = (key: string) => translation(`createProviderPage.${key}`);

  const handleGoBlankPage = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <ProvidersList className={className}>
      {profileList.map(item => {
        const mainUnitId = item?.mainUnitId;

        const defaultLocation = item?.locations?.find(
          location => location?.unitId === mainUnitId
        );

        const handleClaimBtn = () => {
          handleGoBlankPage(
            `${MAIN_SITE_URL}/claim-provider/${item.providerId}?profileId=${item.id}&locationId=${defaultLocation?.id}&categoryId=1`
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

export default SimilarProfilesList;
