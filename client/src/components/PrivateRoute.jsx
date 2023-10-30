import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getCookie } from "../functions/cookies";
import Login from "../routes/Login";
import Profile from "../routes/Profile";

const PrivateRoute = ({ children, forLoggin = false }) => {
  const isLoggedIn = getCookie("refresh_token") !== null;
  if (forLoggin) {
    return isLoggedIn ? <Profile /> : <Login />;
  }
  return isLoggedIn ? children : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
