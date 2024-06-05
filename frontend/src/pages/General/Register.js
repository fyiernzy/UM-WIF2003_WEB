import "../../pages-css/General/General.css";
import React, { useState } from "react";
import googleIcon from "../../assets/images/General/logos_facebook.png";
import facebookIcon from "../../assets/images/General/flat-color-icons_google.png";
import sideBackground from "../../assets/images/General/LOGIN.png";
import { postRegistration } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [userType, setUserType] = useState("recruiter");
  const [googleUserData, setGoogleUserData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setErrorMessages({ name: "form", message: "All fields are required" });
    } else {
      postRegistration(email, fullName, password, userType, navigate);
    }
  };

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

      setGoogleUserData({ email, name, picture });
      setEmail(email);
      setFullName(name);
    } catch (error) {
      console.log("Error decoding Google credential:", error);
    }
  };

  const errorMessage = (error) => {
    console.log("Google login error:", error);
  };

  const handleGoogleRegistration = async () => {
    try {
      const response = await axios.post('/api/auth/google-register', {
        email: googleUserData.email,
        username: googleUserData.name,
        profilePic: googleUserData.picture,
        userType
      });
      navigate("/JobscapeMainPage");
    } catch (error) {
      console.log(error);
    }
  };

  const renderErrorMessage = (name) => name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
  );

  return (
    <div className="login-background">
      <img alt="Side background decoration" className="login-flower-pic" src={sideBackground} />
      <form onSubmit={handleSubmit} className="login-form2-container">
        <h2 className="login-title">Create Account</h2>
        <div className="login-options">
          <hr className="login-hr-left" />
          <p className="login-normal-text">Signup with</p>
          <hr className="login-hr-right" />
        </div>
        <div className="login-button-group">
          <button className="login-facebook-button">
            <img src={facebookIcon} alt="Facebook Logo" />
            Facebook
          </button>
          <div className="login-google-button">
            <GoogleLogin
              onSuccess={responseMessage}
              onError={errorMessage}
              render={(renderProps) => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login-facebook-button">
                  <img src={googleIcon} alt="Google Logo" />
                  Google
                </button>
              )}
            />
          </div>
        </div>
        <div className="login-options">
          <hr className="login-hr-left" />
          <p className="login-normal-text">Or</p>
          <hr className="login-hr-right" />
        </div>
        <div className="login-input-container">
          <input
            className="login-usernameInput"
            type="name"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {renderErrorMessage("fullName")}
        </div>
        <div className="login-input-container">
          <input
            className="login-usernameInput"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {renderErrorMessage("email")}
        </div>
        <div className="login-input-container">
          <input
            className="login-usernameInput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {renderErrorMessage("password")}
        </div>
        <div className="login-radio-container">
          <input
            type="radio"
            id="recruiter"
            name="userType"
            value="recruiter"
            checked={userType === "recruiter"}
            onChange={() => setUserType("recruiter")}
          />
          <label htmlFor="recruiter">Recruiter</label>
          <input
            type="radio"
            id="freelance"
            name="userType"
            value="freelancer"
            checked={userType === "freelancer"}
            onChange={() => setUserType("freelancer")}
          />
          <label htmlFor="freelance">Freelancer</label>
        </div>
        <div className="login-button-container1">
          <input
            type="submit"
            value="Create Account"
            onClick={googleUserData ? handleGoogleRegistration : handleSubmit}
          />
        </div>
        <div className="login-normal-text">
          Already a member?{" "}
          <span onClick={() => navigate("/Login")} className="login-sign-up">
            Login now
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
