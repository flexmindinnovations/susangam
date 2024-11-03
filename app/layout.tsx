import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";

import { siteConfig } from "@/app/config/site";
import { fontSans } from "@/app/config/fonts";
import React from "react";
import HeaderWrapper from "@/app/components/header/headerWrapper";
import { ApiConfigProvider } from "@/app/utility/apiConfig";
import { AuthProvider } from "@/app/context/authContext";
import { Toaster } from 'react-hot-toast';
import FooterWrapper from "./components/footer/footerWrapper";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ]
};

export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
    <head />
    <body
      className={clsx(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
    <Providers themeProps={{ attribute: "class", defaultTheme: "system" }}>
      <ApiConfigProvider>
        <AuthProvider>
          <div className="w-screen h-screen">
            <main className="container
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            w-full h-[calc(100vh_-_72px)]">
            <HeaderWrapper />
              <Toaster position={"top-center"} />
              {children}
              <FooterWrapper/>
            </main> 
          </div>  
        </AuthProvider>
      </ApiConfigProvider>
    </Providers>
    </body>
    </html>
  );
}
