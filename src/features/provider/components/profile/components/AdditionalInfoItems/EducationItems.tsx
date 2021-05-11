import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PlusIcon } from 'components/Icons';
import { YEAR_INPUT_MASK } from 'config/common';
import { ProfileEducationModel } from 'features/provider/types/models/EditProviderProfile';
import { FilesApi } from 'shared/services';
import { normalizeNumber } from 'shared/utils';
import { ChangeValidateFieldPayload } from 'state/ducks/providerEditProfile';
import { EducationError } from 'state/ducks/providerEditProfile/providerValisation';

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
  DegreeInput,
  DegreeValue,
  GraduatedInput,
  GraduatedValue,
  Row,
  SchoolNameInput,
  SchoolNameValue
} from './EducationItem.styled';

interface EducationItemsProps {
  className?: string;
  educations: ProfileEducationModel[];
  educationsErrors?: EducationError[];
  edit?: boolean;
  onChange?: (items: ProfileEducationModel[]) => void;
  onChangeValidateField: (payload: ChangeValidateFieldPayload) => void;
}

const EducationItems: React.FC<EducationItemsProps> = ({
  edit,
  educations,
  className,
  educationsErrors,
  onChange = () => {},
  onChangeValidateField = () => {}
}) => {
  const [translation] = useTranslation('provider-profile');
  const t = (key: string, option?: any) =>
    translation(`educationItem.${key}`, option);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openItem = (index: number) => () => setOpenIndex(index);
  useEffect(() => {
    if (!edit) {
      setOpenIndex(null);
    }
  }, [edit]);

  const handleAddNewEducation = () => {
    onChange([
      ...educations,
      {
        degree: '',
        schoolName: ''
      }
    ]);
    setOpenIndex(educations.length);
  };

  const handleFieldEdit = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'graduated') {
      onChange(
        educations.map((item, indexItem) =>
          index !== indexItem
            ? item
            : { ...item, graduated: +normalizeNumber(value) }
        )
      );
    } else {
      onChange(
        educations.map((item, indexItem) =>
          indexItem !== index ? item : { ...item, [name]: value }
        )
      );
    }
  };

  const handleDeleteEducation = (index: number) => () => {
    onChange(educations.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleUploadEducationImage = (index: number) => async (file: File) => {
    const photoUrl = await FilesApi.uploadOne(file);

    onChange(
      educations.map((item, itemIndex) =>
        itemIndex === index ? { ...item, photoUrl } : item
      )
    );
  };

  const handleDeleteEducationImage = (index: number) => () => {
    onChange(
      educations.map((item, itemIndex) =>
        itemIndex === index ? { ...item, photoUrl: '' } : item
      )
    );
  };

  return (
    <Container className={className}>
      <List>
        {educations.map((item, index) => {
          const open =
            openIndex === index || !!(educationsErrors && educationsErrors[index]);

          return (
            <Item key={index} $open={open}>
              <ImageDd
                size={open ? 'normal' : 'small'}
                imageUrl={item?.photoUrl || ''}
                onChange={handleUploadEducationImage(index)}
                onDelete={handleDeleteEducationImage(index)}
              />

              <InfoWrapper className={open ? 'open' : ''}>
                {open ? (
                  <>
                    <Row>
                      <DegreeInput
                        value={item.degree}
                        placeholder={t('degreeField.placeholder')}
                        name='degree'
                        onChange={e => {
                          openItem(index);
                          onChangeValidateField({
                            field: 'educationa',
                            subField: 'degree',
                            index
                          });
                          handleFieldEdit(index)(e);
                        }}
                        options={
                          (t('degreeField.options', {
                            returnObjects: true
                          }) as unknown) as string[]
                        }
                        errorMessage={
                          educationsErrors &&
                          educationsErrors[index]?.degree?.message
                        }
                      />
                      <GraduatedInput
                        value={item.graduated || ''}
                        mask={YEAR_INPUT_MASK}
                        name='graduated'
                        placeholder={t('graduatedField.placeholder')}
                        onChange={e => {
                          openItem(index);
                          onChangeValidateField({
                            field: 'educationa',
                            subField: 'graduated',
                            index
                          });
                          handleFieldEdit(index)(e);
                        }}
                        errorMessage={
                          educationsErrors &&
                          educationsErrors[index]?.graduated?.message
                        }
                      />
                    </Row>
                    <SchoolNameInput
                      value={item.schoolName}
                      placeholder={t('schoolNameField.placeholder')}
                      name='schoolName'
                      onChange={e => {
                        openItem(index);
                        onChangeValidateField({
                          field: 'educationa',
                          subField: 'schoolName',
                          index
                        });
                        handleFieldEdit(index)(e);
                      }}
                      options={
                        (t('schoolNameField.options', {
                          returnObjects: true
                        }) as unknown) as string[]
                      }
                      errorMessage={
                        educationsErrors &&
                        educationsErrors[index]?.schoolName?.message
                      }
                    />
                  </>
                ) : (
                  <>
                    <DegreeValue>{item.degree}</DegreeValue>
                    <Row>
                      <SchoolNameValue>{item.schoolName}</SchoolNameValue>
                      <GraduatedValue>{item.graduated || ''}</GraduatedValue>
                    </Row>
                  </>
                )}
              </InfoWrapper>

              {edit && (
                <ActionWrapper $open={open}>
                  {open ? (
                    <DeleteBtn onClick={handleDeleteEducation(index)} />
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
        <AddNewItem icon={<PlusIcon />} onClick={handleAddNewEducation}>
          {t('addEducationBtnLabel')}
        </AddNewItem>
      )}
    </Container>
  );
};

export default EducationItems;
