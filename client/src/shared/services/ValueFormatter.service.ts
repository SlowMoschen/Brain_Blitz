type FormatType = "trim" | "lowerCase" | "upperCase" | "capitalize";

const trimValue = (value: string): string => {
  return value.trim();
};

const lowerCaseValue = (value: string): string => {
  return value.toLowerCase();
};

const upperCaseValue = (value: string): string => {
  return value.toUpperCase();
};

const capitalizeValue = (value: string): string => {
  const gotSpaces = value.split(" ");

  if (gotSpaces.length > 1)
    return gotSpaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const formatValue = (value: string, formats: FormatType[]): string => {
  let formattedValue = value;

  formats.forEach((format) => {
    switch (format) {
      case "trim":
        formattedValue = trimValue(formattedValue);
        break;
      case "lowerCase":
        formattedValue = lowerCaseValue(formattedValue);
        break;
      case "upperCase":
        formattedValue = upperCaseValue(formattedValue);
        break;
      case "capitalize":
        formattedValue = capitalizeValue(formattedValue);
        break;
      default:
        break;
    }
  });

  return formattedValue;
};
