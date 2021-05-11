import React from 'react';
import { useTranslation } from 'react-i18next';
import useToggle from 'react-use/lib/useToggle';

import { Button } from 'components/Buttons';
import { PageWrapper } from 'components/PageWrapper';
import { ProfileLegalModel } from 'features/provider/types';

import { InputWithLabelStyled } from './BankingPage.styled';

const inputs: {
  name: keyof ProfileLegalModel;
  tKey: string;
}[] = [
  {
    name: 'bankName',
    tKey: 'nameInput'
  },
  {
    name: 'bankAddress',
    tKey: 'addressInput'
  },
  {
    name: 'swift',
    tKey: 'swiftInput'
  },
  {
    name: 'accountNumber',
    tKey: 'accountNumberInput'
  },
  {
    name: 'routingNumber',
    tKey: 'routingNumberInput'
  },
  {
    name: 'accountHolderNmae',
    tKey: 'accountHolderNameInput'
  }
];

interface BankingPageProps {
  legalData?: ProfileLegalModel;
  onLegalChange?: (data: ProfileLegalModel) => void;
}

const BankingPage: React.FC<BankingPageProps> = ({
  legalData,
  onLegalChange = () => {}
}) => {
  const [translation] = useTranslation('provider-pages');
  const t = (key: string) => translation(`bankingPage.${key}`);
  const [editMode, setEditMode] = useToggle(true);
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event?.target?.name;
    const value = event?.target?.value;
    onLegalChange({
      [name]: value
    });
  };

  return (
    <PageWrapper
      title={t('title')}
      button={
        <Button onClick={setEditMode} variant={editMode ? 'primary' : 'secondary'}>
          {t(editMode ? 'finishEditBtnLabel' : 'editBtnLabel')}
        </Button>
      }
    >
      {inputs.map(item => (
        <InputWithLabelStyled
          key={item.name}
          label={t(`${item.tKey}.label`)}
          placeholder={t(`${item.tKey}.label`)}
          name={item.name}
          value={(legalData && legalData[item.name]) || ''}
          edit={!editMode}
          onChange={handleFieldChange}
        />
      ))}
    </PageWrapper>
  );
};

export default BankingPage;
