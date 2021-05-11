import _chunk from 'lodash.chunk';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useToggle from 'react-use/lib/useToggle';

import { ReactComponent as EllipsisCircleIcon } from 'assets/icons/EllipsisCircleIcon.svg';
import {
  CheckCircleIcon,
  CloseCircleIcon,
  SocialIcon,
  StarIcon
} from 'components/Icons';
import { PopoverMenu } from 'components/Popover';
import { Typography } from 'components/Typography';
import { useLessThan } from 'shared/hooks';
import { Nullable } from 'shared/types';
import { ProviderProfileLocationDto, SocialLinkDto } from 'shared/types/generate';

import { SocialNamesEnum } from '../../../constants';
import {
  Address,
  AddressContainer,
  AddressNote,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  Detail,
  DetailLabel,
  Details,
  DetailsItem,
  HeaderMeta,
  HeaderMetaItem,
  HeaderMetaItems,
  LanguageItem,
  LanguageItems,
  Languages,
  ShowContacts,
  SocialLink
} from './LocationCard.styled';

type LocationCardProps = {
  isMainLocation: boolean;
  isAcceptNewPatients: Nullable<boolean>;
  title?: Nullable<string>;
  address?: Nullable<string>;
  addressNote?: Nullable<string>;
  phone?: Nullable<string>;
  fax?: Nullable<string>;
  email?: Nullable<string>;
  website?: Nullable<string>;
  languages?: string[];
  socialLinks: SocialLinkDto[];
  workingHours: {
    day: string;
    from: string;
    to: string;
  }[];
  onDelete: (locationId: ProviderProfileLocationDto['id']) => void;
  onEdit: () => void;
  onSetMainLocation: () => void;
};

