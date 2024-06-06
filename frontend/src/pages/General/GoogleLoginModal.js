import React from 'react';
import Modal from 'react-modal';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import "../../pages-css/General/General.css";

Modal.setAppElement('#root'); // Required for screen readers

const GoogleLoginModal = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();

  const responseMessage = async (response) => {
    try {
      const credential = response.credential;
      if (!credential) {
        console.log("Credential not found in the response.");
        return;
      }

      const decodedToken = jwtDecode(credential);
      const { email } = decodedToken;

      const res = await axios.post("http://localhost:5050/auth/google-login", { email }, { withCredentials: true });

      if (res.data.success) {
        onRequestClose();
        navigate("/newpass"); // Navigate to new password page
      } else {
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Reset Password with Google"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Reset Password</h2>
      <p>Would you like to reset your password by signing in with your Google account?</p>
      <GoogleLogin
        onSuccess={responseMessage}
        onError={errorMessage}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="login-google-button"
          >
            Login with Google
          </button>
        )}
      />
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default GoogleLoginModal;
