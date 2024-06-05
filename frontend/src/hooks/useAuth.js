import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUserToken } from "../api/authApi";
import { useUserContext } from "../context/UserContext";

const useAuth = () => {
  const { user, updateUser } = useUserContext();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useAuth activated!");
    // Will perform token checking if 'user' from userContext doesn't exist
    // Meaning user hasn't gone through log in process
    const checkToken = async () => {
      const result = await verifyUserToken();
      // Navigate to homepage if token is invalid
      if (!result.status) {
        console.log("navigated to home with useAuth");
        setShowLoginModal(true);
        // navigate("/");
        setIsAuthenticated(false);
      } else {
        // Sets the 'user' in userContext with user object
        // returned from backend
        updateUser(result.user);
        setIsAuthenticated(true);
      }
    };
    if (!user) {
      console.log("User in userContext is null!");
      checkToken();
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate, user, updateUser]);

  return { isAuthenticated, showLoginModal, setShowLoginModal };
};
export default useAuth;
