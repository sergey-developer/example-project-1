import React from 'react';

import Popover, { PopoverProps } from '../BasePopover/Popover';
import { ContentContainer, ContentItem } from './PopoverMenu.styled';

type PopoverMenuProps = Omit<PopoverProps, 'content'> & {
  menuComponent: React.ReactElement;
  isCloseOnClickItem?: boolean;
};

const PopoverMenu: React.FC<PopoverMenuProps> = ({
  menuComponent,
  positions = ['bottom'],
  isCloseOnClickItem = true,
  children,
  ...props
}) => {
  return (
    <Popover
      positions={positions}
      content={({ close }) => {
        return (
          <ContentContainer>
            {React.Children.map(children, child => (
              <ContentItem onClick={isCloseOnClickItem ? close : undefined}>
                {child}
              </ContentItem>
            ))}
          </ContentContainer>
        );
      }}
      {...props}
    >
      {menuComponent}
    </Popover>
  );
};

export default PopoverMenu;
