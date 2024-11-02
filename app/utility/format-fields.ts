export const formatField = (key: string, value: string | any) => {
  switch (key) {
    case "dateOfBirth":
      return { label: "Birthday", value: new Date(value).toLocaleDateString() };
    case "gender":
      return { label: "Gender", value: value.charAt(0).toUpperCase() + value.slice(1) };
    case "mobileNo":
      return { label: "Phone", value: value || "N/A" };
    case "locationOfBirth":
      return { label: "Location of Birth", value };
    // Add other custom mappings and formats here...
    default:
      return { label: key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()), value };
  }
}
