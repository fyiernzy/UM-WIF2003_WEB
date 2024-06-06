import "../../pages-css/General/General.css";
import React, { useState, useEffect } from "react";
import Notification from "../../pages/General/Notification";
import sideBackground from "../../assets/images/General/LOGIN.png";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleLoginModal from './GoogleLoginModal';

function NewPass() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [notificationType, setNotificationType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (email) {
      console.log("Email passed to NewPass component:", email);
    } else {
      console.log("No email passed to NewPass component");
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setErrorMessages({
        name: "password",
      });
      toast.error("Please enter both password and confirm password", { autoClose: 3000 });
    } else if (password !== confirmPassword) {
      setErrorMessages({
        name: "password",
      });
      toast.error("Passwords do not match", { autoClose: 3000 });
    } else {
      setNotificationMessage("Reset Successfully!");
      setNotificationType("success");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate("/login");
      }, 3000);
      console.log(password, " and", confirmPassword);
      try {
        const res = await axios.post("http://localhost:5050/auth/reset-password", { email, password });

        if (res.data.success) {
          setNotificationMessage("Reset Successfully!");
          setNotificationType("success");
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
            navigate("/login");
          }, 3000);
        } else {
          toast.error("Failed to reset password.", { autoClose: 3000 });
        }
      } catch (error) {
        console.error("Error during password reset:", error);
        toast.error("An error occurred. Please try again.", { autoClose: 3000 });
      }
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div className="login-background">
      <ToastContainer />
      <img className="login-flower-pic" src={sideBackground} alt="Side background" />
      <form onSubmit={handleSubmit} className="login-forgot-container">
        <h2 className="login-title">Reset Password</h2>
        <p className="login-transparent-text">
          Set the new password for your account so you can login and access all features.
        </p>
        <div className="login-input-container">
          <input
            className="login-usernameInput"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-input-container">
          <input
            className="login-usernameInput"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {renderErrorMessage("password")}
        {showNotification && <Notification message={notificationMessage} type={notificationType} />}
        
        <div className="login-button-container2">
          <input type="submit" value="Reset Password" />
        </div>
      </form>
      <GoogleLoginModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
}

export default NewPass;
