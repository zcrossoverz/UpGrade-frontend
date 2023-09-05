import React from "react";

interface IInput {
  properties?: React.HTMLAttributes<HTMLInputElement>;
  extraClass?: string;
}
function Input({ properties, extraClass }: IInput) {
  return (
    <input
      type='input'
      className={`px-4 py-2 rounded-2xl border border-gray-300 border-1 focus:outline-1 ${extraClass}`}
      {...properties}
    />
  );
}

export default Input;
