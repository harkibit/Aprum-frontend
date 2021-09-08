import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-800 mb-10">
      <div class="area relative">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-white lg:text-5xl sm:text-4xl font-semibold py-3">
            Where teams build faster, together
          </h2>
          <p className="text-gray-400 lg:text-1xl">
            Create, share, and get feedback with collaborative sandboxes for
            rapid web development.
          </p>
          <div className="mt-5">
            <Link to="/snippets">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Create snippet
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
