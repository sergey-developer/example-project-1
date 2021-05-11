import React from 'react';
import { useTranslation } from 'react-i18next';

import { SidebarNavItem } from 'shared/types';

import {
  Container,
  SidebarNavigationIcon,
  SidebarNavigationItem,
  SidebarNavigationLabel,
  SidebarNavigationLink,
  SidebarNavigationList
} from './SidebarNavigation.styled';

interface SidebarNavigationProps {
  className?: string;
  items: SidebarNavItem[];
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  className,
  items
}) => {
  const [t] = useTranslation('common');
  const normalItems = items.filter(item => !item.soon);
  const soonItems = items.filter(item => item.soon);
  return (
    <Container className={className}>
      <SidebarNavigationList>
        {normalItems.map(({ label, icon, soon, ...item }) => (
          <SidebarNavigationItem key={label}>
            <SidebarNavigationLink soon={soon} {...item}>
              {icon && <SidebarNavigationIcon name={icon} />}
              <SidebarNavigationLabel className='nav-label'>
                {label}
              </SidebarNavigationLabel>
            </SidebarNavigationLink>
          </SidebarNavigationItem>
        ))}

        {!!soonItems.length && (
          <>
            {soonItems.map(({ label, icon, soon, ...item }) => (
              <SidebarNavigationItem key={label}>
                <SidebarNavigationLink as='div' soon={soon} {...item}>
                  {icon && <SidebarNavigationIcon name={icon} />}
                  <SidebarNavigationLabel className='nav-label'>
                    {label}
                  </SidebarNavigationLabel>
                </SidebarNavigationLink>
              </SidebarNavigationItem>
            ))}
          </>
        )}
      </SidebarNavigationList>
    </Container>
  );
};
