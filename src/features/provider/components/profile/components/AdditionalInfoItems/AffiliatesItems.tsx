import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PlusIcon } from 'components/Icons';
import { ProfileAffiliationModel } from 'features/provider/types/models/EditProviderProfile';
import { Affiliation } from 'features/provider/types/models/ProviderProfile';
import { ChangeValidateFieldPayload } from 'state/ducks/providerEditProfile';
import { AffiliateError } from 'state/ducks/providerEditProfile/providerValisation';
import {
  ChangeAffiliatePayload,
  DeleteAffiliatePayload
} from 'state/ducks/providerProfile';

import {
  ItemW,
  NameInput,
  NameValue,
  WebSiteInput,
  WebSiteValue
} from './AffiliatesItems.styled';
import {
  ActionWrapper,
  AddNewItem,
  Container,
  DeleteBtn,
  DropBth,
  EditBtn,
  InfoWrapper,
  List
} from './Common.styled';

interface AffiliatesItemsProps {
  className?: string;
  edit?: boolean;
  affiliates: ProfileAffiliationModel[];
  affiliatesErrors?: AffiliateError[];
  onAffiliateChange: (items: ProfileAffiliationModel[]) => void;
  onChangeValidateField: (payload: ChangeValidateFieldPayload) => void;
}

const AffiliatesItems: React.FC<AffiliatesItemsProps> = ({
  edit,
  className,
  affiliates,
  affiliatesErrors,
  onAffiliateChange,
  onChangeValidateField = () => {}
}) => {
  const [translation] = useTranslation('provider-profile');
  const t = (key: string, option?: any) =>
    translation(`affiliatesItems.${key}`, option);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openItem = (index: number) => () => setOpenIndex(index);
  useEffect(() => {
    if (!edit) {
      setOpenIndex(null);
    }
  }, [edit]);

  const handleAffiliateChange = (index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onAffiliateChange(
      affiliates.map((item, itemIndex) =>
        itemIndex !== index ? item : { ...item, [name]: value }
      )
    );
  };

  const handleAddNewAffiliate = () => {
    onAffiliateChange([
      ...affiliates,
      {
        name: '',
        webSite: ''
      }
    ]);
    setOpenIndex(affiliates.length);
  };

  const handleAffiliateDelete = (index: number) => () => {
    onAffiliateChange(affiliates.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <Container className={className}>
      <List>
        {affiliates.map((item, index) => {
          const open =
            openIndex === index || !!(affiliatesErrors && affiliatesErrors[index]);

          return (
            <ItemW key={index} $open={open} $noImage>
              <InfoWrapper className={open ? 'open' : ''}>
                {open ? (
                  <>
                    <NameInput
                      value={item?.name}
                      placeholder={t('nameField.placeholder')}
                      name='name'
                      onChange={e => {
                        openItem(index);
                        onChangeValidateField({
                          field: 'affiliates',
                          subField: 'name',
                          index
                        });
                        handleAffiliateChange(index)(e);
                      }}
                      options={
                        (t('nameField.option', {
                          returnObjects: true
                        }) as unknown) as string[]
                      }
                      errorMessage={
                        affiliatesErrors && affiliatesErrors[index]?.name?.message
                      }
                    />
                    <WebSiteInput
                      value={item.webSite}
                      placeholder={t('websiteField.placeholder')}
                      name='webSite'
                      onChange={handleAffiliateChange(index)}
                    />
                  </>
                ) : (
                  <>
                    <NameValue>{item?.name}</NameValue>
                    <WebSiteValue>{item.webSite}</WebSiteValue>
                  </>
                )}
              </InfoWrapper>

              {edit && (
                <ActionWrapper $open={open}>
                  {open ? (
                    <DeleteBtn onClick={handleAffiliateDelete(index)} />
                  ) : (
                    <EditBtn onClick={openItem(index)} />
                  )}
                  <DropBth />
                </ActionWrapper>
              )}
            </ItemW>
          );
        })}
      </List>
      {edit && (
        <AddNewItem icon={<PlusIcon />} onClick={handleAddNewAffiliate}>
          {t('addNewAffiliateBtnLabel')}
        </AddNewItem>
      )}
    </Container>
  );
};

export default AffiliatesItems;
