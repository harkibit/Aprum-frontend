import React from "react";
import { Helmet } from "react-helmet";

import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | Aprum</title>
      </Helmet>
      <Navbar />
      <Header />
    </div>
  );
}
