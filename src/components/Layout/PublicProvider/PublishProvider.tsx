import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';
import useToggle from 'react-use/lib/useToggle';

import { Button } from 'components/Buttons';
import { Typography } from 'components/Typography';
import { EditProviderStatusEnum } from 'features/provider/types';
import { ROUTES } from 'shared/constants';
import { Nullable } from 'shared/types';
import { pick } from 'shared/utils/pick';
import {
  ProfileValidateError,
  PublishProfileErrors
} from 'state/ducks/providerEditProfile/providerValisation';

import AcceptPublishProcessModal from './AcceptPublishProcessModal';
import {
  Container,
  ErrorItem,
  ErrorLabel,
  ErrorList,
  ErrorTitle,
  ErrorWrapper,
  Label,
  LinkStyled,
  PublicActionBtnWrapper,
  PublicActionMessage,
  PublicActionWrapper
} from './PublishProvider.styled';

interface PublishProviderProps {
  status?: EditProviderStatusEnum;
  publicProviderErrors: Nullable<PublishProfileErrors>;
  className?: string;
  providerId: string;
  onPublishUpdate?: () => void;
  onRejectUpdate?: () => void;
}

const PublishProvider: React.FC<PublishProviderProps> = ({
  status,
  className,
  publicProviderErrors,
  providerId,
  onPublishUpdate = () => {},
  onRejectUpdate = () => {}
}) => {
  const [translation] = useTranslation('provider-pages');
  const t = (key: string) => translation(`publishProviderHint.${key}`);

  const [acceptModal, setAcceptModal] = useToggle(false);

  const openAcceptModal = () => setAcceptModal(true);
  const closeAcceptModal = () => setAcceptModal(false);

  const handlePublishUpdate = () => {
    closeAcceptModal();
    onPublishUpdate();
  };

  const linksEdit: {
    [key in keyof PublishProfileErrors]: {
      link: string;
      label: string;
    };
  } = useMemo(() => {
    const link = generatePath(ROUTES.PROVIDER_PROFILE, { id: providerId });

    return {
      name: {
        link,
        label: 'nameLabel'
      },
      overview: {
        link,
        label: 'overviewLabel'
      },
      services: {
        link,
        label: 'serviceLabel'
      },
      educationa: {
        link,
        label: 'educationLabel'
      },
      awards: {
        link,
        label: 'awardsLabel'
      },
      affiliates: {
        link,
        label: 'affiliatesLabel'
      }
    };
  }, []);

  const fieldsError = useMemo(
    () =>
      publicProviderErrors &&
      pick(
        publicProviderErrors,
        'name',
        'overview',
        'services',
        'educationa',
        'awards',
        'affiliates'
      ),
    [publicProviderErrors]
  );

  const links = useMemo(
    () =>
      fieldsError
        ? Object.keys(fieldsError).map((key, index) => {
            const errorKey = (key as unknown) as keyof typeof fieldsError;
            const error = fieldsError[errorKey];
            if (error) {
              if (Array.isArray(error)) {
                //@ts-ignore
                const haveError = error.every((item: any) =>
                  Object.keys(item).every(key => !!item[key]?.type)
                );

                return haveError ? (
                  <LinkStyled
                    key={index}
                    to={`${linksEdit[errorKey]?.link}#${linksEdit[errorKey]?.label}`}
                  >
                    {t(linksEdit[errorKey]?.label || '')}
                  </LinkStyled>
                ) : null;
              } else {
                return (
                  <LinkStyled
                    key={index}
                    to={`${linksEdit[errorKey]?.link}#${linksEdit[errorKey]?.label}`}
                  >
                    {t(linksEdit[errorKey]?.label || '')}
                  </LinkStyled>
                );
              }
            } else {
              return null;
            }
          })
        : null,
    [fieldsError]
  );

  const profileHaveError =
    publicProviderErrors?.locations?.type ===
      ProfileValidateError.NEED_ADD_LOCATION ||
    (!!links?.length && links.find(link => link));

  const locationLink = generatePath(ROUTES.PROVIDER_LOCATIONS, { id: providerId });

  if (status === EditProviderStatusEnum.Pristine) {
    return null;
  }

  const content = () => {
    if (!status) {
      return null;
    }

    switch (status) {
      case EditProviderStatusEnum.Modified:
        return (
          <>
            <PublicActionMessage>{t('providerChangeLabel')}</PublicActionMessage>
            <PublicActionBtnWrapper>
              <Typography color='greySix'>{t('wouldYouLikeLabel')}</Typography>
              <Button
                $size='small'
                variant='primary'
                className='publish-btn'
                onClick={openAcceptModal}
              >
                {t('publishUpdateBtnLabel')}
              </Button>
            </PublicActionBtnWrapper>
          </>
        );

      case EditProviderStatusEnum.UpdateInProgress:
        return (
          <>
            <PublicActionMessage>{t('providerChangeLabel')}</PublicActionMessage>
            <Label>{t('onModerationLabel')}</Label>
            <Button $size='small' variant='label' onClick={onRejectUpdate}>
              {t('discardBtnLabel')}
            </Button>
          </>
        );
      case EditProviderStatusEnum.OwnershipPending:
        return (
          <>
            <PublicActionMessage>
              {t('statusLabel')}

              <Typography tag='span' spacingLeft={1}>
                {t('ownershipPendingMessage')}
              </Typography>
            </PublicActionMessage>
          </>
        );
    }
  };

  return (
    <Container status={status} className={className}>
      <PublicActionWrapper>
        <AcceptPublishProcessModal
          open={acceptModal}
          onClose={closeAcceptModal}
          onAccept={handlePublishUpdate}
        />
        {content()}
      </PublicActionWrapper>
      {profileHaveError && (
        <ErrorWrapper>
          <ErrorTitle>{t('publishValitationTitle')}</ErrorTitle>
          <ErrorList>
            {publicProviderErrors?.locations?.type ===
              ProfileValidateError.NEED_ADD_LOCATION && (
              <ErrorItem>
                <LinkStyled to={locationLink}>{t('addLocationLabel')}</LinkStyled>
              </ErrorItem>
            )}

            {Array.isArray(links) && !!links.length && (
              <ErrorItem>
                <ErrorLabel>{t('addInfoLabel')}</ErrorLabel>
                {links.map((link, index) => (
                  <React.Fragment key={index}>
                    {link}
                    {index !== links.length - 1 && link ? ', ' : null}
                  </React.Fragment>
                ))}
              </ErrorItem>
            )}
          </ErrorList>
        </ErrorWrapper>
      )}
    </Container>
  );
};

export default PublishProvider;
