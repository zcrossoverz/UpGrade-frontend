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

export const secondsToTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours === 0) {
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  } else {
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
};

export const secondsToTimeString = (seconds: number) => {
  const days = Math.floor(seconds / 86400); // 86400 seconds in a day
  const remainingSeconds = seconds % 86400;
  const hours = Math.floor(remainingSeconds / 3600); // 3600 seconds in an hour
  const minutes = Math.floor((remainingSeconds % 3600) / 60);

  let result = "";

  if (days > 0) {
    result += `${days} ngày`;
  }

  if (hours > 0) {
    result += `${result ? " " : ""}${hours} giờ`;
  }

  if (minutes > 0) {
    result += `${result ? " " : ""}${minutes} phút`;
  }

  return result;
};
