import React from "react";

interface IButton {
  text: string;
  properties?: React.HTMLAttributes<HTMLButtonElement>;
  extraClass?: string;
}
function Button({ text, properties, extraClass }: IButton) {
  return (
    <button className={`px-6 py-2 rounded-2xl ${extraClass}`} {...properties}>
      {text}
    </button>
  );
}

export default Button;
