import React from "react";
import "../../pages-css/Payment/Payment.css";
import tickPic from "../../assets/images/Payment/check-mark.png";
import { Button } from "react-bootstrap";

function Successful() {
  return (
    <>
    <div className="App">
        <header className="App-header">
        
          <div className="cardSuccessful">
          <Button
      className="BackBtn-In-Successful"
      onClick={() => (window.location.href = "/ReviewProjectPage/:userId")}>
      <p>
        <i className="bi-chevron-left" />
        Back
      </p>
    </Button>
            <p className="successMsg">Successfully made payment</p>
            <img className="tick" src={tickPic} alt="Check Mark"></img>
            <br></br>
            <br></br>
            <button
              onClick={() => (window.location.href = "/invoiceList")}
              className="buttonSuccessful"
            >
              Generate Invoice
            </button>
            <br></br>
            <button
              onClick={() => (window.location.href = "/paymentHis")}
              className="buttonSuccessful"
            >
              View Payment History
            </button>
          </div>
        </header>
      </div></>
  );
}

export default Successful;