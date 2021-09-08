import React from "react";
import { Helmet } from "react-helmet";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Values from "../components/Values";
import Landing_cards from "../components/Landing_cards";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | Aprum</title>
      </Helmet>
      <Navbar />
      <Header />
      <Values />
      <Landing_cards />
      {/* <Footer /> */}
    </div>
  );
}
