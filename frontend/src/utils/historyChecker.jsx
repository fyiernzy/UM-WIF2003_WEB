// utils/historyChecker.js

import axios from './customAxios';

// Function to check if invoice content is empty
export const isInvoiceContentEmpty = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5050/payment/invoiceContent/${userId}`);
    if (response.status === 200) {
      const invoiceContent = response.data;
      return invoiceContent.length === 0;
    } else {
      throw new Error('Failed to fetch invoice content.');
    }
  } catch (error) {
    console.error('Error checking invoice content:', error);
    return true; // Assume empty on error
  }
};

// Function to check if payment history is empty (implement as needed)
export const isPaymentHistoryEmpty = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5050/payment/invoices/${userId}`);
    if (response.status === 200) {
      const paymentHistory = response.data;
      return paymentHistory.length === 0;
    } else {
      throw new Error('Failed to fetch payment history.');
    }
  } catch (error) {
    console.error('Error checking payment history:', error);
    return true; // Assume empty on error
  }
};
