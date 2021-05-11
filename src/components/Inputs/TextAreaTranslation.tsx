import React from 'react';

import { LangSelectW, Row, TextArea, Wrapper } from './TextAreaTranslation.styled';

interface TextAreaTranslationProps {
  className?: string;
  value: string;
  name?: string;
  edit?: boolean;
  errorMessage?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const TextAreaTranslation: React.FC<TextAreaTranslationProps> = ({
  value,
  edit,
  name,
  placeholder,
  errorMessage,
  onChange = () => {},
  onDoubleClick = () => {}
}) => {
  return (
    <Wrapper>
      <Row>
        <TextArea
          value={value}
          edit={edit}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onDoubleClick={onDoubleClick}
          errorMessage={errorMessage}
        />
        {/* <LangSelectW>Primary</LangSelectW> */}
      </Row>
    </Wrapper>
  );
};
