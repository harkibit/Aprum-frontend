import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

const FieldErrorMessage = ({ error = "" }) => {
  return (
    <div className="flex space-x-2 items-center text-red-500 font-light">
      <ExclamationCircleIcon className="w-4 h-4 mt-0.5" />
      <p>{error}</p>
    </div>
  );
};

export default FieldErrorMessage;
