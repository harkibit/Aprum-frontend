import React, { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { useDispatch } from "react-redux";
import { history } from "../store";

import LoadingBar from "react-redux-loading-bar";
import PrivateRoute from "./PrivateRoute";
import { loadUser } from "../actions/authActions";

// Pages
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import "react-toastify/dist/ReactToastify.min.css";
import AddSnippet from "../pages/user/AddSnippet";
import SnippetsLayout from "../layouts/SnippetsLayout";
import UserSnippets from "../pages/user/Snippets";
import LatestSnippets from "./Snippets";
import ShowSnippet from "../pages/user/ShowSnippet";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(loadUser()), []);
  return (
    <div>
      <LoadingBar className="fixed top-0 h-1 bg-primary" />
      <ToastContainer closeButton={false} transition={Slide} autoClose={3000} />
      <ConnectedRouter history={history}>
        <Switch>
          <PrivateRoute
            type="guest"
            exact
            path="/auth/login"
            component={Login}
          />
          <PrivateRoute
            type="guest"
            exact
            path="/auth/register"
            component={Register}
          />
          <Route exact path="/" component={Home} />

          <PrivateRoute
            type="private"
            exact
            path="/snippets/add"
            component={AddSnippet}
          />

          <Route exact path="/s/:slug" component={ShowSnippet} />
          <Redirect exact from="/snippets" to="/snippets/latest" />
          <SnippetsLayout>
            <PrivateRoute
              type="private"
              exact
              path="/snippets/latest"
              component={LatestSnippets}
            />
            <PrivateRoute
              type="private"
              exact
              path="/snippets/add"
              component={AddSnippet}
            />
            <PrivateRoute
              type="private"
              exact
              path="/snippets/personal"
              component={UserSnippets}
            />
          </SnippetsLayout>
        </Switch>
      </ConnectedRouter>
    </div>
  );
};

export default App;
