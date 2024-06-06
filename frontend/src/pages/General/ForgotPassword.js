import "../../pages-css/General/General.css";
import React, { useState } from "react";
import sideBackground from "../../assets/images/General/LOGIN.png";
import { checkEmail, forgotPassword } from "../../api/authApi"; // Ensure the import is correct
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessages({ name: "email", message: "Please enter your email" });
      return;
    }

    try {
      // Check if the email exists in the database
      const emailExists = await checkEmail(email);
      console.log(email);
      
      if (emailExists) {
        // If email exists, proceed to NewPass page
        navigate("/NewPass", { state: { email } });
      } else {
        // If email doesn't exist, show a toast message
        toast.error("User not registered. Please register first.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error during check email request:", error);
      setNotificationMessage("An error occurred while checking email.");
      setNotificationType("error");
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
        <h2 className="login-title">Forgot Password</h2>
        <p className="login-transparent-text">
          Enter your email for the verification process, we will send a 4-digit code to your email.
        </p>
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
        <div className="login-button-container1">
          <input type="submit" value="Send Code" />
        </div>
        {notificationMessage && (
          <div className={`notification ${notificationType}`}>
            {notificationMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
