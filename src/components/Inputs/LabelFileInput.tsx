import React, { useRef } from 'react';
import styled from 'styled-components/macro';

import { Typography, TypographyProps } from 'components/Typography';

const Label = styled(Typography)`
  cursor: pointer;
`;

const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
`;

interface LabelFileInputProps extends TypographyProps {
  accept?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelFileInput: React.FC<LabelFileInputProps> = ({
  accept,
  name,
  onChange = () => {},
  ...rest
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  return (
    <>
      <FileInput
        accept={accept}
        name={name}
        onChange={onChange}
        ref={fileInputRef}
      />
      <Label {...rest} onClick={openFileDialog} />
    </>
  );
};

export default LabelFileInput;
