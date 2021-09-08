import React from "react";

import { parseISO } from "date-fns";
import formatDistance from "date-fns/formatDistance";
import { NullOrEmpty } from "../utils";
import { Link } from "react-router-dom";

const Card = ({ title, description, version, user, published, slug }) => {
  const diff = formatDistance(parseISO(published), new Date(), {
    addSuffix: true,
  });
  return (
    <Link to={`/s/${slug}`}>
      <div className="w-full bg-secondary px-8 pt-6 pb-5 rounded-lg shadow-md">
        <h2 className="text-gray-100 font-semibold text-2xl">{title}</h2>
        <p className="text-white text-sm font-light truncate">
          {NullOrEmpty(description) ? "No description provided" : description}
        </p>
        <div className="mt-14 flex justify-between items-center">
          <div>
            <p className="text-sm font-base text-white">{user.username}</p>
            <p className="text-xs font-light text-gray-300">{`Posted ${diff}`}</p>
          </div>
          <div className="flex items-center space-x-1.5">
            <span
              style={{ backgroundColor: version.language.color }}
              className="w-3 h-3 mt-0.5 border border-opacity-40 rounded-full inline-block"
            ></span>
            <span className="text-white text-sm">{version.language.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
