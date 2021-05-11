import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PlusIcon } from 'components/Icons';
import { YEAR_INPUT_MASK } from 'config/common';
import { ProfileAwardModel } from 'features/provider/types/models/EditProviderProfile';
import { FilesApi } from 'shared/services';
import { normalizeNumber } from 'shared/utils';
import { ChangeValidateFieldPayload } from 'state/ducks/providerEditProfile';
import { AwardsError } from 'state/ducks/providerEditProfile/providerValisation';

import { NameInput, NameValue, YearInput, YearValue } from './AwardsItems.styled';
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

interface AwardsItemsProps {
  className?: string;
  awards: ProfileAwardModel[];
  awardsErrors?: AwardsError[];
  edit?: boolean;
  onAwardChange: (items: ProfileAwardModel[]) => void;
  onChangeValidateField: (payload: ChangeValidateFieldPayload) => void;
}

const AwardsItems: React.FC<AwardsItemsProps> = ({
  edit,
  className,
  awards,
  awardsErrors,
  onAwardChange = () => {},
  onChangeValidateField = () => {}
}) => {
  const [translation] = useTranslation('provider-profile');
  const t = (key: string) => translation(`awardItem.${key}`);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openItem = (index: number) => () => setOpenIndex(index);
  useEffect(() => {
    if (!edit) {
      setOpenIndex(null);
    }
  }, [edit]);

  const handleAddNewAward = () => {
    onAwardChange([
      ...awards,
      {
        name: '',
        photoUrl: ''
      }
    ]);
    setOpenIndex(awards.length);
  };

  const handleAwardDelete = (index: number) => () => {
    onAwardChange(awards.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleAwardChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'year') {
      onAwardChange(
        awards.map((item, itemIndex) =>
          itemIndex !== index ? item : { ...item, year: +normalizeNumber(value) }
        )
      );
    } else {
      onAwardChange(
        awards.map((item, itemIndex) =>
          itemIndex !== index ? item : { ...item, [name]: value }
        )
      );
    }
  };

  const handleUploadAwardImage = (index: number) => async (file: File) => {
    const photoUrl = await FilesApi.uploadOne(file);
    onAwardChange(
      awards.map((item, itemIndex) =>
        itemIndex !== index ? item : { ...item, photoUrl }
      )
    );
  };

  const handleDeleteAwardImage = (index: number) => () => {
    onAwardChange(
      awards.map((item, itemIndex) =>
        itemIndex !== index ? item : { ...item, photoUrl: '' }
      )
    );
  };

  return (
    <Container className={className}>
      <List>
        {awards.map((item, index) => {
          const open =
            openIndex === index || !!(awardsErrors && awardsErrors[index]);

          return (
            <Item key={index} $open={open}>
              <ImageDd
                size={open ? 'normal' : 'small'}
                imageUrl={item?.photoUrl || ''}
                onChange={handleUploadAwardImage(index)}
                onDelete={handleDeleteAwardImage(index)}
              />

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
                          field: 'awards',
                          subField: 'name',
                          index
                        });
                        handleAwardChange(index)(e);
                      }}
                      errorMessage={
                        awardsErrors && awardsErrors[index]?.name?.message
                      }
                    />
                    <YearInput
                      value={item?.year || ''}
                      mask={YEAR_INPUT_MASK}
                      placeholder={t('yearField.placeholder')}
                      name='year'
                      onChange={e => {
                        console.log('call');
                        openItem(index);
                        onChangeValidateField({
                          field: 'awards',
                          subField: 'year',
                          index
                        });
                        handleAwardChange(index)(e);
                      }}
                      errorMessage={
                        awardsErrors && awardsErrors[index]?.year?.message
                      }
                    />
                  </>
                ) : (
                  <>
                    <NameValue>{item?.name}</NameValue>
                    <YearValue>{item?.year || ''}</YearValue>
                  </>
                )}
              </InfoWrapper>

              {edit && (
                <ActionWrapper $open={open}>
                  {open ? (
                    <DeleteBtn onClick={handleAwardDelete(index)} />
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
        <AddNewItem icon={<PlusIcon />} onClick={handleAddNewAward}>
          {t('addNewAwardBtnLabel')}
        </AddNewItem>
      )}
    </Container>
  );
};

export default AwardsItems;
