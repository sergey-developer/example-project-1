import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import { InputWithLabel } from 'components/InputWithLabel';
import { RadioHorizontal } from 'components/Radio';
import { Nullable } from 'shared/types';
import { ProviderProfileDto } from 'shared/types/generate';
import { SetSimpleFieldPayload } from 'state/ducks/createProvider';

import SimilarProfilesList from '../SimilarProfilesList/SimilarProfilesList';
import {
  ActionW,
  BackButton,
  Container,
  FormTitle,
  InputLabel,
  NextButton,
  SimilarTitle,
  SimilarWrapper
} from './Common.styled';

export const RadioBtn = styled(RadioHorizontal)`
  margin-bottom: 2.4rem;
`;

interface ProviderTypeFormProps {
  className?: string;
  similarProfiles: ProviderProfileDto[];
  onChange: (payload: SetSimpleFieldPayload) => void;
  isIndividual: Nullable<boolean>;
  nameValue: Nullable<string>;
  goNextStep?: () => void;
  goBackStep?: () => void;
  onChangeName?: (name: string) => void;
}

const ProviderTypeForm: React.FC<ProviderTypeFormProps> = ({
  className,
  onChange,
  isIndividual,
  nameValue,
  similarProfiles,
  onChangeName = () => {},
  goBackStep = () => {},
  goNextStep = () => {}
}) => {
  const [translation] = useTranslation('provider-pages');

  const t = (key: string) => translation(`createProviderPage.${key}`);

  const handleChangeType = (value: any) => {
    onChange({
      isIndividual: value?.isIndividual === 'true' ? true : false
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeName(e?.target?.value);
  };

  const items = useMemo(
    () => [
      {
        label: t('organizationLabel'),
        value: 'false'
      },
      {
        label: t('selfEemployedLabel'),
        value: 'true'
      }
    ],
    [t]
  );

  const isFormFull = !!nameValue && isIndividual != null;

  return (
    <Container className={className}>
      <FormTitle>{t('providerTypeLabel')}</FormTitle>
      <RadioBtn
        items={items}
        name={'isIndividual'}
        value={isIndividual === null ? '' : isIndividual ? 'true' : 'false'}
        onChange={handleChangeType}
      />

      <InputWithLabel
        labelNode={<InputLabel />}
        onlyMobile
        name='name'
        type='text'
        value={nameValue || ''}
        onChange={handleNameChange}
        label={t('providerNameField.label')}
        placeholder={t('providerNameField.placeholder')}
      />

      <ActionW>
        <BackButton onClick={goBackStep}>{t('backBtnLabel')}</BackButton>
        <NextButton
          onClick={() => isFormFull && goNextStep()}
          disabled={!isFormFull}
        >
          {t('nextBtnLabel')}
        </NextButton>
      </ActionW>

      {!!similarProfiles?.length && (
        <SimilarWrapper>
          <SimilarTitle>{t('similarItemsTitle')}</SimilarTitle>
          <SimilarProfilesList profileList={similarProfiles} />
        </SimilarWrapper>
      )}
    </Container>
  );
};

export default ProviderTypeForm;
