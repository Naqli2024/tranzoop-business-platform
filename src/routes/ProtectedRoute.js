import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMe } from "../redux/Auth/AuthSlice";
import UnauthorizedDialog from "../helpers/UnauthorizedDialog";

const ProtectedRoute = () => {
  const dispatch = useDispatch();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await dispatch(getMe()).unwrap();

        setAuthorized(true);
      } catch (error) {
        console.error("Authentication failed:", error);

        setAuthorized(false);
        setShowUnauthorized(true);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, [dispatch]);

  if (checkingAuth) {
    return null;
  }

  if (!authorized) {
    return <UnauthorizedDialog open={showUnauthorized} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
