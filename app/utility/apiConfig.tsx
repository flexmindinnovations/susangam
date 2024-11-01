"use client";
import React, { createContext, useContext, useMemo } from "react";

// Define the endpoint type
type endpoint = "customer";

// Define the API configuration type
export type ApiConfigType = {
  customer: {
    login: string;
    register: string;
    getCustomerById: (customerId: string | number) => string | null;
    getCustomerForPDFById: (customerId: string | number) => string | null;
  },
  profile: {
    getRandomProfiles: string;
  }
};

// Create the context
const ApiConfigContext = createContext<ApiConfigType | null>(null);

export const ApiConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const hostUrl = process.env.NEXT_PUBLIC_API_URL; // Ensure this environment variable is set

  const apiConfig: ApiConfigType = useMemo(() => ({
    customer: {
      login: `${hostUrl}/Customer/createcustomerToken`,
      register: `${hostUrl}/Customer/signup`,
      getCustomerById: (customerId: string | number) => `${hostUrl}/Customer/GetCustomerById/${customerId}`,
      getCustomerForPDFById: (customerId: string | number) => `${hostUrl}/Customer/GetCustomerForPDFById/${customerId}`,
    },
    profile: {
      getRandomProfiles: `${hostUrl}/Dashboard/getRandomCustomerList`
    }
  }), [hostUrl]);

  return (
    <ApiConfigContext.Provider value={apiConfig}>
      {children}
    </ApiConfigContext.Provider>
  );
};

// Custom hook to use the API config
export const useApiConfig = () => {
  const context = useContext(ApiConfigContext);
  if (!context) {
    throw new Error("useApiConfig must be used within an ApiConfigProvider");
  }
  return context;
};
