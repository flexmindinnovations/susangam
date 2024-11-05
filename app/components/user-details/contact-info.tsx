import React from "react";
import { useApiConfig } from "@/app/utility/apiConfig";

const ContactInfo = React.memo(({ contactInfo }: { contactInfo: any }) => {
  const apiConfig = useApiConfig();
  const {
    country,
    state,
    city,
    ...rest
  } = contactInfo;
  if (contactInfo.hasOwnProperty("contactInfoId")) delete contactInfo.contactInfoId;
  const formatField = (key: string, value: string | any) => {
    switch (key) {
      case "countryId":
        return { label: "Country", value: country?.countryName };
      case "stateId":
        return { label: "State", value: state?.stateName };
      case "cityId":
        return { label: "City", value: city?.cityName };
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

ContactInfo.displayName = "ContactInfo";

export default ContactInfo;