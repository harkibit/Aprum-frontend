import React from "react";
import Spinner from "./Spinner";

const Button = ({ loading, className, children, ...rest }) => {
  return (
    <button
      className={[
        "w-full hover:bg-opacity-80 font-semibold rounded py-1.5",
        className,
      ].join(" ")}
      disabled={loading}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
