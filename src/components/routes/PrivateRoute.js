import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedin = useAuth();

  return isLoggedin ? children : <Navigate to='/' state={{ from: location }} replace />;
};

export default PrivateRoute;
