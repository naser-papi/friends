import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { IAppState } from "../models/GeneralTypes";
import { HasAccess } from "../utils";

const SecureRoute = ({ roles }) => {
  const location = useLocation();
  const userInfo = useSelector((state: IAppState) => state.general.userInfo);
  const hasAccess = userInfo && userInfo.token != null && HasAccess(userInfo.roles, roles);
  return hasAccess ? (
    <Outlet />
  ) : (
    <Navigate to={`/login${location.pathname ? "?returnUrl=" + location.pathname : ""}`} />
  );
};

export default SecureRoute;
