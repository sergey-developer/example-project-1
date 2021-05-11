import React, { useState } from 'react';
import { Popover, PopoverPosition } from 'react-tiny-popover';
import { useTheme } from 'styled-components';

import { ArrowHintContainer, HintContainer, InfoIcon } from './InfoHint.styled';

interface InfoHintProps {
  className?: string;
  hintNode: React.ReactNode;
  positions?: Exclude<PopoverPosition, 'custom'>[];
}

const InfoHint: React.FC<InfoHintProps> = ({
  className,
  hintNode,
  positions = ['right', 'right', 'left', 'bottom']
}) => {
  const [isOpen, setOpen] = useState(false);

  const toggleOpenClose = () => setOpen(value => !value);
  const closeHint = () => setOpen(false);

  const theme = useTheme();

  return (
    <Popover
      isOpen={isOpen}
      positions={positions}
      padding={10}
      reposition={false}
      onClickOutside={closeHint}
      content={props => (
        <ArrowHintContainer
          {...props}
          arrowColor={theme.colors.rollingStone}
          arrowSize={5}
        >
          <HintContainer>{hintNode}</HintContainer>
        </ArrowHintContainer>
      )}
    >
      <InfoIcon className={className} onClick={toggleOpenClose} />
    </Popover>
  );
};

export default InfoHint;
