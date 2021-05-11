import React from 'react';

import { Modal, ModalProps } from 'components/Modals/index';
import { Typography } from 'components/Typography';

import { Button } from '../../Buttons';
import { Content, TextArea } from './TextFieldModal.styled';

type TextFieldModalProps = Omit<ModalProps, 'children' | 'actions'> & {
  text: string;
  cancelBtnLabel: string;
  saveBtnLabel: string;
  onSave: (text: string) => void;
  subTitle?: string;
  onCancel?: () => void;
};

const TextFieldModal: React.FC<TextFieldModalProps> = ({
  subTitle,
  text: initialText,
  cancelBtnLabel,
  saveBtnLabel,
  onSave,
  onCancel,
  ...props
}) => {
  const [text, setText] = React.useState(initialText);

  const textNotChanged = initialText === text;
  const saveBtnDisabled = textNotChanged || !text.length;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    onSave(text);
  };

  return (
    <Modal
      actions={[
        <Button variant='additional' onClick={onCancel}>
          {cancelBtnLabel}
        </Button>,
        <Button onClick={handleSave} disabled={saveBtnDisabled}>
          {saveBtnLabel}
        </Button>
      ]}
      maxWidth={60}
      {...props}
    >
      <Content>
        {subTitle && <Typography variant='body'>{subTitle}</Typography>}

        <TextArea value={text} onChange={handleChange} />
      </Content>
    </Modal>
  );
};

export default TextFieldModal;
