import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../pages-css/Payment/Payment.css";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
    className="BackBtn-In-PayHis"
    onClick={() => navigate(-1)}>
    <p>
      <i className="bi-chevron-left" />
      Back
    </p>
  </Button>
  );
};

export default BackButton;
