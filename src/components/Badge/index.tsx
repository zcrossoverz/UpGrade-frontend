import React from "react";

function Badge({
  color,
  bgColor,
  text,
}: {
  color: string;
  bgColor: string;
  text: string;
}) {
  return (
    <span
      className={`whitespace-nowrap rounded-full ${bgColor} px-2.5 py-1 text-sm ${color}`}
    >
      {text}
    </span>
  );
}

export default Badge;
