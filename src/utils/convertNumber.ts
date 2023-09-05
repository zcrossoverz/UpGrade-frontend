export const formatNumber = (number: number) => {
  // Convert the number to a string and split it into integer and decimal parts
  const parts = number.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  // Add a millions separator (,) every three digits from the right in the integer part
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Join the formatted integer part and the decimal part (if any)
  const formattedNumber = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;

  return formattedNumber;
};

export const formatCurrency = (number: number) => {
  // Convert the number to a string and split it into integer and decimal parts
  const parts = number.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  // Add a millions separator (,) every three digits from the right in the integer part
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Combine the formatted integer part, the decimal part (if any), and the currency symbol (₫)
  const formattedNumber = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}₫`
    : `${formattedIntegerPart}₫`;

  return formattedNumber;
};
