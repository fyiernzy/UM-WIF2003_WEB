import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages-css/Payment/Payment.css";
import NoRecordsModal from "./NoRecordsModal";
import { isInvoiceContentEmpty, isPaymentHistoryEmpty } from "../../utils/historyChecker.jsx";
import { useUserContext } from "../../context/UserContext";

const AccessToInvoicePayment = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleInvoice = async () => {
    const empty = await isInvoiceContentEmpty(user._id);
    if (empty) {
      setModalMessage('No Invoice Records Found');
      setModalIsOpen(true);
    } else {
      navigate('/invoiceList');
    }
  };

  const handlePaymentHistory = async () => {
    const empty = await isPaymentHistoryEmpty(user._id);
    if (empty) {
      setModalMessage('No Payment History Records Found');
      setModalIsOpen(true);
    } else {
      navigate('/paymentHis');
    }
  };

  return (
    <div className='payment-btn-container-in-profile gap-3'>
      <button className='view-invoice-btn-in-profile' onClick={handleInvoice}>View Invoice</button>
      <button className='view-payment-history-btn-in-profile' onClick={handlePaymentHistory}>Payment History</button>
      
      <NoRecordsModal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)} 
        message={modalMessage} 
      />
    </div>
  );
};

export default AccessToInvoicePayment;
