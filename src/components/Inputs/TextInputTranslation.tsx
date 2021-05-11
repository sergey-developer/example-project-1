import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AdditionalInputs,
  Input,
  LangSelectW,
  OpenClose,
  Row,
  ShowTranslation,
  Wrapper
} from './TextInputTranslation.styled';

interface TextInputTranslationProps {
  edit?: boolean;
  className?: string;
  name?: string;
  onDoubleClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  errorMessage?: string;
}

export const TextInputTranslation: React.FC<TextInputTranslationProps> = ({
  edit,
  className,
  value,
  name,
  errorMessage,
  onChange = () => {},
  onDoubleClick = () => {}
}) => {
  const lang = ['en', 'ru', 'ua'];

  let [t] = useTranslation('common');

  const [additional, setAdditional] = useState(false);

  const toggleShowAdditional = () => setAdditional(value => !value);
  return (
    <Wrapper className={className}>
      <Row>
        <Input
          edit={edit}
          name={name}
          value={value}
          onDoubleClick={onDoubleClick}
          onChange={onChange}
          errorMessage={errorMessage || ''}
        />

        <LangSelectW>English</LangSelectW>
        {/* <ShowTranslation onClick={toggleShowAdditional}>
          {t(additional ? 'labels.hideTranslations' : 'labels.showTranslations')}
        </ShowTranslation>
        <OpenClose $open={additional} onClick={toggleShowAdditional} color='warn' /> */}
      </Row>
      {/* <AdditionalInputs $open={additional}>
        {lang.map((item, index) => (
          <Row key={index}>
            <Input edit={edit} value={value} onDoubleClick={onDoubleClick} />
            <LangSelectW>English</LangSelectW>
          </Row>
        ))}
      </AdditionalInputs> */}
    </Wrapper>
  );
};
