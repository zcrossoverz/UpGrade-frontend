export const commentTime = (timestamp: number) => {
  const currentTime = new Date();
  const commentTime = new Date(timestamp);
  const timeDifference = currentTime.getTime() - commentTime.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  if (timeDifference < minute) {
    return "vừa xong";
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    return `${minutesAgo} phút trước`;
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    return `${hoursAgo} giờ trước`;
  } else if (timeDifference < week) {
    const daysAgo = Math.floor(timeDifference / day);
    return `${daysAgo} ngày trước`;
  } else {
    return commentTime.toLocaleDateString(); // If it's been more than a week, display the date
  }
};

export const formatTime = (time: string) => {
  const date = new Date(time);
  return date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
};
