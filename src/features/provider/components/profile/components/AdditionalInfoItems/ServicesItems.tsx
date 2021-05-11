import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PlusIcon } from 'components/Icons';
import { ServiceInProfileModel } from 'features/provider/types/models/EditProviderProfile';
import { FilesApi } from 'shared/services';
import {
  ChangeValidateFieldPayload,
  CreateProfileServicesPayload,
  DeleteProfileServicePayload,
  UpdateProfileServicePayload
} from 'state/ducks/providerEditProfile';
import { ServicesError } from 'state/ducks/providerEditProfile/providerValisation';

import {
  ActionWrapper,
  AddNewItem,
  Container,
  DeleteBtn,
  DropBth,
  EditBtn,
  ImageDd,
  InfoWrapper,
  Item,
  List
} from './Common.styled';
import {
  CaptionsText,
  DescriptionInput,
  Title,
  TitleInput
} from './ServicesItems.styled';

interface ServicesItemsProps {
  edit?: boolean;
  servicesErrors?: ServicesError[];
  className?: string;
  services: ServiceInProfileModel[];
  onChangeValidateField: (payload: ChangeValidateFieldPayload) => void;
  onServiceCreate: (payload: CreateProfileServicesPayload) => void;
  onServiceChange?: (payload: UpdateProfileServicePayload) => void;
  onServiceDelete?: (payload: DeleteProfileServicePayload) => void;
}

const ServicesItems: React.FC<ServicesItemsProps> = ({
  edit,
  className,
  services,
  servicesErrors,
  onServiceCreate = () => {},
  onServiceChange = () => {},
  onServiceDelete = () => {},
  onChangeValidateField = () => {}
}) => {
  const [translation] = useTranslation('provider-profile');

  const t = (key: string) => translation(`serviceItem.${key}`);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openItem = (index: number) => () => setOpenIndex(index);
  useEffect(() => {
    if (!edit) {
      setOpenIndex(null);
    }
  }, [edit]);

  const handleFieldChange = (service: ServiceInProfileModel) => (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = e?.target?.name;
    const value = e?.target?.value;
    if (service?.id) {
      onServiceChange({
        service: {
          ...service,
          target: {
            ...service.target,
            [name]: value
          }
        }
      });
    }
  };

  const handleAddNewService = () => {
    onServiceCreate({
      service: {
        id: nanoid(),
        target: {
          name: '',
          description: '',
          imageUrl: ''
        }
      }
    });
    setOpenIndex(services.length);
  };

  const handleDeleteService = (service: ServiceInProfileModel) => () => {
    onServiceDelete({
      service
    });
  };

  const handleImageUpload = (service: ServiceInProfileModel) => async (
    file: File
  ) => {
    const imageUrl = await FilesApi.uploadOne(file);

    if (service?.target) {
      onServiceChange({
        service: {
          ...service,
          target: {
            ...service.target,
            imageUrl
          }
        }
      });
    }
  };

  const handleDeleteServiceImage = (service: ServiceInProfileModel) => () => {
    if (service?.target) {
      onServiceChange({
        service: {
          ...service,
          target: {
            ...service.target,
            imageUrl: ''
          }
        }
      });
    }
  };

  return (
    <Container className={className}>
      <List>
        {services.map((item, index) => {
          const open =
            openIndex === index || !!(servicesErrors && servicesErrors[index]);

          return (
            <Item key={index} $open={open}>
              <ImageDd
                size={open ? 'normal' : 'small'}
                imageUrl={item?.target?.imageUrl}
                onChange={handleImageUpload(item)}
                onDelete={handleDeleteServiceImage(item)}
              />

              <InfoWrapper className={open ? 'open' : ''}>
                {open ? (
                  <>
                    <TitleInput
                      value={item?.target?.name || ''}
                      name='name'
                      placeholder={t('nameField.placeholder')}
                      onChange={e => {
                        openItem(index);
                        onChangeValidateField({
                          field: 'services',
                          subField: 'name',
                          index
                        });
                        handleFieldChange(item)(e);
                      }}
                      errorMessage={
                        servicesErrors && servicesErrors[index]?.name?.message
                      }
                    />
                    <DescriptionInput
                      value={item?.target?.description || ''}
                      name='description'
                      placeholder={t('descriptionField.placeholder')}
                      onChange={e => {
                        openItem(index);
                        onChangeValidateField({
                          field: 'services',
                          subField: 'description',
                          index
                        });
                        handleFieldChange(item)(e);
                      }}
                      errorMessage={
                        servicesErrors && servicesErrors[index]?.description?.message
                      }
                    />
                  </>
                ) : (
                  <>
                    <Title noWrap>{item?.target?.name}</Title>
                    <CaptionsText noWrap>{item?.target?.description}</CaptionsText>
                  </>
                )}
              </InfoWrapper>

              {edit && (
                <ActionWrapper $open={open}>
                  {open ? (
                    <DeleteBtn onClick={handleDeleteService(item)} />
                  ) : (
                    <EditBtn onClick={openItem(index)} />
                  )}
                  <DropBth />
                </ActionWrapper>
              )}
            </Item>
          );
        })}
      </List>
      {edit && (
        <AddNewItem icon={<PlusIcon />} onClick={handleAddNewService}>
          {t('addServiceBtnLabel')}
        </AddNewItem>
      )}
    </Container>
  );
};

export default ServicesItems;
