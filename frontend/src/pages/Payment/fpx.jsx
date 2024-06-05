import "../../pages-css/Payment/Payment.css";
import React, { useEffect, useState } from "react";
import BackButton from '../../components/payment/BackButton';
import Reminder from '../../components/payment/Reminder';
import ChooseBank from '../../components/payment/ChooseBank';
import ChoosePaymentMethod from "../../components/payment/ChoosePaymentMethod";
import { useUserContext } from "../../context/UserContext";
import axios from '../../utils/customAxios';


function Fpx() {
  const {user} = useUserContext();
  console.log("Your jobs page userContext: " + JSON.stringify(user));

  const [projectTitle, setProjectTitle] = useState('');
  const [projectBudget, setProjectBudget] = useState('');

  useEffect(() => {
    const title = localStorage.getItem('projectTitle');
    const budget = localStorage.getItem('projectBudget');

    if (title && budget) {
      setProjectTitle(title);
      setProjectBudget(budget);
    }
  }, []);

  // read linked FPX
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);


  useEffect(() => {
    if (user._id) {
      fetchPaymentMethod(user._id);
    }
  }, [user]);

  
  const fetchPaymentMethod = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5050/payment/selectedBanks?userId=${userId}`);
      if (response.status === 200) {
        setServices(response.data);
        console.log("Selected banks:", response.data);
      } else {
        throw new Error('Failed to fetch payment method.');
      }
    } catch (error) {
      console.error("Error fetching payment method:", error);
    }
  };


  const handleServiceClick = (services) => {
    setSelectedService(services);
    localStorage.setItem('paymentMethod' , services);
  };
  
  return (
    <>
    <BackButton/>
    
    <div className="split-container">
        <div className="LeftContainer">
          <p className="PaymentBigtitle">Payment</p>
          <hr className="line"></hr>
          <p className="titleLinked">Linked payment method: </p>

          <div>
      {services.map((service, index) => (
        <div
          key={index}
          onClick={() => {
            handleServiceClick(service);
            window.location.href = "/redirect";
          }}
          className={`automatedContainer ${selectedService === service ? 'selected' : ''}`}
        >
          <p className="BankName">{service}</p>
        </div>
      ))}
    </div>



          <ChoosePaymentMethod/>
          <ChooseBank/>
          <Reminder/>
        </div>

        <div className="RightContainer">
      <div>
        <p className="titleRight">Service Summary</p>
        <hr className="lineRightBox"></hr>
      </div>
      <div>
        <p className="descContent">
          <span className="taskName">{projectTitle}</span>
          <span className="taskPrice"> RM {projectBudget}</span>
        </p>
      </div>
      
      <hr className="lineRightBox"></hr>
      
      <div>
        <div>
          <p className="descContent">
            <span className="taskName">Subtotal</span>
            <span className="taskPrice">RM {projectBudget}</span>
          </p>
        </div>
        <div>
          <p className="descContent">
            <span className="taskName">Additional (6% of service tax)</span>
            <span className="taskPrice">RM 10</span>
          </p>
        </div>
      </div>
      <hr className="lineRightBox"></hr>
      <div>
        <p className="descContent">
          <span className="taskName">Total</span>
          <span className="taskPrice">RM {10 + parseFloat(projectBudget)}</span>
        </p>
      </div>
    </div>
      </div></>
  );
}
export default Fpx;