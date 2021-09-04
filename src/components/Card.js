import React from "react";

import { parseISO } from "date-fns";
import formatDistance from "date-fns/formatDistance";
import { NullOrEmpty } from "../utils";

const Card = ({ title, description, version, user, published }) => {
  const diff = formatDistance(parseISO(published), new Date(), {
    addSuffix: true,
  });
  return (
    <div className="w-full bg-secondary px-8 pt-6 pb-5 rounded-lg shadow-md">
      <h2 className="text-gray-100 font-semibold text-2xl">{title}</h2>
      <p className="text-white text-sm font-light truncate">
        {NullOrEmpty(description) ? "No description provided" : description}
      </p>
      <div className="mt-14 flex justify-between items-center">
        <div className="flex flex-row items-center space-x-2.5">
          <img
            className="w-9 h-9 rounded-full"
            src="https://media-thumbs.golden.com/ZmJ_IKu3lu990Y0AEMnTva3gPus=/200x200/smart/golden-media.s3.amazonaws.com%2Ftopic_images%2F9d7886fae3ed43b087619486434a7f95.jpeg"
          />
          <div>
            <p className="text-sm font-base text-white">{user.username}</p>
            <p className="text-xs font-light text-gray-300">
              {`Posted ${diff}`}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5">
          <span
            style={{ backgroundColor: version.language.color }}
            className="w-3 h-3 mt-0.5 border rounded-full inline-block"
          ></span>
          <span className="text-white text-sm">{version.language.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
