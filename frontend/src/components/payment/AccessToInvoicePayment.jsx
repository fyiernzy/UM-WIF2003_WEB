import React from "react";
import { useNavigate } from "react-router-dom";
import "../../pages-css/Payment/Payment.css";

const AccessToInvoicePayment = () => {
    const navigate = useNavigate();


    const handleInvoice = () => {
        navigate('/invoiceList');
      };

    const handlePaymentHistory = () => {
        navigate('/paymentHis');
      };

  return (
    <div className='payment-btn-container-in-profile gap-3'>
    <button className='view-invoice-btn-in-profile' onClick={handleInvoice}>View Invoice</button>
    <button className='view-payment-history-btn-in-profile'  onClick={handlePaymentHistory}>Payment History</button>
  </div>
  );
};

export default AccessToInvoicePayment;
