import React, { useState } from "react";
import Notification from "../../pages/General/Notification";
import google from "../../assets/images/General/logos_facebook.png";
import facebook from "../../assets/images/General/flat-color-icons_google.png";
import sideBackground from "../../assets/images/General/LOGIN.png";
import { checkEmail } from "../../api/authApi"; // Import checkEmail function
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login({ setLoggedIn, setUser }) {
  const { updateUser } = useUserContext();
  const [email, setEmail] = useState(""); // Change from username to email
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [userType, setUserType] = useState("recruiter");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate(); // Call the useNavigate hook here

  const responseMessage = async (response) => {
    try {
      console.log("Google Login Response:", response);
  
      const credential = response.credential;
      if (!credential) {
        console.log("Credential not found in the response.");
        return;
      }
  
      const decodedToken = jwtDecode(credential);
      console.log("Decoded Token:", decodedToken);
  
      const { email, name, picture } = decodedToken;
      console.log("Email:", email);
      console.log("Name:", name);
      console.log("Picture:", picture);
  
      // Check if the user exists in the database
      console.log("Calling checkEmail with email:", email);
      const isValidEmail = await checkEmail(email); // Call checkEmail function
      console.log("isValidEmail:", isValidEmail);
  
      if (isValidEmail) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          setLoggedIn(true);
          navigate("/JobscapeMainPage");
        }, 3000);
      } else {
        setErrorMessages({
          name: "invalid",
          message: "User with this Google account does not exist.",
        });
      }
    } catch (error) {
      console.log("Error decoding Google credential:", error);
    }
  };
  
  const errorMessage = (error) => {
    console.log(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Validate the email first
    const isValidEmail = await checkEmail(email);
    
    if (!isValidEmail) {
      setErrorMessages({
        name: "invalid",
        message: "Invalid email",
      });
      return;
    }
  
    // If the email is valid, proceed with login
    console.log("Submitting form...");
    // Proceed with login logic
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div className="login-background">
      <img
        alt="Side background decoration"
        className="login-flower-pic"
        src={sideBackground}
      />
      <form onSubmit={handleSubmit} className="login-form-container">
        <h2 className="login-title4">Login Now</h2>
        <div className="login-input-container">
          <input
            className="login-usernameInput"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {renderErrorMessage("invalid")}
        </div>
        <div className="login-input-container">
          <input
            className="login-usernameInput"
            placeholder="Password"
            type="password"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {renderErrorMessage("invalid")}
        </div>
        <div className="login-checkbox-container">
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <label htmlFor="rememberMe" className="remember-label">
            Remember me on this computer
          </label>
        </div>
        {showNotification && <Notification message="Login Successfully!" />}
        <div className="login-button-container">
          <input type="submit" value="Login" />
        </div>
        <div className="login-forgot-password">
          <span
            onClick={() => navigate("/ForgotP")}
            className="login-forgot-password-text"
          >
            Forgot Password?
          </span>
        </div>
        <div className="login-options">
          <hr className="login-hr-left" />
          <p className="login-normal-text">Or login with</p>
          <hr className="login-hr-right" />
        </div>
        <div className="login-button-group">
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          <button className="login-facebook-button">
            <img src={facebook} alt="Facebook Logo" />
            Facebook
          </button>
        </div>
        <div className="login-normal-text2">
          Not a member?{" "}
          <span onClick={() => navigate("/Register")} className="login-sign-up">
            Sign up now
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
