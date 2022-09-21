import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const isLoggedin = useAuth();
  const location = useLocation();

  let from = location.state?.from || "/teams";

  return !isLoggedin ? children : <Navigate to={from} replace />;
};

export default PublicRoute;