const LocationCard: React.FC<LocationCardProps> = ({
  fax,
  email,
  title,
  phone,
  website,
  address,
  languages = [],
  socialLinks = [],
  workingHours = [],
  addressNote,
  isMainLocation,
  isAcceptNewPatients,
  onDelete,
  onEdit,
  onSetMainLocation = () => {}
}) => {
  const [translation] = useTranslation('provider-pages');

  const t = (key: string) => translation(`locationsPage.card.${key}`);

  const isSmallScreen = useLessThan('sm');
  const [cardExpanded, toggleExpandCard] = useToggle(false);

  const isHaveSocialLinks = !!socialLinks.find(item => !!item.url);

  const socialLinksChunks = _chunk(
    socialLinks.filter(l => l.socialType !== 4 && l.socialType !== 5),
    3
  );

  return (
    <Container>
      <CardHeader>
        {title && (
          <CardTitle>
            <Typography variant='body' tag='h5'>
              {title}
            </Typography>
          </CardTitle>
        )}

        {isMainLocation || isAcceptNewPatients !== null ? (
          <HeaderMeta>
            <HeaderMetaItems>
              {isMainLocation && (
                <HeaderMetaItem>
                  <Typography
                    variant='subTitleTwo'
                    tag='span'
                    color='grayChateau'
                    leftIcon={<StarIcon />}
                  >
                    {t('mainLocationLabel')}
                  </Typography>
                </HeaderMetaItem>
              )}

              {isAcceptNewPatients ? (
                <HeaderMetaItem>
                  <Typography
                    variant='subTitleTwo'
                    tag='span'
                    color='greyFive'
                    leftIcon={<CheckCircleIcon />}
                  >
                    {t('acceptingPatientsLabel')}
                  </Typography>
                </HeaderMetaItem>
              ) : (
                <HeaderMetaItem>
                  <Typography
                    variant='subTitleTwo'
                    tag='span'
                    color='glacier'
                    leftIcon={<CloseCircleIcon />}
                  >
                    {t('doesNotAcceptNewPatientsLabel')}
                  </Typography>
                </HeaderMetaItem>
              )}
            </HeaderMetaItems>
          </HeaderMeta>
        ) : null}

        <PopoverMenu menuComponent={<EllipsisCircleIcon />}>
          <Typography variant='default' color='glacier' onClick={onEdit}>
            {t('editLocationLabel')}
          </Typography>

          {!isMainLocation && (
            <Typography
              variant='default'
              color='glacier'
              onClick={onSetMainLocation}
            >
              {t('setAsMainLocationLabel')}
            </Typography>
          )}

          <Typography variant='default' color='warn' onClick={onDelete}>
            {t('deleteLocationLabel')}
          </Typography>
        </PopoverMenu>
      </CardHeader>

      <CardBody>
        {address || addressNote ? (
          <AddressContainer>
            {address && (
              <Address variant='subTitleTwo' tag='h6'>
                {address}
              </Address>
            )}

            {addressNote && (
              <AddressNote variant='default' tag='span' color='grayChateau'>
                {addressNote}
              </AddressNote>
            )}
          </AddressContainer>
        ) : null}

        {!!languages?.length && (
          <Languages>
            <Typography variant='subTitleTwo' tag='span' color='grayChateau'>
              {t('languagesLabel')}
            </Typography>

            <LanguageItems>
              {languages.map((lang, index) => (
                <LanguageItem key={index}>
                  <Typography variant='default' tag='span'>
                    {lang}
                  </Typography>
                </LanguageItem>
              ))}
            </LanguageItems>
          </Languages>
        )}

        {!isSmallScreen || cardExpanded ? (
          <Details>
            {phone || fax || email || website ? (
              <DetailsItem>
                {phone && (
                  <Detail>
                    <DetailLabel>
                      <Typography
                        tag='span'
                        variant='subTitleTwo'
                        color='grayChateau'
                      >
                        {t('phoneLabel')}
                      </Typography>
                    </DetailLabel>

                    <Typography tag='span' variant='subTitleTwo'>
                      {phone}
                    </Typography>
                  </Detail>
                )}

                {fax && (
                  <Detail>
                    <DetailLabel>
                      <Typography
                        tag='span'
                        variant='subTitleTwo'
                        color='grayChateau'
                      >
                        {t('faxLabel')}
                      </Typography>
                    </DetailLabel>

                    <Typography tag='span' variant='subTitleTwo'>
                      {fax}
                    </Typography>
                  </Detail>
                )}

                {email && (
                  <Detail>
                    <DetailLabel>
                      <Typography
                        tag='span'
                        variant='subTitleTwo'
                        color='grayChateau'
                      >
                        {t('emailLabel')}
                      </Typography>
                    </DetailLabel>

                    <Typography tag='span' variant='subTitleTwo'>
                      {email}
                    </Typography>
                  </Detail>
                )}

                {website && (
                  <Detail>
                    <DetailLabel>
                      <Typography
                        tag='span'
                        variant='subTitleTwo'
                        color='grayChateau'
                      >
                        {t('websiteLabel')}
                      </Typography>
                    </DetailLabel>

                    <Typography tag='span' variant='subTitleTwo'>
                      {website}
                    </Typography>
                  </Detail>
                )}
              </DetailsItem>
            ) : null}

            <DetailsItem>
              <Detail>
                <Typography tag='span' variant='subTitleTwo' color='grayChateau'>
                  {t('workingHoursLabel')}
                </Typography>
              </Detail>

              {!!workingHours.length ? (
                workingHours.map((workingHour, index) => (
                  <Detail key={index} $spacing='sm'>
                    <Typography tag='span' variant='subTitleTwo'>
                      {workingHour.day}, {workingHour.from} - {workingHour.to}
                    </Typography>
                  </Detail>
                ))
              ) : (
                <Detail>
                  <Typography tag='span' variant='subTitleTwo'>
                    {t('noInformationLabel')}
                  </Typography>
                </Detail>
              )}
            </DetailsItem>

            {!!socialLinks?.length && isHaveSocialLinks && (
              <DetailsItem>
                <Detail>
                  <Typography tag='span' variant='subTitleTwo' color='grayChateau'>
                    {t('socialLinkLabel')}
                  </Typography>
                </Detail>

                {socialLinksChunks!.map((chunk, index) => (
                  <Detail key={index} $spacing='sm' $width={12.8}>
                    {chunk!.map(
                      (link, index) =>
                        link.socialType &&
                        link.url && (
                          <SocialLink
                            key={index}
                            target='_blank'
                            href={
                              link.socialType === 7
                                ? `https://wa.me/${link.url}`
                                : link.url || ''
                            }
                          >
                            <SocialIcon
                              name={SocialNamesEnum[link.socialType]}
                              cursor
                            />
                          </SocialLink>
                        )
                    )}
                  </Detail>
                ))}
              </DetailsItem>
            )}
          </Details>
        ) : null}
      </CardBody>

      {isSmallScreen && (
        <CardFooter>
          <ShowContacts
            variant='body'
            color='glacier'
            tag='span'
            onClick={() => toggleExpandCard()}
          >
            {cardExpanded ? t('hideContactsLabel') : t('showContactsLabel')}
          </ShowContacts>
        </CardFooter>
      )}
    </Container>
  );
};

export default LocationCard;
