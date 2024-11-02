"use client";
import React, { createContext, useContext, useMemo } from "react";

// Define the endpoint type
type endpoint = "customer";

export type ApiConfigType = {
  customer: {
    login: string;
    register: string;
    getCustomerById: (customerId: string | number) => string;
    getCustomerForPDFById: (customerId: string | number) => string;
  },
  profile: {
    getRandomProfiles: string;
  },
  location: {
    city: (stateId: string | "") => string,
    state: (countryId: string | "") => string,
    country: string,
  },
  shared: {
    bloodGroup: string,
    getFoodPreferenceList: string,
    getMotherTongueList: string,
    getOccupationList: string,
    getOccupationById: (occupationId: string | number) => string,
    getReligionList: string,
    getHeightList: string,
    getEducationList: string,
    getSpecializationList: string,
    getSpecializationListByEducationId: (educationId: string | number) => string,
  }
};

const ApiConfigContext = createContext<ApiConfigType | null>(null);

export const ApiConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const hostUrl = process.env.NEXT_PUBLIC_API_URL; // Ensure this environment variable is set

  const apiConfig: ApiConfigType = useMemo(() => ({
    customer: {
      login: `/Customer/createcustomerToken`,
      register: `/Customer/signup`,
      getCustomerById: (customerId: string | number) => `/Customer/GetCustomerById/${customerId}`,
      getCustomerForPDFById: (customerId: string | number) => `/Customer/GetCustomerForPDFById/${customerId}`
    },
    profile: {
      getRandomProfiles: `/Dashboard/getRandomCustomerList`
    },
    location: {
      country: `/Country/GetCountries`,
      state: (countryId = "") => `/State/getStateListCountryIdWise?countyId=${countryId}`,
      city: (stateId = "") => `/City/getCityListStateIdWise?stateId=${stateId}`
    },
    shared: {
      bloodGroup: `/BloodGroup/GetBloodGroupList`,
      getFoodPreferenceList: `/FoodPreferences/getFoodPreferencesList`,
      getMotherTongueList: `/MotherTongue/getMotherTongueList`,
      getOccupationList: `/Occupation/getOccupationList`,
      getOccupationById: (occupationId: string | number) => `/Occupation/getOccupationById?occupationId=${occupationId}`,
      getReligionList: `/Religion/getReligionList`,
      getHeightList: `/Height/getHeightList`,
      getEducationList: `/Education/GetEducationList`,
      getSpecializationList: `/Specialization/GetSpecializationList`,
      getSpecializationListByEducationId: (educationId: string | number) => `/Education/GetSpecializationListByEducationId?educationId=${educationId}`
    }
  }), []);

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
