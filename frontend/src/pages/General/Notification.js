import React, { useState, useEffect } from "react";
import "../../pages-css/General/General.css";
import ticking from "../../assets/images/General/Successmark.png";
import errorIcon from "../../assets/images/General/Error.png";

function Notification({ message, type }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className={`login-notification ${show ? "show" : ""}`}>
      <img src={type === "success" ? ticking : errorIcon} alt={type} className="login-notification-logo" />
      <p className="login-notification-message">{message}</p>
    </div>
  );
}

export default Notification;
