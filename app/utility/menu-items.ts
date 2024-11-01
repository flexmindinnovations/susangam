import { CollectionElement } from "@react-types/shared";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Home",
    icon: "home",
    route: "/home",
    active: false
  },
  {
    id: 2,
    name: "About",
    icon: "info",
    route: "/about",
    active: false
  },
  {
    id: 3,
    name: "Contact",
    icon: "contact_mail",
    route: "/contact",
    active: false
  },
  {
    id: 4,
    name: "Blog",
    icon: "article",
    route: "/blog",
    active: false
  },
  {
    id: 5,
    name: "Events",
    icon: "event",
    route: "/events",
    active: false
  }
];

export const USER_MENU: any[] = [
  {
    key: "profile",
    label: "Profile",
    name: "Profile",
    icon: "profile",
    route: "/profile",
    active: false
  },
  {
    key: "public",
    label: "Public Profile",
    name: "Public Profile",
    icon: "public",
    route: "/public-profile",
    active: false
  },
  {
    key: "favourite",
    label: "Manage Favourite Profiles",
    name: "Manage Favourite Profiles",
    icon: "favourite",
    route: "/manage-favourites",
    active: false
  },
  {
    key: "history",
    label: "Profile View History",
    name: "Profile View History",
    icon: "history",
    route: "/profile-view-history",
    active: false
  }
];

export interface MenuItem {
  id: number;
  key?: string;
  label?: string;
  name: string;
  icon: string;
  route: string;
  active: boolean;
}
