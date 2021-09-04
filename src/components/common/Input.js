import React from "react";

const Input = ({ className, ...rest }) => {
  return (
    <input
      className={[
        "w-full shadow-md pl-3.5 ring-offset-2 ring-offset-gray-800 text-gray-900 focus:ring-1 ring-primary py-2.5 rounded-md focus:outline-none",
        className,
      ].join(" ")}
      {...rest}
    />
  );
};

export default Input;
