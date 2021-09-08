import React from "react";
import editor from ".././assets/editor.jpg";

export default function Values() {
  return (
    <>
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-10 flex justify-center flex-col align-center">
        <h2 className="lg:text-5xl text-white font-semibold text-center">
          What's Aprum?
        </h2>
        <div className="grid grid-cols-2 gap-10 py-10">
          <div>
            <h2 className="lg:text-3xl pb-3 text-gray-400 text-white text-center">
              No Setup required
            </h2>
            <p className="lg:text-1xl text-white text-center">
              A sandbox needs no setup - use a template to kickstart new
              projects, or start from a GitHub repo and begin coding in seconds.
            </p>
          </div>
          <div>
            <h2 className="lg:text-3xl pb-3 text-gray-400 text-white text-center">
              Superfast
            </h2>
            <p className="lg:text-1xl text-white text-center">
              A sandbox is a superfast development environment. They’re
              purpose-built for rapid web development in the browser.
            </p>
          </div>
        </div>
      </div>
      <img src={editor} alt="editor" className="mx-auto" />
    </>
  );
}
