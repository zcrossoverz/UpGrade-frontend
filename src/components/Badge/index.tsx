import React from "react";

function Badge({
  color,
  bgColor,
  text,
  h,
  w,
}: {
  color: string;
  bgColor: string;
  text: string;
  h?: number;
  w?: number;
}) {
  return (
    <span
      className={`whitespace-nowrap rounded-full ${bgColor} px-2.5 py-1 text-sm ${color} ${
        h !== undefined && `py-[${h}px]`
      } ${w !== undefined && `px-[${w}px]`}`}
    >
      {text}
    </span>
  );
}

export default Badge;
