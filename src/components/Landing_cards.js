import React from "react";

export default function Landing_cards() {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 lg:py-12 flex justify-center">
      <div className="grid grid-cols-3 gap-4">
        <div className="border-cards border-opacity-100 bg-black-500 p-5 flex flex-col rounded text-center">
          <h1 className="text-white lg:text-3xl font-semibold py-3">
            Start fast
          </h1>
          <p className="text-gray-400 lg:text-2xl font-thin">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
        <div className="border-cards border-opacity-100 bg-black-500 p-5 flex flex-col rounded text-center">
          <h1 className="text-white lg:text-3xl font-semibold py-3">
            Knowledge Sharing
          </h1>
          <p className="text-gray-400 lg:text-2xl font-thin">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
        <div className="border-cards border-opacity-100 bg-black-500 p-5 flex flex-col rounded text-center">
          <h1 className="text-white lg:text-3xl font-semibold py-3">
            Better Feedback
          </h1>
          <p className="text-gray-400 lg:text-2xl font-thin">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
      </div>
    </div>
  );
}
