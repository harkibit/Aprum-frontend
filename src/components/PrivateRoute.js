import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ type, component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (type === "guest" && isAuthenticated) return <Redirect to="/" />;
  else if (type === "private" && !isAuthenticated)
    return <Redirect to="/auth/login" />;

  return <Route render={(props) => <Component {...props} />} {...rest} />;
};

export default PrivateRoute;
