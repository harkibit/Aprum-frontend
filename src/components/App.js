import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/home";
import Navbar from "./Navbar";
import Footer from "./Footer.js";

const App = () => {
  return (
    <div>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/register">
            </Route>
            <Route path="/about">
            </Route>
            <Route path="/dashboard">
            </Route>
            <Route path="/editor">
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
