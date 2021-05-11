import React from 'react';

import { ReactComponent as ReviewsIcon } from 'assets/icons/MessageIcon.svg';
import { ReactComponent as BillPay } from 'assets/icons/sidebar/BillPay.svg';
import { ReactComponent as BillShield } from 'assets/icons/sidebar/BillShield.svg';
import { ReactComponent as CostsEstimation } from 'assets/icons/sidebar/CostsEstimation.svg';
import { ReactComponent as DashboardIcon } from 'assets/icons/sidebar/DashboardIcon.svg';
import { ReactComponent as DocumetIcon } from 'assets/icons/sidebar/DocumetIcon.svg';
import { ReactComponent as FavoritesIcon } from 'assets/icons/sidebar/FavoritesIcon.svg';
import { ReactComponent as HelpIcon } from 'assets/icons/sidebar/HelpIcon.svg';
import { ReactComponent as LegalIcon } from 'assets/icons/sidebar/LegalIcon.svg';
import { ReactComponent as LocationsIcon } from 'assets/icons/sidebar/LocationsIcon.svg';
import { ReactComponent as PhotosIcon } from 'assets/icons/sidebar/PhotosIcon.svg';
import { ReactComponent as PreauthorizationsIcon } from 'assets/icons/sidebar/PreauthorizationsIcon.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/sidebar/ProfileIcon.svg';
import { ReactComponent as ReferralsIcon } from 'assets/icons/sidebar/ReferralsIcon.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/sidebar/SettingsIcon.svg';
import { ReactComponent as StoreIcon } from 'assets/icons/sidebar/StoreIcon.svg';
import { ReactComponent as TeamIcon } from 'assets/icons/sidebar/TeamIcon.svg';
import { ReactComponent as TelemedicineIcon } from 'assets/icons/sidebar/TelemedicineIcon.svg';
import { ReactComponent as UserAccessIcon } from 'assets/icons/sidebar/UserAccessIcon.svg';

export type SidebarIconNames = keyof typeof iconsMap;

const iconsMap = {
  dashboard: DashboardIcon,
  profile: ProfileIcon,
  legal: LegalIcon,
  locations: LocationsIcon,
  photos: PhotosIcon,
  reviews: ReviewsIcon,
  settings: SettingsIcon,
  team: TeamIcon,
  userAccess: UserAccessIcon,
  favorites: FavoritesIcon,
  help: HelpIcon,
  telemedicine: TelemedicineIcon,
  store: StoreIcon,
  appointmentBooking: DocumetIcon,
  referrals: ReferralsIcon,
  preauthorizations: PreauthorizationsIcon,
  billPay: BillPay,
  billShield: BillShield,
  costsEstimation: CostsEstimation
};

interface SidebarIconProps extends React.SVGProps<SVGSVGElement> {
  name: SidebarIconNames;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ name, ...props }) => {
  const Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> =
    iconsMap[name];

  return <Icon {...props} />;
};

export default SidebarIcon;
