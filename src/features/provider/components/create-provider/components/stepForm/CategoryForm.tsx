import React from 'react';
import { useTranslation } from 'react-i18next';

import { RadioList } from 'components/Radio';
import { Nullable } from 'shared/types';
import { ProvidersCategoryRecordDto } from 'shared/types/generate';

import { Container } from './CategoryForm.styled';
import { ActionW, BackButton, FormTitle, NextButton } from './Common.styled';

interface CategoryFormProps {
  categoriesList: ProvidersCategoryRecordDto[];
  selectCategoryId: Nullable<number>;
  onSetCategory: (categoryId: number) => void;
  goNextStep: () => void;
  goBackStep: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  categoriesList,
  selectCategoryId,
  onSetCategory,
  goNextStep,
  goBackStep
}) => {
  const [translation] = useTranslation('provider-pages');

  const t = (key: string) => translation(`createProviderPage.${key}`);

  const items = React.useMemo(
    () => categoriesList.map(item => ({ label: item.text, value: item.id })),
    [categoriesList]
  );

  const handlerSelectCategory = (value: number | string) => {
    onSetCategory(+value);
  };

  return (
    <Container>
      <FormTitle>{t('selectCategoryTitle')}</FormTitle>
      <RadioList
        items={items}
        name='category'
        value={selectCategoryId}
        onSelect={handlerSelectCategory}
      />
      <ActionW>
        <BackButton onClick={goBackStep}>{t('backBtnLabel')}</BackButton>
        <NextButton
          disabled={!selectCategoryId}
          onClick={() => selectCategoryId && goNextStep()}
        >
          {t('nextBtnLabel')}
        </NextButton>
      </ActionW>
    </Container>
  );
};

export default CategoryForm;
