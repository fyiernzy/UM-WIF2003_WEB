import React , { useEffect, useState } from "react";
import "../../pages-css/Payment/Payment.css";
import Tnc from "../../components/payment/tnc";
import { useUserContext } from "../../context/UserContext";
import axios from '../../utils/customAxios';
import BackButton2 from "../../components/payment/BackButton2";

function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const {user} = useUserContext();

  const PaymentMethod = localStorage.getItem('paymentMethod');

  useEffect(() => {
    const fetchInvoices = async (userId) => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5050/payment/invoices/${userId}`);
          console.log("API Response:", response.data);
          if (response.status === 200) {
            setInvoices(response.data);
          } else {
            throw new Error('Failed to fetch invoices.');
          }
        } catch (error) {
          console.error('Error fetching invoices:', error);
        }
      }
    };
    
    if (user._id) {
      fetchInvoices(user._id);
    }
  }, [user]);

  return (
    <><div className="invoice-containerner">
      <BackButton2 />

      <div className="invoice-list">
        <div className="card-wenhao">
          <p className="INV-title-name">Payment History</p>
          {invoices.map((invoice, index) => (
            <div key={index} className="INV">
              <p className="INVName">{PaymentMethod}</p>
              <p className="INVPrice">{invoice.projectTitle}</p>
              <p className="INVDesc">RM {parseFloat(invoice.projectBudget) + 10}</p>
            </div>
          ))}
        </div>
      </div>
    </div><Tnc /></>
  );
}
export default Invoice;