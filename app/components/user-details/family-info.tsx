import React from "react";
import { useApiConfig } from "@/app/utility/apiConfig";

const FamilyInfo = React.memo(({ familyInfo }: { familyInfo: any }) => {
  const apiConfig = useApiConfig();
  const {
    religion,
    cast,
    subCast,
    ...rest
  } = familyInfo;
  if (familyInfo.hasOwnProperty("familyInfoId")) delete familyInfo.familyInfoId;
  const formatField = (key: string, value: string | any) => {
    switch (key) {
      case "religionId":
        return { label: "Religion", value: religion?.religionName };
      case "castId":
        return { label: "Cast", value: cast?.castName };
      case "subCastId":
        return { label: "Sub Cast", value: subCast?.subCastName };
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

FamilyInfo.displayName = "FamilyInfo";

export default FamilyInfo;