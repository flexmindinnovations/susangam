"use client";
import { usePathname } from "next/navigation";
import FooterComponent from "@/app/components/footer/page";
import { useApiConfig } from "@/app/utility/apiConfig";

const FooterWrapper = () => {
  const pathName = usePathname();
  if (pathName === "/login" || pathName === "/register") return null;
  return <FooterComponent />;
};

export default FooterWrapper;