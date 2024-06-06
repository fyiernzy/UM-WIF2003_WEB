import "../../pages-css/General/General.css";
import React, { useState } from "react";
import Notification from "../../pages/General/Notification";
import googleIcon from "../../assets/images/General/flat-color-icons_google.png";
import sideBackground from "../../assets/images/General/LOGIN.png";
import { getUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Fixing the import statement
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Required for screen readers

function Login({ setLoggedIn, setUser }) {
  const { updateUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await getUser(email, password);

      if (user) {
        setErrorMessages({});
        updateUser(user);
        setNotificationMessage("Login Successfully!");
        setNotificationType("success");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          setLoggedIn(true);
          navigate("/JobscapeMainPage");
        }, 3000);
      } else {
        setErrorMessages({
          name: "invalid",
        });
        updateUser(null);
        toast.error("Invalid username or password", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login. Please try again.", { autoClose: 3000 });
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

      const { email } = decodedToken;
      console.log("Email:", email);

      const res = await axios.post("http://localhost:5050/auth/google-login", { email }, { withCredentials: true });

      if (res.data.success) {
        updateUser(res.data.user);
        setNotificationMessage("Login Successfully!");
        setNotificationType("success");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          setLoggedIn(true);
          navigate("/JobscapeMainPage");
        }, 3000);
      } else {
        setErrorMessages({
          name: "invalid",
        });
        updateUser(null);
        toast.error("User not registered. Please register first.", { autoClose: 3000 });
      }
    } catch (error) {
      console.log("Error during Google login:", error);
      toast.error("An error occurred during Google login. Please try again.", { autoClose: 3000 });
    }
  };

  const errorMessage = (error) => {
    console.log("Google login error:", error);
    toast.error("An error occurred during Google login. Please try again.", { autoClose: 3000 });
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div className="login-background">
      <ToastContainer />
      <img
        alt="Side background decoration"
        className="login-flower-pic"
        src={sideBackground}
      />
      <form onSubmit={handleSubmit} className="login-form-container">
        <h2 className="login-title">Login Now</h2>
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
        {showNotification && <Notification message={notificationMessage} type={notificationType} />}
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
          <p className="login-normal-text">Or</p>
          <hr className="login-hr-right" />
        </div>
        <div className="login-google-button-container">
          <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="login-google-button"
              >
                <img src={googleIcon} alt="Google Logo" />
                Google
              </button>
            )}
          />
        </div>

        <div className="login-normal-text">
          Not a member?{" "}
          <span onClick={() => navigate("/register")} className="login-sign-up">
            Register here
          </span>
        </div>
        
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Forgot Password Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Forgot Password</h2>
        <p>Do you want to log in with your Google account to reset your password?</p>
        <GoogleLogin
          onSuccess={(response) => {
            responseMessage(response);
            navigate("/reset-password");
          }}
          onError={errorMessage}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="login-google-button"
            >
              <img src={googleIcon} alt="Google Logo" />
              Login with Google
            </button>
          )}
        />
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}

export default Login;
