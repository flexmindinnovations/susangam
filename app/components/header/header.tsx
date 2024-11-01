"use client";
import React, { useEffect, useState } from "react";
import { MENU_ITEMS, MenuItem, USER_MENU } from "@/app/utility/menu-items";
import {
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Skeleton
} from "@nextui-org/react";
import { utility } from "@/app/utility/utils";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useAuth } from "@/app/context/authContext";
import { Binoculars, BookHeart, FolderClock, LogOut, SquareUserRound } from "lucide-react";
import { timer } from "rxjs";

const HeaderComponent = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [userMenuItems, setUserMenuItems] = useState<MenuItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const { user, fetchUserDetails, logoutUser, isAuthenticated } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "User",
    email: "user@email.com"
  });
  const router = useRouter();
  const dummyArray = Array.from({ length: 5 }, (_, i) => i + 1);

  useEffect(() => {
    const activeMenuItemId = localStorage.getItem("activeItem") || 1;
    const updatedMenuItems = MENU_ITEMS.map((item) => {
      return {
        ...item,
        active: +activeMenuItemId > -1 ? +activeMenuItemId === item.id ? true : false : false
      };
    });
    setMenuItems(updatedMenuItems);

    const activeUserMenuItemId = localStorage.getItem("activeUserItem") || -1;
    const updatedUserMenuItems = USER_MENU.map((item: MenuItem) => {
      return {
        ...item,
        active: +activeUserMenuItemId > -1 ? +activeUserMenuItemId === item.id ? true : false : false
      };
    });
    setUserMenuItems(updatedUserMenuItems);

    const isSignedIn = async () => await isAuthenticated();
    isSignedIn().then(async (response: any) => {
      setIsLoggedIn(response);
      if (response) {
        await fetchUserDetails().then((_user: any) => {
          if (_user) {
            const { personalInfoModel, contactInfoModel } = _user;
            const { firstName, middleName, lastName } = personalInfoModel;
            const { emailId } = contactInfoModel;
            const fullName = firstName + " " + middleName + " " + lastName;
            setUserInfo({
              name: fullName,
              email: emailId
            });
          }
        });
      }
      timer(100).subscribe(() => {
        setIsLoading(false);
      });
    });

  }, []);

  const handleRedirect = (route: string) => router.push(route);

  const handleMenuClick = (item: MenuItem) => {
    localStorage.setItem("activeItem", JSON.stringify(item.id));
    const updatedItems = menuItems.map((menuItem) =>
      menuItem.id === item.id
        ? { ...menuItem, active: true }
        : { ...menuItem, active: false }
    );
    setMenuItems(updatedItems);
    setIsMenuOpen(false);
  };

  const handleShowUserPanel = (event: any) => {
    setShowUserPanel(event);
    if (event) {
      setTimeout(() => {
        const xpath = "/html/body/div[2]/div/div";
        const lastDiv: HTMLDivElement | any = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (lastDiv) {
          lastDiv.style.opacity = "1";
        }
      }, 100);
    }
  };

  const handleUserLogout = () => {
    setIsLoggedIn(false);
    logoutUser();
  };

  if (isLoading) {
    return (
      <div className="h-[72px] w-full flex items-center justify-between max-w-5xl mx-auto gap-5">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex items-center justify-end gap-5">
          {
            dummyArray.map((item) => (
              <Skeleton key={item} className="h-8 w-24 rounded-full" />
            ))
          }
          {
            isLoggedIn && (
              <Skeleton className="h-12 w-12 ml-8 rounded-full" />
            )
          }
          {
            !isLoggedIn && (
              <div className={`flex items-center justify-center gap-5`}>
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            )
          }
        </div>
      </div>
    );
  }

  return (
    <Navbar
      key={isLoggedIn ? "logged-in" : "logged-out"}
      classNames={{
        item: [
          "flex",
          "relative",
          "items-center",
          "gap-0",
          "!text-sm",
          "rounded-full",
          "data-[active=true]:bg-blue-100",
          "data-[active=true]:text-500"
        ]
      }}
      position="static"
      popover="auto"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Link href="/home" onClick={() => handleMenuClick(menuItems[0])}>
          <p className="font-bold text-inherit">{utility.domain}</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify={isLoggedIn ? "end" : "center"} className="hidden lg:flex">
        {
          menuItems.map((menuItem, index) => {
            return (
              <NavbarItem
                as={"li"}
                className={`${menuItem.active ? "!bg-primary text-white" : ""} cursor-pointer py-2 px-3`}
                data-active={menuItem.active ? "true" : "false"}
                key={`${menuItem.id}-${index}`}>
                <Link
                  className={`${menuItem.active ? "!bg-primary text-white" : ""} min-w-16 flex items-center justify-center !text-base font-normal`}
                  size={"lg"}
                  onClick={() => handleMenuClick(menuItem)}
                  href={menuItem.route}
                >
                  {menuItem.name}
                </Link>
              </NavbarItem>
            );
          })
        }
      </NavbarContent>

      {/* User Menu */}
      {
        !isLoading && isLoggedIn && (
          <NavbarContent as="div" className={"opacity-100 ml-4 !flex-grow-0"} justify="end">
            <Dropdown showArrow type="menu" onOpenChange={handleShowUserPanel} isOpen={showUserPanel} placement="bottom">
              <DropdownTrigger className="opacity-100">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions">
                <DropdownItem as={"div"} key="userInfo"
                              className="flex !w-full flex-col items-start justify-start pointer-events-none py-2 gap-2">
                  <p className="font-semibold text-xs opacity-70 select-none !font-base">Signed in as</p>
                  <p className="font-semibold text-lg !font-base">{userInfo.name}</p>
                  <p className="font-semibold !font-base">{userInfo.email}</p>
                </DropdownItem>
                <DropdownSection>
                  <DropdownItem key="profile" href="/profile" startContent={<SquareUserRound size={18} />}>
                    <p className="text-base">
                      Profile
                    </p>
                  </DropdownItem>
                  <DropdownItem key="publicProfile" href="/publicProfile" startContent={<Binoculars size={18} />}>
                    <p className="text-base">
                      Public Profile
                    </p>
                  </DropdownItem>
                  <DropdownItem key="favouriteProfile" href="/favouriteProfile" startContent={<BookHeart size={18} />}>
                    <p className="text-base">
                      Manage Favourite Profiles
                    </p>
                  </DropdownItem>
                  <DropdownItem key="profileHistory" href="/profileHistory" startContent={<FolderClock size={18} />}>
                    <p className="text-base">
                      Profile View History
                    </p>
                  </DropdownItem>
                </DropdownSection>
                <DropdownItem className={`pointer-events-none`}>
                  <Divider orientation="horizontal" />
                </DropdownItem>
                <DropdownSection aria-label="Logout" title={""}>
                  <DropdownItem key="logout" color="danger"
                                startContent={<LogOut size={18} />}
                                onClick={() => handleUserLogout()}
                  >
                    <p className="text-base">
                      Log Out
                    </p>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        )
      }

      {/* Login Register Actions */}

      {
        !isLoading && !isLoggedIn && (
          <NavbarContent justify="end" className={`opacity-0 ${isLoggedIn ? "opacity-0" : "opacity-100"}`}>
            <NavbarItem className="mr-1">
              <Button as={Link} color="primary" variant="bordered" radius={"full"} href="/login">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="secondary" radius={"full"} href="/register">
                Register
              </Button>
            </NavbarItem>
          </NavbarContent>
        )
      }


      <NavbarMenu className="!h-auto !w-autos">
        {menuItems.map((menuItem, index) => (
          <NavbarMenuItem key={`${menuItem.id}-${index}`}>
            <Link
              size={"lg"}
              onClick={() => handleMenuClick(menuItem)}
              href={menuItem.route}
            >
              {menuItem.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default HeaderComponent;
