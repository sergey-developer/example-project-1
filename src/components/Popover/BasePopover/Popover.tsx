import React from 'react';
import {
  ArrowContainer,
  ArrowContainerProps,
  Popover as BasePopover,
  PopoverProps as BasePopoverProps
} from 'react-tiny-popover';

import { useVisible } from 'shared/hooks';

import { ChildrenWrapper } from './Popover.styled';

type ContentProps = { close: () => void };

export type PopoverProps = Omit<
  BasePopoverProps,
  'isOpen' | 'content' | 'children'
> &
  Partial<Pick<ArrowContainerProps, 'arrowSize' | 'arrowColor'>> & {
    content: (props: ContentProps) => React.ReactNode;
    children: React.ReactNode;
    isCloseOnClickOutside?: boolean;
    withArrow?: boolean;
    className?: string;
  };

const Popover: React.FC<PopoverProps> = ({
  content,
  padding = 5,
  positions = ['bottom'],
  reposition = false,
  onClickOutside,
  isCloseOnClickOutside = true,
  withArrow = true,
  arrowSize = 10,
  arrowColor = '#ffffff',
  className,
  children,
  ...props
}) => {
  const [opened, , close, toggleOpen] = useVisible(false);

  const handleClickOutside = (event: MouseEvent) => {
    isCloseOnClickOutside && close();
    onClickOutside && onClickOutside(event);
  };

  return (
    <BasePopover
      isOpen={opened}
      positions={positions}
      reposition={reposition}
      onClickOutside={handleClickOutside}
      padding={padding}
      content={props => {
        const theContent = content({ close });

        return withArrow ? (
          <ArrowContainer {...props} arrowSize={arrowSize} arrowColor={arrowColor}>
            <>{theContent}</>
          </ArrowContainer>
        ) : (
          <>{theContent}</>
        );
      }}
      {...props}
    >
      <ChildrenWrapper className={className} onClick={() => toggleOpen()}>
        {children}
      </ChildrenWrapper>
    </BasePopover>
  );
};

export default Popover;
