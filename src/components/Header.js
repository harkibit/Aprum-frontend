import React from "react";

export default function Header() {
  return (
    <header className="bg-gray-800">
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-white text-9xl">
            Aprum 
          </h1>
        </div>
      </div>
    </header>
  );
}
