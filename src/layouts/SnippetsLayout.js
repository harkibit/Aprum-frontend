import React from "react";
import { BookmarkIcon, FireIcon, PlusIcon } from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";
const SnippetsLayout = ({ children }) => {
  return (
    <main className="min-h-screen p-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <NavLink
            to="/snippets/latest"
            className="hover:bg-gray-700 text-gray-200 py-1.5 px-4 flex items-center space-x-2 rounded-md"
            activeClassName="bg-gray-700 shadow-md"
          >
            <FireIcon className="w-5 h-5" />
            <p>Latest</p>
          </NavLink>

          <NavLink
            to="/snippets/personal"
            className="hover:bg-gray-700 text-gray-200 py-1.5 px-4 flex items-center space-x-2 rounded-md"
            activeClassName="bg-gray-700 shadow-md"
          >
            <BookmarkIcon className="w-5 h-5" />
            <p>Personal</p>
          </NavLink>
        </div>
        <Link
          to="/snippets/add"
          className="bg-secondary shadow-md text-gray-200 py-1.5 px-4 flex items-center space-x-2 rounded-md"
        >
          <PlusIcon className="h-4 w-4 mt-0.5" />
          <p>Create</p>
        </Link>
      </div>
      {children}
    </main>
  );
};

export default SnippetsLayout;
