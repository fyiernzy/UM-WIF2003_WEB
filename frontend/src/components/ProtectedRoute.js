import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoginPopup from "./Profile/LoginPopup";

const ProtectedRoute = () => {
  const { isAuthenticated, showLoginModal, setShowLoginModal } = useAuth();
  // Buffer to make sure the condition checking
  // only runs after isAuthenticated is defined
  if (isAuthenticated === null) {
    return null;
  }
  console.log("Inside ProtectedRoute, auth is: " + isAuthenticated);
  return (
    <>
      {showLoginModal && (
        <LoginPopup
          show={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
      {isAuthenticated ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

export default ProtectedRoute;
