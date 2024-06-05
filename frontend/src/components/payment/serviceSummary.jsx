import "../../pages-css/Payment/Payment.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TaxModal from "./TaxModal";

const ServiceSummary = ({ taskData }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectBudget, setProjectBudget] = useState('');
  const location = useLocation();

  // get task name and price
  useEffect(() => {
    if (location.state) {
      const { projectTitle, projectBudget } = location.state;
      setProjectTitle(projectTitle.toString());
      setProjectBudget(projectBudget.toString());
    }
  }, [location.state]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleModal = async () => {
      setModalMessage('Thank you for choosing UNIJOBS! Please note that a service tax of RM 10 will be applied for generating revenue. We appreciate your business and look forward to serving you ~.~');
      setModalIsOpen(true);
  };

  // const [selectedCard, setSelectedCard] = useState(null);

  // const handleSelectCard = (card) => {
  //   setSelectedCard(card);
  // };

  

  return (
    <div className="RightContainer">
      <div style={{display: 'flex' , alignItems: 'center'}}>
        <p className="titleRight">Service Summary</p>
        <p><i className="bi-chevron-down" style={{color: 'white' , marginLeft: '2vh' , cursor: 'pointer' }} onClick={handleModal}  /></p>
        <TaxModal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)} 
        message={modalMessage} 
      />
      </div>
      <hr className="lineRightBox"></hr>
      <div>
        <p className="descContent">
          <span className="taskName" style={{fontWeight: 'bold' , fontSize: '20px'}}>{projectTitle}</span>
          <span className="taskPrice"> RM {projectBudget}</span>
        </p>
      </div>
      
      <hr className="lineRightBox"></hr>
      {/* <Discount onSelectCard={handleSelectCard}/> */}
     
      
      <div>
        <div>
          <p className="descContent">
            <span className="taskName">Subtotal</span>
            <span className="taskPrice">RM {projectBudget}</span>
          </p>
        </div>
        <div>
          <p className="descContent">
            <span className="taskName">Additional tax</span>
            <span className="taskPrice">RM 10</span>
          </p>
        </div>
      </div>
      <hr className="lineRightBox"></hr>
      <div>
        <p className="descContent">
          <span className="taskName">Total</span>
          <span className="taskPrice" style={{ fontWeight: 'bold', fontSize: '20px' }}>
  RM {(10 + parseFloat(projectBudget))}
</span>
        </p>
      </div>
    </div>
  );
};

export default ServiceSummary;