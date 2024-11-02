import React from "react";
import { useApiConfig } from "@/app/utility/apiConfig";
import { utility } from "@/app/utility/utils";

const PersonalInfo = React.memo(({ personalInfo }: { personalInfo: any }) => {
  const apiConfig = useApiConfig();
  const {
    bloodGroup,
    height,
    occupation,
    occupationDetails,
    education,
    specialization,
    food,
    ...rest
  } = personalInfo;
  if (personalInfo.hasOwnProperty("personalInfoId")) delete personalInfo.personalInfoId;
  if (personalInfo.hasOwnProperty("mobileNo")) delete personalInfo.mobileNo;

  const formatField = (key: string, value: string | any) => {
    switch (key) {
      case "heightId":
        return { label: "Height", value: height?.heightName };
      case "educationId":
        return { label: "Education", value: education?.educationName };
      case "specializationId":
        return { label: "Specialization", value: specialization?.occupationDetailName };
      case "foodPreferencesId":
        return { label: "Food Preference", value: food?.foodName };
      case "occupationId":
        return { label: "Occupation", value: occupation?.occupationName };
      case "occupationDetailId":
        return { label: "Occupation Detail", value: occupationDetails?.occupationDetailName };
      case "bloodGroupId":
        return { label: "Blood Group", value: bloodGroup?.bloodGroupName };
      case "dateOfBirth":
        return { label: "Birthday", value: new Date(value).toLocaleDateString() };
      case "timeOfBirth":
        return { label: "Time Of Birth", value: utility.getTimeFromDate(value) };
      case "gender":
        return { label: "Gender", value: value.charAt(0).toUpperCase() + value.slice(1) };
      case "locationOfBirth":
        return { label: "Location of Birth", value };
      default:
        return { label: key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()), value };
    }
  };

  return (
    <div className="space-y-4 overflow-auto">
      <div className="grid grid-cols-[repeat(auto-fit, minmax(200px, 1fr))] gap-4">
        {Object.entries(rest).map(([key, value]) => {
          const { label, value: formattedValue } = formatField(key, value);
          if (!formattedValue) return null;
          return (
            <div key={key} className="grid grid-cols-[15%_1fr] pb-2 items-start">
              <span className="text-black/90 text-xs">{label}:</span>
              <span className="text-black text-xs font-medium">{formattedValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

PersonalInfo.displayName = "PersonalInfo";

export default PersonalInfo;