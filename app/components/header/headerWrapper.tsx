"use client";
import { usePathname } from "next/navigation";
import HeaderComponent from "@/app/components/header/header";
import { useApiConfig } from "@/app/utility/apiConfig";

const HeaderWrapper = () => {
  const pathName = usePathname();
  if (pathName === "/login" || pathName === "/register") return null;
  return <HeaderComponent />;
};

export default HeaderWrapper;