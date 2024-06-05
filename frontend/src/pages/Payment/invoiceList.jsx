import React, { useEffect, useState } from "react";
import "../../pages-css/Payment/Payment.css";
import Tnc from "../../components/payment/tnc";
import { useUserContext } from "../../context/UserContext";
import axios from '../../utils/customAxios';
import jsPDF from 'jspdf';
import BackButton from "../../components/payment/BackButton";

function InvoiceList() {
  
  const [invoices, setInvoices] = useState([]);
  const [invoiceContent, setInvoiceContent] = useState('');
  const { user } = useUserContext();

  useEffect(() => {
    const fetchInvoices = async (userId) => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5050/payment/invoices/${userId}`);
          console.log("API Response (Invoice List)", response.data);
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

  useEffect(() => {
    const fetchInvoiceContent = async (userId) => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5050/payment/invoiceContent/${userId}`);
          console.log("API Response (Invoice Content):", response.data);
          if (response.status === 200) {
            setInvoiceContent(response.data);
          } else {
            throw new Error('Failed to fetch invoices.');
          }
        } catch (error) {
          console.error('Error fetching invoices:', error);
        }
      }
    };
    
    if (user._id) {
      fetchInvoiceContent(user._id);
    }
  }, [user]);
 
  const handleDownload = async (invoiceContent) => {
    try {
      if (invoiceContent) {
        invoiceContent.forEach(async (invoiceContent, index) => {
          const doc = new jsPDF();

          

          doc.setFontSize(24);
          doc.setFont('helvetica', 'bold');
          const titleText = 'Invoice';
          const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
          const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
          doc.text(titleText, titleX, 20);
          
  
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
  
          let currentY = 40;
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
  
          doc.text(`Project Title: ${invoiceContent.projectTitle || ''}`, 20, currentY);
          currentY += 10;
  
          doc.text(`Project Budget: RM${invoiceContent.projectBudget || ''}`, 20, currentY);
          currentY += 10;
  
          doc.text(`Project Description: ${invoiceContent.projectDescription || ''}`, 20, currentY);
          currentY += 10;
  
          doc.text(`Location: ${invoiceContent.location || ''}`, 20, currentY);
          currentY += 10;
  
          doc.text(`Project Category: ${invoiceContent.projectCategory || ''}`, 20, currentY);
          currentY += 10;
  
          doc.text(`Project Duration: ${invoiceContent.projectDuration || ''}`, 20, currentY);
          currentY += 10;
  
          doc.text(`Contact Information: ${invoiceContent.contactInformation || ''}`, 20, currentY);
          currentY += 10;
  
          doc.text(`Deadline: ${invoiceContent.deadline || ''}`, 20, currentY);
          currentY += 10;
  
          doc.text(`Additional Notes: ${invoiceContent.additionalNotes || ''}`, 20, currentY);
          currentY += 20;
  
          doc.save(`Invoice_${index + 1}.pdf`);
        });
      } else {
        console.error('No project details available.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
    
  const handleInvClick = () => {
        handleDownload(invoiceContent);
      };

  return (
    <><div className="invoice-list-containerner">
      <div className="invoice-listing">

        <BackButton/>

        <div className="card-wenhao">
          <p className="INV-title-name">Invoice List</p>

          {invoices.map((invoice, index) => (
            <div key={index} className="INV" onClick={() => handleInvClick(invoice)}>
              <p className="INVName">Completed</p>
              <p className="INVPrice">{invoice.projectTitle}</p>
              <p className="INVDesc">RM {parseFloat(invoice.projectBudget) + 10}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
      <Tnc />
      </>
    
  );
}
export default InvoiceList;