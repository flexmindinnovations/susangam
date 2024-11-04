"use client";
import { Button, Card, CardHeader, Spinner, Tab, Tabs } from "@nextui-org/react";
import { utility } from "@/app/utility/utils";
import {
  BookUser,
  CircleEllipsis,
  Heart,
  MessageCircleMore,
  MessageSquareMore,
  Smartphone,
  UserIcon,
  UsersRound
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import PersonalInfo from "@/app/components/user-details/personal-info";
import FamilyInfo from "@/app/components/user-details/family-info";
import ContactInfo from "@/app/components/user-details/contact-info";
import OtherInfo from "@/app/components/user-details/other-info";
import http from "@/app/utility/axios-instance";
import { useApiConfig } from "@/app/utility/apiConfig";

interface TabItem<T> {
  key: string;
  title: T | string;
  route: string;
  component: T;
}

const UserDetails = React.memo(({ userDetails }: { userDetails: any }) => {
  const apiConfig = useApiConfig();
  const { contactInfoModel, personalInfoModel } = userDetails;
  const [occupation, setOccupation] = useState<any>("");
  const [occupationDetails, setOccupationDetails] = useState<any>("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");
  const [tabs, setTabs] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          bloodGroupData,
          heightListData,
          occupationListData,
          occupationDetailsData,
          educationListData,
          specializationListData,
          foodListData,
          religionListData,
          castListData,
          subCastListData,
          countryListData,
          stateListData,
          cityListData,
          motherTongueList
        ] = await Promise.all([
          http.get(apiConfig.shared.bloodGroup),
          http.get(apiConfig.shared.getHeightList),
          http.get(apiConfig.shared.getOccupationList),
          http.get(apiConfig.shared.getOccupationById(personalInfoModel.occupationId)),
          http.get(apiConfig.shared.getEducationList),
          http.get(apiConfig.shared.getSpecializationList),
          http.get(apiConfig.shared.getFoodPreferenceList),
          http.get(apiConfig.shared.getReligionList),
          http.get(apiConfig.shared.getCastList),
          http.get(apiConfig.shared.getSubCastList(userDetails['familyInfoModel'].castId)),
          http.get(apiConfig.location.country),
          http.get(apiConfig.location.state(userDetails['contactInfoModel'].countryId)),
          http.get(apiConfig.location.city(userDetails['contactInfoModel'].stateId)),
          http.get(apiConfig.shared.getMotherTongueList),
        ]);

        // Finding necessary items from each response
        const bloodGroup = bloodGroupData.data.find((item: any) => item.bloodGroupId === personalInfoModel.bloodGroupId);
        const height = heightListData.data.find((item: any) => item.heightId === personalInfoModel.heightId);
        const occupation = occupationListData.data.find((item: any) => item.occupationId === personalInfoModel.occupationId);
        const occupationDetails = occupationDetailsData.data.occupationDetailList
          .find((item: any) => item.occupationDetailId === personalInfoModel.occupationDetailId);
        const education = educationListData.data.find((item: any) => item.educationId === personalInfoModel.educationId);
        const specialization = specializationListData.data.find((item: any) => item.specializationId === personalInfoModel.specializationId);
        const food = foodListData.data.find((item: any) => item.foodId === personalInfoModel.foodPreferencesId);
        const religion = religionListData.data.find((item: any) => item.religionId === userDetails['familyInfoModel'].religionId);
        const cast = castListData.data.find((item: any) => item.castId === userDetails['familyInfoModel'].castId);
        const subCast = subCastListData.data.find((item: any) => item.subCastId === userDetails['familyInfoModel'].subCastId);
        const country = countryListData.data.find((item: any) => item.countryId === userDetails['contactInfoModel'].countryId);
        const state = stateListData.data.find((item: any) => item.stateId === userDetails['contactInfoModel'].stateId);
        const city = cityListData.data.find((item: any) => item.cityId === userDetails['contactInfoModel'].cityId);
        const motherTongue = motherTongueList.data.find((item: any) => item.motherTongueId === userDetails['otherInfoModel'].motherTongueId);
        setOccupation(occupation);
        setOccupationDetails(occupationDetails);
        const personalInfoExtended = {
          ...personalInfoModel,
          bloodGroup,
          height,
          occupation,
          occupationDetails,
          education,
          specialization,
          food
        };
        const familyInfoExtended = {
          ...userDetails["familyInfoModel"],
          religion,
          cast,
          subCast
        }
        const contactInfoExtended = {
          ...userDetails["contactInfoModel"],
          country,
          state,
          city,
        }
        const otherInfoExtended = {
          ...userDetails["otherInfoModel"],
          motherTongue
        }
        const _tabs = () => [
          {
            key: "personal",
            title: "Personal Information",
            icon: <UserIcon />,
            route: "personal",
            component: <PersonalInfo personalInfo={personalInfoExtended} />
          },
          {
            key: "family",
            title: "Family Information",
            icon: <UsersRound />,
            route: "family",
            component: <FamilyInfo familyInfo={familyInfoExtended} />
          },
          {
            key: "contact",
            title: "Contact Information",
            icon: <BookUser />,
            route: "contact",
            component: <ContactInfo contactInfo={contactInfoExtended} />
          },
          {
            key: "other",
            title: "Other Information",
            icon: <CircleEllipsis />,
            route: "other",
            component: <OtherInfo otherInfo={otherInfoExtended} />
          }
        ];
        setTabs(_tabs);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userDetails]);

  // Memoize the onSelectionChange handler
  const handleTabChange = useCallback((key: any) => setActiveTab(key), []);

  if (isLoading) {
    return (
      <div className="empty-wrapper">
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="right grid grid-cols-1 grid-rows-[18%_1fr] h-full w-full overflow-hidden">
      <Card className="w-full p-4 flex-[1_1_14%] rounded-none shadow-none border-none">
        <CardHeader className="flex p-0 items-start justify-between">
          <div className="basic-info flex flex-col items-start justify-start gap-2">
            <h1 className="text-lg lg:text-2xl font-bold flex flex-col items-start gap-1">
              {utility.getFullName(userDetails.personalInfoModel)}
              <span className="text-primary font-semibold text-xs">
                {occupation?.occupationName} - {occupationDetails?.occupationDetailName}
              </span>
            </h1>
            <div className="contact-information flex items-center justify-start gap-10">
              {contactInfoModel?.contactNumber && (
                <div className="mobile flex items-center justify-start gap-2">
                  <Smartphone className="h-4 w-4" />
                  <p className="text-sm">{contactInfoModel.contactNumber}</p>
                </div>
              )}
              {contactInfoModel?.whatsUpNumber && (
                <div className="whatsapp flex items-center justify-start gap-2">
                  <MessageCircleMore className="h-4 w-4" />
                  <p className="text-sm">{contactInfoModel?.whatsUpNumber}</p>
                </div>
              )}
            </div>
          </div>
          <div className="user-actions flex items-center justify-start gap-5">
            <Button
              startContent={isLoading ? "" : <MessageSquareMore className="h-4 w-4" />}
              variant="light"
              radius="full"
              size="md"
              color="secondary"
              type="submit"
              isLoading={isLoading}
              className="flex items-center justify-center"
            >
              Send Message
            </Button>
            <Button
              startContent={isLoading ? "" : <Heart className="h-4 w-4" />}
              variant="light"
              radius="full"
              size="md"
              color="secondary"
              type="submit"
              isLoading={isLoading}
              className="flex items-center justify-center"
            >
              Favourite
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="tabs-container w-full h-full flex-grow flex flex-col flex-wrap p-4">
        <Tabs radius="full" size="md" aria-label="Tabs radius" onSelectionChange={handleTabChange}>
          {tabs.map((tab: any) => (
            <Tab
              key={tab.key}
              title={
                <div className="flex items-center space-x-2">
                  {tab.icon}
                  <span>{tab.title}</span>
                </div>
              }
            >
              <div className="tab-content w-full h-full max-h-[calc(100vh-300px)] p-4 overflow-y-auto">
                {tabs.find((tab: any) => tab.key === activeTab)?.component}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
});

UserDetails.displayName = "UserDetails";
export default UserDetails;